'use client'

import { Button } from '@/components/ui/button'
import { ShoppingCart, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

export default function AddToCartSection({
  product,
  selectedVariant,
  currentPrice,
  currentStock,
  isAtLimit,
  addItem,
}: any) {
  const handleAddToCart = () => {
    if (isAtLimit) {
      toast.error('Stock limit reached', {
        description: `You already have all ${currentStock} available units in your bag.`,
      })
      return
    }

    addItem({
      id: selectedVariant?.id || product.id,
      productid: product.id,
      storeid: product.store?.id || product.storeid,
      name: `${product.title} ${
        selectedVariant ? `(${selectedVariant.name})` : ''
      }`,
      price: currentPrice,
      image: product.image_url,
      stock: currentStock,
    })

    toast.success('Added to bag')
  }

  return (
    <div className="pt-4 space-y-3">
      <Button
        className="w-full h-12 rounded-xl bg-primary hover:opacity-90 text-sm font-normal"
        onClick={handleAddToCart}
        disabled={currentStock <= 0 || isAtLimit}
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        {currentStock <= 0
          ? 'Out of Stock'
          : isAtLimit
          ? 'Limit Reached'
          : 'Add to Cart'}
      </Button>

      {isAtLimit && (
        <div className="flex items-center justify-center gap-2 text-orange-500 animate-in fade-in slide-in-from-top-1">
          <AlertCircle className="h-3 w-3" />
          <p className="text-[10px] uppercase tracking-widest">
            Maximum available stock in bag
          </p>
        </div>
      )}
    </div>
  )
}