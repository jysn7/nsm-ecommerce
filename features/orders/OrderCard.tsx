import { Package, Calendar, Store, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import OrderItem from './OrderItem'

export default function OrderCard({ order }: { order: any }) {
  const storeData = Array.isArray(order.stores)
    ? order.stores[0]
    : order.stores

  const dbStatus = String(order.status || 'pending')
    .toLowerCase()
    .trim()

  const displayStatus = dbStatus.replace('_', ' ')

  return (
    <details className="group bg-card border-2 border-border rounded-xl transition-all open:shadow-sm">
      <summary className="list-none cursor-pointer p-4 sm:p-6 focus:outline-none">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-foreground">
              <Package className="h-5 w-5" />
            </div>
            <div className="text-left space-y-1">
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-tight">
                Order #{order.id.slice(0, 8).toUpperCase()}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[9px] uppercase font-bold text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(order.created_at).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1 font-semibold text-primary">
                  {displayStatus}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-8">
            <div className="text-right">
              <p className="text-[10px] sm:text-xs font-semibold text-foreground">
                R {Number(order.total_paid).toFixed(2)}
              </p>
              <p className="text-[8px] sm:text-[9px] uppercase font-bold text-muted-foreground tracking-tighter">
                {order.order_items?.length || 0} Items
              </p>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
          </div>
        </div>
      </summary>

      <div className="px-4 sm:px-6 pb-6 pt-2 space-y-6 border-t border-border mt-2">
        <div className="space-y-4 pt-4 sm:pt-6">
          {order.order_items?.map((item: any) => (
            <OrderItem key={item.id} item={item} />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border/50">
          <div className="flex items-center gap-2 text-[9px] uppercase font-bold text-muted-foreground tracking-widest">
            <Store className="h-3 w-3" />
            {storeData?.store_name}
          </div>

          <Link
            href={`/orders/${order.id}`}
            className="w-full sm:w-auto text-center rounded-lg bg-primary px-6 py-2.5 text-[9px] uppercase font-semibold tracking-widest text-primary-foreground transition-opacity hover:opacity-90"
          >
            View Full Details
          </Link>
        </div>
      </div>
    </details>
  )
}