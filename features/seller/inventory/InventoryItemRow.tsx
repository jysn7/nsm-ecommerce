'use client'

import { Package } from "lucide-react"

type Product = {
  id: string
  name: string
  stock: number
  price: number
  status: string
}

export default function InventoryItemRow({
  product,
  isLast,
}: {
  product: Product
  isLast: boolean
}) {
  return (
    <div
      className={`p-5 flex items-center justify-between hover:bg-muted/10 transition-colors ${
        !isLast ? "border-b border-border/40" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center">
          <Package className="h-4 w-4 text-muted-foreground stroke-[1.5]" />
        </div>

        <div>
          <p className="text-xs font-normal text-foreground">
            {product.name}
          </p>
          <p className="text-[9px] uppercase tracking-tight text-muted-foreground">
            {product.id} • R {product.price} • {product.stock} units
          </p>
        </div>
      </div>

      <span
        className={`text-[8px] uppercase tracking-widest px-3 py-1 rounded-full font-medium ${
          product.status === "In Stock"
            ? "bg-muted text-muted-foreground"
            : product.status === "Low Stock"
            ? "bg-yellow-500/10 text-yellow-600"
            : "bg-red-500/10 text-red-600"
        }`}
      >
        {product.status}
      </span>
    </div>
  )
}
