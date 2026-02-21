export default function OrdersHeader() {
  return (
    <div className="text-left max-w-2xl">
      <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
        Purchase History
      </p>
      <h1 className="text-5xl font-normal tracking-tighter text-foreground uppercase mb-6">
        Your Orders
      </h1>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Track your shipments, view order details, and manage your recent purchases from community merchants.
      </p>
    </div>
  )
}