'use client'

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { getProductBySlug } from "@/lib/supabase/products"
import { useStore } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Store, ShieldCheck, Loader2, ChevronRight, AlertCircle } from "lucide-react"
import { toast } from "sonner"

export default function ProductPage() {
  const { slug } = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<any>(null)
  const [selectedVariant, setSelectedVariant] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  // Connect to Zustand store items and actions
  const { items, addItem } = useStore()

  useEffect(() => {
    async function loadProduct() {
      const result = await getProductBySlug(slug as string)
      
      if (!result.success || !result.data) {
        setProduct(null)
        setLoading(false)
        return
      }

      setProduct(result.data)
      if (result.data.variants?.length > 0) {
        setSelectedVariant(result.data.variants[0])
      }
      setLoading(false)
    }
    loadProduct()
  }, [slug])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!product) return <div className="py-20 text-center text-xs uppercase tracking-widest">Product not found</div>

  const currentPrice = selectedVariant?.price_override || product.base_price
  
  // Get stock for the specific variant
  const currentStock = (() => {
    const inv = selectedVariant?.inventory
    return Array.isArray(inv) ? (inv[0]?.stock_count || 0) : (inv?.stock_count || 0)
  })()

  // Find if this variant is already in the bag to check limits
  const cartItem = items.find(item => item.id === (selectedVariant?.id || product.id))
  const quantityInCart = cartItem?.quantity || 0
  const isAtLimit = quantityInCart >= currentStock

  const handleAddToCart = () => {
    if (isAtLimit) {
      toast.error("Stock limit reached", {
        description: `You already have all ${currentStock} available units in your bag.`
      })
      return
    }

    addItem({
      id: selectedVariant?.id || product.id,
      name: `${product.title} ${selectedVariant ? `(${selectedVariant.name})` : ''}`,
      price: currentPrice,
      image: product.image_url,
      stock: currentStock // Passing stock to the store for validation
    })
    
    toast.success("Added to bag")
  }

  return (
    <div className="flex flex-col items-center bg-background min-h-screen">
      <div className="w-full max-w-[1200px] px-8 py-6">
        
        <nav className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-muted-foreground mb-6">
          <span className="cursor-pointer hover:text-foreground transition-colors" onClick={() => router.push('/')}>Home</span>
          <ChevronRight className="h-3 w-3" />
          <span className="cursor-pointer hover:text-foreground transition-colors" onClick={() => router.push('/products')}>Products</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground truncate max-w-[200px]">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 py-6">
          
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted/30 border border-border/10">
            {product.image_url && (
              <Image 
                src={product.image_url} 
                alt={product.title} 
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
          </div>

          <div className="flex flex-col text-left space-y-8">
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                {product.category?.name || "General"}
              </p>
              <h1 className="text-3xl font-normal tracking-tight text-foreground">{product.title}</h1>
              <p className="text-2xl font-normal">R {currentPrice}</p>
            </div>

            <div className="space-y-4">
               <h4 className="text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border/40 pb-2">Description</h4>
               <p className="text-sm text-muted-foreground leading-relaxed">
                 {product.description || "No specific details provided for this item."}
               </p>
            </div>

            {product.variants?.length > 0 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-[10px] uppercase tracking-widest text-muted-foreground">Select Option</h4>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {currentStock} Available
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v: any) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-4 py-2 rounded-xl text-xs transition-all border ${
                        selectedVariant?.id === v.id 
                          ? "border-primary bg-primary/5 text-primary" 
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 space-y-3">
              <Button 
                className="w-full h-12 rounded-xl bg-primary hover:opacity-90 text-sm font-normal"
                onClick={handleAddToCart}
                disabled={currentStock <= 0 || isAtLimit}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {currentStock <= 0 ? "Out of Stock" : isAtLimit ? "Limit Reached" : "Add to Cart"}
              </Button>
              
              {isAtLimit && (
                <div className="flex items-center justify-center gap-2 text-orange-500 animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="h-3 w-3" />
                  <p className="text-[10px] uppercase tracking-widest">Maximum available stock in bag</p>
                </div>
              )}
            </div>

            <div className="pt-8 mt-8 border-t border-border/40">
              <div className="flex items-center gap-4">
                <div className="relative h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden border border-border/10">
                  {product.store?.logo_url ? (
                    <Image 
                      src={product.store.logo_url} 
                      alt={product.store.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Store className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-normal text-foreground">{product.store?.name || "Retailer"}</p>
                    {product.store?.verified && <ShieldCheck className="h-3 w-3 text-primary" />}
                  </div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Partnered Store</p>
                </div>
                <Button variant="outline" className="h-8 rounded-lg text-[10px] uppercase tracking-widest px-4">
                  Visit Store
                </Button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}