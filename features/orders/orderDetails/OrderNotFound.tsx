import Link from 'next/link'

export default function OrderNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
        Order not found
      </p>
      <Link
        href="/orders"
        className="mt-4 text-xs underline text-foreground"
      >
        Return to history
      </Link>
    </div>
  )
}