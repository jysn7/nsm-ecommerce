import Link from 'next/link'

export default function EmptyOrders() {
  return (
    <div className="rounded-xl border border-dashed border-border bg-card/50 py-24 text-center">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
        No purchases found
      </p>

      <Link
        href="/app/buyer/search"
        className="mt-4 inline-block text-[10px] font-bold uppercase underline"
      >
        Browse Products
      </Link>
    </div>
  )
}