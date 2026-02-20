import { createClient } from "@/lib/supabase/client"

const supabase = createClient()


export async function getSellerStore(sellerId: string) {
  const { data, error } = await supabase
    .from('stores')
    .select('id, store_name, status, is_verified')
    .eq('sellerid', sellerId)
    .single()

  if (error) throw error
  return data
}

export async function getStoreOrders(storeId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      id,
      total_paid,
      status,
      created_at,
      users:buyerid (full_name),
      shipments (status, tracking_number, courier_name)
    `)
    .eq('storeid', storeId)
    .order('created_at', { ascending: false })

  if (error) return { success: false, error: error.message }
  return { success: true, data }
}

export async function getStoreFinancials(storeId: string) {
  // Get Payout History
  const { data: payouts, error: payoutError } = await supabase
    .from('payouts')
    .select('*')
    .eq('storeid', storeId)
    .order('created_at', { ascending: false })

  //  Get Sales Total from Orders
  const { data: sales, error: salesError } = await supabase
    .from('orders')
    .select('total_paid')
    .eq('storeid', storeId)
    .eq('status', 'paid')

  if (payoutError || salesError) {
    return { success: false, error: "Could not retrieve financial data" }
  }

  const totalLifetimeSales = sales?.reduce((acc, curr) => acc + Number(curr.total_paid), 0) || 0
  
  return {
    success: true,
    payouts,
    totalLifetimeSales
  }
}

export async function getStoreInventory(storeId: string) {
  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      title,
      base_price,
      product_variants (
        id,
        name,
        price_override,
        inventory_levels (stock_count)
      )
    `)
    .eq('storeid', storeId)

  if (error) throw error
  return data
}