import Image from 'next/image'

export default function OrderItem({ item }: { item: any }) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-muted border border-border">
        <Image
          src={
            item.product_variants?.products?.image_url ||
            '/placeholder.png'
          }
          alt="Product"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 min-w-0 text-left">
        <p className="truncate text-xs font-bold text-foreground">
          {item.product_variants?.products?.title}
        </p>
        <p className="text-[10px] uppercase text-muted-foreground mt-0.5">
          {item.product_variants?.name} • Qty {item.quantity}
        </p>
      </div>

      <p className="text-xs font-bold text-foreground">
        R {Number(item.snapshot_price).toFixed(2)}
      </p>
    </div>
  )
}