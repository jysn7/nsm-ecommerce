'use client';

import VariantSelector from './VariantSelector'
import AddToCartSection from './AddToCartSection'
import StoreSection from './StoreSection'

export default function ProductInfo({
  product,
  selectedVariant,
  setSelectedVariant,
  items,
  addItem,
}: any) {
  const currentPrice =
    selectedVariant?.price_override || product.base_price

  const inv = selectedVariant?.inventory
  const currentStock = Array.isArray(inv)
    ? inv[0]?.stock_count || 0
    : inv?.stock_count || 0

  const cartItem = items.find(
    (item: any) =>
      item.id === (selectedVariant?.id || product.id)
  )

  const quantityInCart = cartItem?.quantity || 0
  const isAtLimit = quantityInCart >= currentStock

  return (
    <div className="flex flex-col text-left space-y-8">
      <div className="space-y-2">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
          {product.category?.name || 'General'}
        </p>
        <h1 className="text-3xl font-normal tracking-tight text-foreground">
          {product.title}
        </h1>

        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-normal">
            R {Number(currentPrice).toFixed(2)}
          </p>

          {selectedVariant?.price_override && (
            <p className="text-xs text-muted-foreground line-through">
              R {Number(product.base_price).toFixed(2)}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border/40 pb-2">
          Description
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {product.description ||
            'No specific details provided for this item.'}
        </p>
      </div>

      {product.variants?.length > 0 && (
        <VariantSelector
          variants={product.variants}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
          currentStock={currentStock}
        />
      )}

      <AddToCartSection
        product={product}
        selectedVariant={selectedVariant}
        currentPrice={currentPrice}
        currentStock={currentStock}
        isAtLimit={isAtLimit}
        addItem={addItem}
      />

      <StoreSection store={product.store} />
    </div>
  )
}