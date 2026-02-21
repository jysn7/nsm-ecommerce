'use client'

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { ProductCard } from "@/features/products/ProductCard"
import { ProductCardSkeleton } from "@/features/products/ProductCardSkeleton"
import { FilterSidebar } from "@/features/products/FilterSidebar"
import { useStore } from "@/hooks/use-cart"
import { getBuyerProducts } from "@/lib/supabase/products"
import { Separator } from "@/components/ui/separator"

export default function BuyerPage() {
  const { searchQuery, setSearchQuery, priceRange, category } = useStore()
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      const result = await getBuyerProducts()
      if (result.success) {
        setProducts(result.data ?? [])
      }
      setLoading(false)
    }
    loadData()
  }, [])

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = category === 'all' || product.category === category
    const matchesPrice = product.price <= priceRange[0]
    
    return matchesSearch && matchesCategory && matchesPrice
  })

  return (
    <div className="bg-background min-h-screen pb-24">
      
      {/* Page Header - Matches Stores Page Alignment */}
      <section className="pt-32 pb-16 px-8 md:px-16 lg:px-24">
        <div className="max-w-[1400px] mx-auto space-y-12">
          <div className="text-left max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
              Marketplace
            </p>
            <h1 className="text-5xl font-normal tracking-tighter text-foreground uppercase mb-6">
              Shop All Products
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Browse our full catalog of items from local sellers. Secure checkout and direct delivery available on all orders.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text"
                placeholder="Search for items or brands..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-muted/20 border border-border/40 rounded-xl py-4 pl-12 pr-4 text-[10px] uppercase tracking-widest outline-1 focus:bg-muted/40 transition-colors"
              />
            </div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
              {loading ? "Updating list..." : `${filteredProducts.length} items found`}
            </div>
          </div>
          
          <Separator className="opacity-40" />
        </div>
      </section>

      <div className="max-w-350 mx-auto px-8 md:px-16 lg:px-24">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Filter */}
          <aside className="w-full lg:w-64 shrink-0">
            <FilterSidebar />
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                  <ProductCard key={item.id} {...item} />
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-20 space-y-4">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">No matches found for your search.</p>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-[10px] px-6 py-3 bg-muted rounded-full uppercase tracking-widest font-bold hover:bg-muted/80 transition-colors"
                  >
                    Reset Search
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}