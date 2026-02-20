'use client'

import { useState } from "react"
import { toast } from "sonner"
import { Loader2, Plus, X } from "lucide-react"
import { createVariant, deleteVariant } from "@/lib/supabase/products"

export default function EditProductModal({
  product,
  onClose,
  onUpdate,
}: {
  product: any
  onClose: () => void
  onUpdate: () => void
}) {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [sku, setSku] = useState("")
  const [stock, setStock] = useState("")
  const [priceOverride, setPriceOverride] = useState("")

  async function handleAddVariant() {
    if (!name || !stock) {
      toast.error("Please provide a name and stock level")
      return
    }

    setLoading(true)
    const result = await createVariant({
      productId: product.id,
      name,
      sku: sku || undefined,
      stock: Number(stock),
      priceOverride: priceOverride ? Number(priceOverride) : undefined
    })

    if (result.success) {
      toast.success("Variant added")
      setName("")
      setSku("")
      setStock("")
      setPriceOverride("")
      onUpdate()
    } else {
      toast.error(result.error || "Failed to add variant")
    }
    setLoading(false)
  }

  async function handleDeleteVariant(id: string) {
    if (product.product_variants.length <= 1) {
      toast.error("Products must have at least one variant")
      return
    }

    setLoading(true)
    const result = await deleteVariant(id)
    if (result.success) {
      toast.success("Variant removed")
      onUpdate()
    } else {
      toast.error("Could not remove variant")
    }
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-background p-8 rounded-3xl w-full max-w-[450px] space-y-8 border border-border/40 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-normal tracking-tight">Manage Catalog</h2>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{product.title}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        <div className="space-y-3">
          <p className="text-[9px] uppercase tracking-widest text-muted-foreground ml-1">Active Variants</p>
          <div className="max-h-[180px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
            {product.product_variants?.map((v: any) => {
              const inv = v.inventory_levels
              const currentStock = Array.isArray(inv) ? (inv[0]?.stock_count ?? 0) : (inv?.stock_count ?? 0)
              
              return (
                <div key={v.id} className="flex items-center justify-between bg-muted/20 px-4 py-3 rounded-2xl border border-border/10">
                  <div className="flex flex-col">
                    <span className="text-xs font-normal">{v.name}</span>
                    <span className="text-[8px] uppercase tracking-tight text-muted-foreground">
                      {v.sku || 'no-sku'} — {currentStock} units
                      {v.price_override && ` — R ${v.price_override}`}
                    </span>
                  </div>
                  <button 
                    onClick={() => handleDeleteVariant(v.id)}
                    disabled={loading}
                    className="text-[9px] uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors disabled:opacity-30"
                  >
                    Remove
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        <div className="space-y-4 border-t border-border/40 pt-6">
          <p className="text-[9px] uppercase tracking-widest text-muted-foreground ml-1">Add New Configuration</p>
          <div className="space-y-3">
            <input
              placeholder="Variant Name (e.g. Blue / Large)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-muted/20 border border-border/40 rounded-xl px-4 py-3 text-xs outline-none focus:border-primary/50"
            />
            <input
              placeholder="SKU (Optional)"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="w-full bg-muted/20 border border-border/40 rounded-xl px-4 py-3 text-xs outline-none focus:border-primary/50"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Stock Count"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="bg-muted/20 border border-border/40 rounded-xl px-4 py-3 text-xs outline-none focus:border-primary/50"
              />
              <input
                type="number"
                placeholder="Price Override (R)"
                value={priceOverride}
                onChange={(e) => setPriceOverride(e.target.value)}
                className="bg-muted/20 border border-border/40 rounded-xl px-4 py-3 text-xs outline-none focus:border-primary/50"
              />
            </div>
          </div>

          <button
            onClick={handleAddVariant}
            disabled={loading || !name || !stock}
            className="w-full bg-primary text-primary-foreground text-[10px] uppercase tracking-widest py-4 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Plus className="h-3 w-3" />}
            {loading ? "Processing..." : "Confirm & Add Variant"}
          </button>
        </div>
      </div>
    </div>
  )
}