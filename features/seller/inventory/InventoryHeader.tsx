'use client'

import { Plus, Search, Filter } from "lucide-react"

export default function InventoryHeader({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-left">
          <h1 className="text-xl font-normal tracking-tight">Inventory</h1>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
            Manage your product variants and stock levels
          </p>
        </div>
        
        <button
          onClick={onAdd}
          className="bg-primary text-primary-foreground text-[10px] uppercase tracking-widest px-6 py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Product
        </button>
      </div>

      {/* bottom section: search and filter */}
      <div className="flex gap-3 w-full">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input 
            placeholder="Search products or SKUs..." 
            className="w-full bg-muted/20 border border-border/40 rounded-xl pl-11 pr-4 py-3 text-xs outline-none focus:border-primary/50 transition-colors"
          />
        </div>
        
        <button className="bg-muted/20 border border-border/40 px-4 rounded-xl hover:bg-muted/40 transition-colors flex items-center justify-center">
          <Filter className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  )
}