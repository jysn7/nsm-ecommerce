import { Store, Truck } from 'lucide-react'

export default function OrderMeta({
  storeData,
  shipmentData,
}: {
  storeData: any
  shipmentData: any
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-10 border-b border-border text-[11px]">
      <div className="flex flex-col items-center md:items-start space-y-2 text-center md:text-left">
        <div className="flex items-center gap-2 text-muted-foreground uppercase font-bold text-[9px] tracking-widest">
          <Store className="h-3 w-3" />
          Merchant
        </div>
        <p className="text-foreground text-sm">
          {storeData?.store_name}
        </p>
        <p className="text-[9px] text-muted-foreground uppercase">
          Verified Seller
        </p>
      </div>

      <div className="flex flex-col items-center md:items-start space-y-2 text-center md:text-left">
        <div className="flex items-center gap-2 text-muted-foreground uppercase font-bold text-[9px] tracking-widest">
          <Truck className="h-3 w-3" />
          Logistics
        </div>
        <p className="text-foreground text-sm">
          {shipmentData?.courier_name || 'Standard Delivery'}
        </p>
        <p className="text-[9px] text-muted-foreground uppercase tracking-tighter">
          {shipmentData?.tracking_number || 'Tracking pending'}
        </p>
      </div>
    </div>
  )
}