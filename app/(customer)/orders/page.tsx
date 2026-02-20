import { getBuyerOrders } from '@/lib/supabase/orders'
import OrdersHeader from '@/features/orders/OrdersHeader'
import EmptyOrders from '@/features/orders/EmptyOrders'
import OrderList from '@/features/orders/OrdersList'

export default async function OrdersPage() {
  const orders = await getBuyerOrders().catch(() => [])

  return (
    <div className="min-h-screen bg-secondary p-4 md:p-10 flex justify-center">
      <div className="w-full max-w-4xl space-y-8">
        <OrdersHeader />

        {orders.length === 0 ? (
          <EmptyOrders />
        ) : (
          <OrderList orders={orders} />
        )}
      </div>
    </div>
  )
}