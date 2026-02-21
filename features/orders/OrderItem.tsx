import Image from 'next/image'

export default function OrderItem({ item }: { item: any }) {
  return (
    <div className="flex items-center gap-3 sm:gap-4 w-full">
      <div className="relative h-12 w-12 sm:h-14 sm:w-14 shrink-0 overflow-hidden rounded-md bg-muted border border-border">
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
      <div className='flex flex-col md:flex-row md:items-center  md:justify-between md:flex-2 items-start'>
      <div className="flex-1 min-w-0 text-left">
        <p className="truncate text-[10px] sm:text-xs font-semibold text-foreground">
          {item.product_variants?.products?.title}
        </p>
        <p className="text-[8px] sm:text-[9px] uppercase font-semibold text-muted-foreground mt-1 tracking-tight">
          {item.product_variants?.name} • Qty {item.quantity}
        </p>
      </div>
      

      <p className="text-[10px] sm:text-xs font-semibold text-foreground whitespace-nowrap md:ml-2">
        R {Number(item.snapshot_price).toFixed(2)}
      </p>
      </div>
    </div>
  )
}