'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createOrder(checkoutData: {
  buyerId: string;
  items: any[];
}) {
  const supabase = await createClient()

  const itemsByStore = checkoutData.items.reduce((acc: any, item: any) => {
    const storeId = item.storeid || item.storeId 
    
    if (!storeId) {
      throw new Error(`Item ${item.name} is missing a store ID. Please clear your cart and try again.`)
    }
    
    if (!acc[storeId]) acc[storeId] = []
    acc[storeId].push(item)
    return acc
  }, {})

  try {
    const orderIds = []

    for (const storeId in itemsByStore) {
      const storeItems = itemsByStore[storeId]
      
      const { data, error } = await supabase.rpc('process_checkout', {
        p_buyer_id: checkoutData.buyerId,
        p_items: storeItems,
        p_shipping_cost: 50.00
      })

      if (error) throw error
      orderIds.push(data)
    }

    revalidatePath('/app/buyer/orders')
    
    return { success: true, orderIds }
    
  } catch (error: any) {
    console.error('Checkout Error:', error.message)
    return { success: false, error: error.message }
  }
}

export async function getBuyerOrders() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data: orders, error } = await supabase
    .from('orders')
    .select(`
      id,
      status,
      total_paid,
      created_at,
      stores (
        store_name
      ),
      order_items (
        id,
        snapshot_price,
        quantity,
        product_variants (
          name,
          products (
            image_url, 
            title
          )
        )
      )
    `)
    .eq('buyerid', user.id)
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) throw error
  return orders
}

export async function getOrderById(orderId: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: order, error } = await supabase
    .from('orders')
    .select(`
      id,
      status,
      total_paid,
      created_at,
      stores (
        store_name
      ),
      shipments (
        status,
        tracking_number,
        courier_name
      ),
      order_items (
        id,
        snapshot_price,
        quantity,
        product_variants (
          name,
          products (
            title,
            image_url
          )
        )
      )
    `)
    .eq('id', orderId)
    .eq('buyerid', user.id)
    .single()

  if (error) return null
  
  return order
}