// lib/supabase/customer.ts
'use server';

import { createClient } from './server'

export async function getProfileAndStore() {
  const supabase = await createClient()
  const { data: { user: authUser } } = await supabase.auth.getUser()

  if (!authUser) return { profile: null, store: null }

  // 1. Fetch only necessary columns
  const [profileRes, storeRes] = await Promise.all([
    supabase.from('users').select('id, full_name, email, role').eq('id', authUser.id).single(),
    supabase.from('stores').select('id, store_name, storeid, logo_url, banner_url').eq('sellerid', authUser.id).single()
  ])

  const profile = profileRes.data
  let store = storeRes.data

  // 2. Transform raw paths into full URLs if they exist
  if (store) {
    if (store.logo_url) {
      const { data } = supabase.storage.from('store-images').getPublicUrl(store.logo_url)
      store.logo_url = data.publicUrl
    }
    if (store.banner_url) {
      const { data } = supabase.storage.from('store-images').getPublicUrl(store.banner_url)
      store.banner_url = data.publicUrl
    }
  }

  return { profile, store }
}

export async function activateSellerAccount(userId: string, storeName: string) {
  const supabase = await createClient()

  const { error: userError } = await supabase
    .from('users')
    .update({ role: 'seller' })
    .eq('id', userId)

  if (userError) return { success: false, error: userError.message }

  const { data: store, error: storeError } = await supabase
    .from('stores')
    .insert([{
      sellerid: userId, 
      store_name: storeName,
      status: 'active',
      is_verified: true
    }])
    .select()
    .single()

  if (storeError) return { success: false, error: storeError.message }

  return { success: true, store }
}

export async function updateStoreProfile(
  userId: string, 
  updates: { 
    storeName?: string; 
    logoFile?: File; 
    bannerFile?: File; 
  }
) {
  const supabase = await createClient()
  
  // Auth Check: Ensure the person logged in is the person being updated
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.id !== userId) {
    return { success: false, error: "Unauthorized access" }
  }

  const updatePayload: any = {}

  if (updates.storeName) {
    updatePayload.store_name = updates.storeName
  }

  // Upload Logo (Overwrite existing to prevent storage bloat)
  if (updates.logoFile) {
    const { data: logoData, error: logoError } = await supabase.storage
      .from('store-images')
      .upload(`${userId}/logo`, updates.logoFile, { 
        upsert: true,
        contentType: updates.logoFile.type 
      })

    if (logoError) return { success: false, error: logoError.message }
    updatePayload.logo_url = logoData.path
  }

  // Upload Banner (Overwrite existing)
  if (updates.bannerFile) {
    const { data: bannerData, error: bannerError } = await supabase.storage
      .from('store-images')
      .upload(`${userId}/banner`, updates.bannerFile, { 
        upsert: true,
        contentType: updates.bannerFile.type
      })

    if (bannerError) return { success: false, error: bannerError.message }
    updatePayload.banner_url = bannerData.path
  }

  //  Update the record
  const { data, error } = await supabase
    .from('stores')
    .update(updatePayload)
    .eq('sellerid', userId)
    .select()
    .single()

  if (error) return { success: false, error: error.message }

  return { success: true, store: data }
}