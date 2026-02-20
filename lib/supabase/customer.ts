// lib/supabase/customer.ts
'use server';

import { createClient } from './server'

export async function getProfileAndStore() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { profile: null, store: null }

  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: store } = await supabase
    .from('stores')
    .select('*')
    .eq('sellerid', user.id) 
    .single()

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