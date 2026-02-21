import { getBuyerOrders } from '@/lib/supabase/orders'
import OrdersHeader from '@/features/orders/OrdersHeader'
import EmptyOrders from '@/features/orders/EmptyOrders'
import OrderList from '@/features/orders/OrdersList'
import { Separator } from "@/components/ui/separator"

export default async function OrdersPage() {
  const orders = await getBuyerOrders().catch(() => [])

  return (
    <div className="min-h-screen bg-background">
      <section className="pt-32 pb-16 px-8 md:px-16 lg:px-24 max-w-350 mx-auto">
        <OrdersHeader />
        <Separator className="mt-12 opacity-40" />
      </section>

      <main className="px-8 md:px-16 lg:px-24 max-w-350 mx-auto">
        {orders.length === 0 ? (
          <EmptyOrders />
        ) : (
          <OrderList orders={orders} />
        )}
      </main>
    </div>
  )
}