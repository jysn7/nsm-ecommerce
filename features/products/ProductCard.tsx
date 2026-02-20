'use client';

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useStore } from "@/hooks/use-cart"
import { toast } from "sonner"

interface ProductProps {
  id: string // product id
  storeid: string // from products table
  name: string
  price: number
  category: string
  image: string
  amount: number 
  slug: string
  variants?: any[]
}

export function ProductCard({ id, storeid, name, price, category, image, amount, slug, variants }: ProductProps) {
  const { items, addItem } = useStore()

  const defaultVariant = variants && variants.length > 0 ? variants[0] : null
  
  const activeVariantId = defaultVariant?.id || id
  
  const displayName = defaultVariant ? `${name} (${defaultVariant.name})` : name
  const activePrice = defaultVariant?.price_override ?? price ?? 0
  
  const activeStock = (() => {
    const inv = defaultVariant?.inventory
    if (Array.isArray(inv)) return inv[0]?.stock_count || 0
    if (inv?.stock_count !== undefined) return inv.stock_count
    return amount || 0
  })()

  const cartItem = items.find((item) => item.id === activeVariantId)
  const quantityInCart = cartItem?.quantity || 0
  const isAtLimit = quantityInCart >= activeStock
  const isOutOfStock = activeStock <= 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isAtLimit) {
      toast.error("Stock limit reached", {
        description: `You already have all ${activeStock} units in your bag.`
      })
      return
    }

    addItem({ 
      id: activeVariantId, 
      productid: id,
      storeid: storeid,
      name: displayName, 
      price: activePrice, 
      image, 
      stock: activeStock 
    })
    
    toast.success('Added to bag')
  }

  return (
    <Link 
      href={`/products/${slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl bg-background transition-all hover:shadow-md text-left"
    >
      
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1.5 items-start pointer-events-none text-center">  
        {activeStock > 0 && activeStock < 5 && (
          <div className="flex items-center gap-1.5 bg-foreground px-2 py-0.5 rounded-md shadow-lg border border-foreground/10">
            <span className="relative flex h-1 w-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1 w-1 bg-red-500"></span>
            </span>
            <span className="text-background/40 text-[8px] uppercase tracking-tighter font-bold">
              {activeStock} LEFT
            </span>
          </div>
        )}

        {isOutOfStock && (
          <span className="bg-red-500 px-2 py-0.5 rounded-md text-[8px] uppercase tracking-wider font-bold text-white shadow-sm">
            Sold Out
          </span>
        )}
      </div>

      <div className={`relative aspect-square overflow-hidden bg-muted/40 ${isOutOfStock ? 'opacity-60 grayscale-[0.5]' : ''}`}>
        <Image 
          src={image} 
          alt={name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      <div className="p-3 space-y-2 text-center">
        <div>
          <p className="text-[9px] uppercase tracking-widest text-muted-foreground">{category}</p>
          <h3 className="line-clamp-2 text-xs font-normal text-foreground leading-tight h-8">
            {name}
          </h3>
        </div>
        
        <div className="flex items-center justify-between relative z-20">
          <span className="text-sm font-normal text-foreground">
            R {activePrice.toFixed(2)}
          </span>
          
          <Button 
            size="icon" 
            className={`h-7 w-7 rounded-lg transition-all ${
              isAtLimit || isOutOfStock 
                ? "bg-muted text-muted-foreground cursor-not-allowed" 
                : "bg-primary hover:opacity-90 active:scale-95 text-primary-foreground"
            }`}
            onClick={handleAddToCart}
            disabled={isOutOfStock || isAtLimit}
          >
            {isAtLimit ? (
              <AlertCircle className="h-3.5 w-3.5" />
            ) : (
              <ShoppingCart className="h-3.5 w-3.5" />
            )}
          </Button>
        </div>
        
        {isAtLimit && !isOutOfStock && (
          <p className="text-[7px] uppercase tracking-tighter text-orange-600 animate-pulse">
            Limit reached
          </p>
        )}
      </div>
    </Link>
  )
}