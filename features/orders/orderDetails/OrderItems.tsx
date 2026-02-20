import Image from 'next/image'

export default function OrderItems({ items }: { items: any[] }) {
  return (
    <div className="py-10 space-y-6">
      {items?.map((item: any) => (
        <div
          key={item.id}
          className="flex items-center gap-6 py-2 border-b border-border last:border-0 pb-4"
        >
          <div className="relative h-16 w-16 bg-muted rounded-md overflow-hidden border border-border shrink-0">
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

          <div className="flex-1 text-left">
            <p className="text-sm font-bold text-foreground">
              {item.product_variants?.products?.title}
            </p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-tight mt-1">
              {item.product_variants?.name} • Qty: {item.quantity}
            </p>
          </div>

          <p className="text-sm font-bold text-foreground">
            R {Number(item.snapshot_price).toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  )
}