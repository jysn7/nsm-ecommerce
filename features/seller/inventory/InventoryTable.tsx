'use client'

import InventoryItemRow from "./InventoryItemRow"

const PRODUCTS = [
  { id: "PRD-001", name: "Minimalist Lamp", stock: 12, price: 899, status: "In Stock" },
  { id: "PRD-002", name: "Mechanical Keyboard", stock: 4, price: 1450, status: "Low Stock" },
  { id: "PRD-003", name: "Concrete Pot", stock: 0, price: 299, status: "Out of Stock" },
]

export default function InventoryTable() {
  return (
    <div className="lg:col-span-2 space-y-4">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-[10px] uppercase tracking-widest text-muted-foreground">
          Product Inventory
        </h2>
      </div>

      <div className="bg-background border border-border/40 rounded-2xl overflow-hidden">
        {PRODUCTS.map((product, index) => (
          <InventoryItemRow
            key={product.id}
            product={product}
            isLast={index === PRODUCTS.length - 1}
          />
        ))}
      </div>
    </div>
  )
}
