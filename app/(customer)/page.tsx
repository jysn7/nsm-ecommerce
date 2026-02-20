'use client'

import { useState, useEffect } from "react"
import { ProductCard } from "@/features/products/ProductCard"
import { ProductCardSkeleton } from "@/features/products/ProductCardSkeleton"
import { HeroCarousel } from "@/features/products/HeroCarousel"
import { getBuyerProducts } from "@/lib/supabase/products"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      const result = await getBuyerProducts()
      if (result.success) {
        // Show only 8 
        setProducts(result.data.slice(0, 8))
      }
      setLoading(false)
    }
    loadData()
  }, [])

  return (
    <div className="flex flex-col items-center bg-background min-h-screen">
      
      {/* Hero Section */}
      <HeroCarousel />

      <div className="w-full max-w-350 px-8 md:px-16 lg:px-24 py-20 space-y-16">
        
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-border/40 pb-6">
          <div className="space-y-1">
            <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">Featured Collection</h2>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Handpicked items for you</p>
          </div>
          <Link 
            href="/products" 
            className="group flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            View all products
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Grid */}
        <main className="w-full">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            ) : products.length > 0 ? (
              products.map((item) => (
                <ProductCard key={item.id} {...item} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">No featured items at the moment</p>
              </div>
            )}
          </div>
        </main>

        {/* Bottom Call to Action */}
        {!loading && products.length > 0 && (
          <div className="flex justify-center pt-10">
            <Link 
              href="/products"
              className="rounded-xl border border-border px-10 py-4 text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-muted transition-colors"
            >
              Explore Full Catalog
            </Link>
          </div>
        )}

      </div>
    </div>
  )
}