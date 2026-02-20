'use client'

import { useState } from "react"
import { ChevronDown, ChevronUp, Trash2, Loader2 } from "lucide-react"
import EditProductModal from "./EditProductModal"
import { deleteProduct } from "@/lib/supabase/products"
import { toast } from "sonner"

export default function ProductRow({
  product,
  onStockUpdate,
  isLast,
}: {
  product: any 
  onStockUpdate: () => void
  isLast: boolean
}) {
  const [editing, setEditing] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const totalStock = product.product_variants?.reduce((acc: number, v: any) => {
    const data = v.inventory_levels
    const count = Array.isArray(data) ? (data[0]?.stock_count || 0) : (data?.stock_count || 0)
    return acc + count
  }, 0) || 0

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation()
    
    if (!window.confirm("Are you sure you want to delete this product?")) return

    setIsDeleting(true)
    const result = await deleteProduct(product.id)

    if (result.success) {
      toast.success("Product removed")
      onStockUpdate() // refresh the list
    } else {
      toast.error("Delete failed", { description: result.error })
      setIsDeleting(false)
    }
  }

  return (
    <div className={`group ${!isLast ? "border-b border-border/40" : ""} ${isDeleting ? "opacity-40 pointer-events-none" : ""}`}>
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-6 flex items-center justify-between cursor-pointer hover:bg-muted/5 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-muted/30 flex items-center justify-center border border-border/10 overflow-hidden relative">
            {product.image_url ? (
              <img 
                src={product.image_url} 
                alt={product.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full">
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            )}
            {product.image_url && (
              <div className="absolute bottom-0 right-0 bg-background/80 backdrop-blur-sm p-0.5 rounded-tl-md border-t border-l border-border/20">
                {isExpanded ? <ChevronUp className="h-2 w-2" /> : <ChevronDown className="h-2 w-2" />}
              </div>
            )}
          </div>
          <div className="text-left">
            <p className="text-sm font-normal text-foreground">{product.title}</p>
            <p className="text-[9px] uppercase tracking-widest text-muted-foreground">
              {product.product_variants?.length || 0} variants • {totalStock} total units
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-8">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-normal">R {product.base_price}</p>
            <p className="text-[9px] uppercase tracking-widest text-muted-foreground">Base Price</p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 text-muted-foreground hover:text-destructive transition-colors rounded-lg hover:bg-destructive/5"
            >
              {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation()
                setEditing(true)
              }}
              className="text-[9px] uppercase tracking-widest text-primary border border-primary/20 px-4 py-2 rounded-lg hover:bg-primary/5 transition-colors"
            >
              Manage
            </button>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="px-6 pb-6 pt-2 space-y-2 bg-muted/5">
          <p className="text-[9px] uppercase tracking-widest text-muted-foreground ml-1 mb-3 text-left">
            variant breakdown
          </p>
          {product.product_variants?.map((v: any) => {
            const data = v.inventory_levels
            const currentStock = Array.isArray(data) ? (data[0]?.stock_count || 0) : (data?.stock_count || 0)
            
            return (
              <div
                key={v.id}
                className="flex items-center justify-between bg-background border border-border/40 px-4 py-3 rounded-xl"
              >
                <div className="flex flex-col text-left">
                  <span className="text-xs font-normal">{v.name}</span>
                  <span className="text-[8px] uppercase tracking-tight text-muted-foreground">
                    {v.sku || 'no-sku'}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right px-4">
                    <span className="text-xs font-normal">{currentStock}</span>
                    <p className="text-[8px] uppercase text-muted-foreground">In Stock</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {editing && (
        <EditProductModal
          product={product}
          onClose={() => setEditing(false)}
          onUpdate={onStockUpdate}
        />
      )}
    </div>
  )
}