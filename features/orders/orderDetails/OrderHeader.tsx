export default function OrderHeader({ order }: { order: any }) {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center md:items-end gap-4 border-b border-border pb-10">
      <div className="text-center md:text-left space-y-1">
        <h1 className="text-sm font-bold uppercase tracking-widest">
          Order Summary
        </h1>
        <p className="text-[9px] text-muted-foreground uppercase">
          Reference: {order.id.slice(0, 8).toUpperCase()}
        </p>
      </div>

      <div className="bg-muted px-8 py-3 rounded-md">
        <p className="text-[10px] uppercase text-muted-foreground mb-1 tracking-widest">
          Amount Paid
        </p>
        <p className="text-lg font-bold text-foreground">
          R {Number(order.total_paid).toFixed(2)}
        </p>
      </div>
    </header>
  )
}