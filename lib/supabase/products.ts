'use server'

import { createClient } from './server'

export async function createProduct(formData: any) {
  const supabase = await createClient()
  let publicUrl = null

  // 1. handle image upload if a file exists
  if (formData.image) {
    const file = formData.image
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
    const filePath = `products/${formData.storeid}/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('market-assets')
      .upload(filePath, file)

    if (uploadError) {
      return { success: false, error: "Image upload failed: " + uploadError.message }
    }

    // get the public link
    const { data: urlData } = supabase.storage
      .from('market-assets')
      .getPublicUrl(filePath)
    
    publicUrl = urlData.publicUrl
  }

  // 2. generate slug
  const slug = formData.title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '') + '-' + Math.random().toString(36).substring(2, 7)

  // 3. call database function with the new image url
  const { data: productId, error } = await supabase.rpc('create_product_with_inventory', {
    p_store_id: formData.storeid,
    p_category_id: formData.categoryid,
    p_title: formData.title,
    p_slug: slug,
    p_description: formData.description || "",
    p_base_price: formData.price,
    p_sku: formData.sku || `sku-${Math.random().toString(36).toUpperCase().substring(2, 8)}`,
    p_stock: formData.stock,
    p_image_url: publicUrl // ensure your RPC accepts this parameter
  })

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, productId }
}

export async function deleteProduct(productId: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId)

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function getStoreInventory(storeId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      title,
      image_url,
      base_price,
      product_variants (
        id,
        name,
        sku,
        inventory_levels (
          stock_count
        )
      )
    `)
    .eq('storeid', storeId)
    .order('created_at', { ascending: false })

  if (error) return { success: false, error: error.message }
  return { success: true, data }
}

export async function createVariant(formData: {
  productId: string
  name: string
  sku?: string
  stock: number
  priceOverride?: number
}) {
  const supabase = await createClient()

  // 1. insert into product_variants
  const { data: variant, error: vError } = await supabase
    .from('product_variants')
    .insert([{
      productid: formData.productId,
      name: formData.name,
      // includes price_override if provided, otherwise stays null (default)
      price_override: formData.priceOverride || null,
      sku: formData.sku || `sku-${Math.random().toString(36).toUpperCase().substring(2, 8)}`
    }])
    .select()
    .single()

  if (vError) return { success: false, error: vError.message }

  // 2. insert into inventory_levels
  const { error: iError } = await supabase
    .from('inventory_levels')
    .insert([{
      variantid: variant.id,
      stock_count: formData.stock
    }])

  if (iError) {
    // cleanup variant if inventory fails to maintain data integrity
    await supabase.from('product_variants').delete().eq('id', variant.id)
    return { success: false, error: iError.message }
  }

  return { success: true, variantId: variant.id }
}

export async function deleteVariant(variantId: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('product_variants')
    .delete()
    .eq('id', variantId)

  if (error) return { success: false, error: error.message }

  return { success: true }
}




// ------------ Customer -----------------------

export async function getBuyerProducts() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      title,
      base_price,
      image_url,
      slug,
      category:categories(name),
      variants:product_variants(
        id,
        name,
        price_override,
        created_at,
        inventory:inventory_levels(stock_count)
      )
    `)

  if (error) {
    return { success: false, error: error.message, data: [] }
  }

  if (!data || data.length === 0) {
    return { success: true, data: [] }
  }

  const formatted = data.map((p: any) => {
    const sortedVariants = p.variants ? [...p.variants].sort((a: any, b: any) => 
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    ) : []

    return {
      id: p.id,
      name: p.title, 
      price: p.base_price,
      slug: p.slug,
      category: p.category?.name?.toLowerCase() || 'unassigned',
      image: p.image_url || null,
      variants: sortedVariants,
      amount: sortedVariants.reduce((acc: number, v: any) => {
        const inv = v.inventory
        const count = Array.isArray(inv) ? inv[0]?.stock_count : inv?.stock_count
        return acc + (count || 0)
      }, 0)
    }
  })

  return { success: true, data: formatted }
}

export async function getCategories() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('categories')
    .select('id, name')
    .order('name', { ascending: true })

  if (error) {
    return { success: false, error: error.message, data: [] }
  }

  return { success: true, data }
}

export async function getProductBySlug(slug: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      title,
      description,
      base_price,
      image_url,
      slug,
      categoryid,
      categories ( name ),
      stores (
        id,
        store_name,
        status,
        is_verified
      ),
      product_variants (
        id,
        name,
        price_override,
        sku,
        inventory_levels ( stock_count )
      )
    `)
    .eq('slug', slug)
    .maybeSingle()

  if (error) return { success: false, error: error.message }
  if (!data) return { success: false, error: "Product not found" }

  const storeData = Array.isArray(data.stores) ? data.stores[0] : data.stores
  const categoryData = Array.isArray(data.categories) ? data.categories[0] : data.categories

  const formattedData = {
    ...data,
    category: categoryData,
    store: {
      id: storeData?.id,
      name: storeData?.store_name,
      verified: storeData?.is_verified,
      status: storeData?.status
    },
    variants: data.product_variants?.map((v: any) => ({
      ...v,
      inventory: v.inventory_levels
    }))
  }

  return { success: true, data: formattedData }
}