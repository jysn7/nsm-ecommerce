'use client'

import { useState, useEffect } from "react"
import { 
  Wallet, 
  Package, 
  Truck, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2,
  Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getSellerStore, getStoreOrders, getStoreFinancials } from "@/lib/supabase/seller"
import { createClient } from "@/lib/supabase/client"
import PayoutsSkeleton from "./PayoutSkeleton"

export default function PayoutsTab() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<{
    orders: any[]
    payouts: any[]
    lifetimeSales: number
    store: any
  } | null>(null)

  const supabase = createClient()

  useEffect(() => {
    async function loadSellerData() {
      setLoading(true)
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const store = await getSellerStore(user.id)
        const [ordersRes, financeRes] = await Promise.all([
          getStoreOrders(store.id),
          getStoreFinancials(store.id)
        ])

        setData({
          store,
          orders: ordersRes.success ? (ordersRes.data ?? []) : [],
          payouts: financeRes.success ? (financeRes.payouts ?? []) : [],
          lifetimeSales: financeRes.success ? (financeRes.totalLifetimeSales ?? 0) : 0,
        })
      } catch (error) {
        console.error("Error loading payout data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadSellerData()
  }, [])

  if (loading) return (
    <PayoutsSkeleton />
  )

  const orders = data?.orders ?? []
  const payouts = data?.payouts ?? []
  const pendingOrdersCount = orders.filter(o => o.status === 'paid' && o.shipments?.status === 'processing').length

  return (
    <div className="space-y-12">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-muted/20 border border-border/40 rounded-2xl p-8 space-y-4 text-center">
          <Wallet className="h-5 w-5 mx-auto text-muted-foreground stroke-[1.5]" />
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Available Payout</p>
            <p className="text-2xl font-normal tracking-tight">R {(data?.lifetimeSales || 0).toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-muted/20 border border-border/40 rounded-2xl p-8 space-y-4 text-center">
          <Clock className="h-5 w-5 mx-auto text-muted-foreground stroke-[1.5]" />
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Pending Shipments</p>
            <p className="text-2xl font-normal tracking-tight">{pendingOrdersCount}</p>
          </div>
        </div>

        <div className="bg-muted/20 border border-border/40 rounded-2xl p-8 space-y-4 text-center">
          <CheckCircle2 className="h-5 w-5 mx-auto text-muted-foreground stroke-[1.5]" />
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Total Earned</p>
            <p className="text-2xl font-normal tracking-tight">R {(data?.lifetimeSales || 0).toLocaleString()}</p>
          </div>
        </div>
      </div>

      <section className="bg-foreground text-background rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div className="space-y-2">
          <h3 className="text-xl font-normal tracking-tight uppercase">Withdraw Funds</h3>
          <p className="text-xs opacity-70 max-w-sm">
            Transfer your balance to your linked account. Request will be processed within 24 hours.
          </p>
        </div>
        <Button variant="secondary" className="h-14 px-12 rounded-xl text-[10px] uppercase tracking-widest font-bold gap-2 w-full md:w-auto">
          Request Transfer <ArrowUpRight className="h-4 w-4" />
        </Button>
      </section>

      <section className="space-y-6">
        <div className="border-b border-border/40 pb-4 text-center md:text-left">
          <h3 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Recent Order Activity</h3>
        </div>

        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="p-10 text-center text-xs text-muted-foreground">No recent orders.</div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-background border border-border/40 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center gap-5">
                  <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center">
                    <Package className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-normal truncate max-w-37.5">{order.users?.full_name || 'Guest'}</p>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-widest">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="space-y-1">
                    <p className="text-[9px] uppercase tracking-widest text-muted-foreground">Status</p>
                    <Badge variant="outline" className="text-[9px] uppercase font-bold">{order.status}</Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] uppercase tracking-widest text-muted-foreground">Total</p>
                    <p className="text-sm font-normal">R {order.total_paid}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="space-y-6">
        <div className="border-b border-border/40 pb-4 text-center md:text-left">
          <h3 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Payout History</h3>
        </div>
        <div className="rounded-xl border border-border/40 overflow-hidden">
          {payouts.length === 0 ? (
            <div className="p-10 text-center text-xs text-muted-foreground">No payout history found.</div>
          ) : (
            payouts.map((payout) => (
              <div key={payout.id} className="flex items-center justify-between px-6 py-4 border-b border-border/10 last:border-none bg-muted/5 text-[11px]">
                <span className="text-muted-foreground">{new Date(payout.created_at).toLocaleDateString()}</span>
                <span className="font-normal text-foreground">R {payout.amount}</span>
                <span className={`uppercase tracking-widest text-[9px] font-bold ${payout.status === 'completed' ? 'text-emerald-500' : 'text-amber-500'}`}>
                  {payout.status}
                </span>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}