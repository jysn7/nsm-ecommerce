'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { getProductBySlug } from '@/lib/supabase/products'
import { useStore } from '@/hooks/use-cart'

import ProductLoading from '@/features/products/ProductDetail/ProductLoading'
import ProductNotFound from '@/features/products/ProductDetail/ProductNotFound'
import ProductBreadcrumbs from '@/features/products/ProductDetail/ProductBreadcrumbs'
import ProductGallery from '@/features/products/ProductDetail/ProductGallery'
import ProductInfo from '@/features/products/ProductDetail/ProductInfo'

export default function ProductPage() {
  const { slug } = useParams()
  const { items, addItem } = useStore()

  const [product, setProduct] = useState<any>(null)
  const [selectedVariant, setSelectedVariant] = useState<any>(null)
  const [loading, setLoading] = useState(true)

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

  if (loading) return <ProductLoading />
  if (!product) return <ProductNotFound />

  return (
    <div className="flex flex-col items-center bg-background min-h-screen">
      <div className="w-full max-w-[1200px] px-8 py-6">
        <ProductBreadcrumbs title={product.title} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 py-6">
          <ProductGallery product={product} />

          <ProductInfo
            product={product}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
            items={items}
            addItem={addItem}
          />
        </div>
      </div>
    </div>
  )
}