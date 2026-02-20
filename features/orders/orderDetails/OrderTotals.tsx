export default function OrderTotals({
  subtotal,
  totalPaid,
}: {
  subtotal: number
  totalPaid: number
}) {
  return (
    <footer className="pt-6 space-y-4 w-full px-2">
      <div className="flex justify-between text-[11px] text-muted-foreground uppercase tracking-widest">
        <span>Subtotal</span>
        <span>R {subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-[11px] text-muted-foreground uppercase tracking-widest">
        <span>Logistics</span>
        <span>R 50.00</span>
      </div>

      <div className="flex justify-between pt-6 border-t border-border text-base font-bold text-foreground">
        <span className="uppercase tracking-widest">
          Total Paid
        </span>
        <span>R {totalPaid.toFixed(2)}</span>
      </div>
    </footer>
  )
}