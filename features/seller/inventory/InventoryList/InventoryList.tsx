'use client'

import ProductRow from "./ProductRow"

export default function InventoryList({
  products,
  onStockUpdate,
}: {
  products: any[] 
  onStockUpdate: () => void 
}) {
  if (products.length === 0) {
    return (
      <div className="border border-border/40 rounded-3xl p-20 text-center space-y-2 bg-muted/5">
        <p className="text-sm font-normal">No products found</p>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
          Your inventory catalog is currently empty
        </p>
      </div>
    )
  }

  return (
    <div className="border border-border/40 rounded-3xl overflow-hidden bg-background">
      {products.map((product, index) => (
        <ProductRow
          key={product.id}
          product={product}
          onStockUpdate={onStockUpdate}
          isLast={index === products.length - 1}
        />
      ))}
    </div>
  )
}