import { getOrderById } from '@/lib/supabase/orders'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import OrderNotFound from '@/features/orders/orderDetails/OrderNotFound'
import OrderStatus from '@/features/orders/orderDetails/OrderStatus'
import OrderMeta from '@/features/orders/orderDetails/OrderMeta'
import OrderItems from '@/features/orders/orderDetails/OrderItems'
import OrderTotals from '@/features/orders/orderDetails/OrderTotals'
import OrderHeader from '@/features/orders/orderDetails/OrderHeader'

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const order = await getOrderById(id)

  if (!order) {
    return <OrderNotFound />
  }

  const storeData = Array.isArray(order.stores)
    ? order.stores[0]
    : order.stores

  const shipmentData = Array.isArray(order.shipments)
    ? order.shipments[0]
    : order.shipments

  const subtotal = Number(order.total_paid) - 50.0

  return (
    <div className="min-h-screen bg-secondary p-4 md:p-8 flex justify-center items-start">
      <div className="w-full max-w-3xl space-y-6 mt-4">
        <div className="flex justify-start px-2">
          <Link
            href="/orders"
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to orders
          </Link>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 md:p-10 shadow-sm">
          <OrderHeader order={order} />
          <OrderStatus order={order} shipmentData={shipmentData} />
          <OrderMeta storeData={storeData} shipmentData={shipmentData} />
          <OrderItems items={order.order_items} />
          <OrderTotals
            subtotal={subtotal}
            totalPaid={Number(order.total_paid)}
          />
        </div>
      </div>
    </div>
  )
}