'use client'

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { ProductCard } from "@/features/products/ProductCard"
import { ProductCardSkeleton } from "@/features/products/ProductCardSkeleton"
import { FilterSidebar } from "@/features/products/FilterSidebar"
import { useStore } from "@/hooks/use-cart"
import { getBuyerProducts } from "@/lib/supabase/products"

export default function BuyerPage() {
  const { searchQuery, setSearchQuery, priceRange, category } = useStore()
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      const result = await getBuyerProducts()
      if (result.success) {
        setProducts(result.data)
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
    <div className="flex flex-col items-center bg-background min-h-screen">
      
      {/* Page Header */}
      <header className="w-full py-12 border-b border-border/40 text-center space-y-3">
        <h1 className="text-3xl font-normal tracking-tight text-foreground">Products</h1>
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Browse our curated inventory</p>
      </header>

      <div className="w-full max-w-350 px-8 md:px-16 lg:px-24 py-10">
        
        {/* Search and Results Info */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="relative w-full max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 rounded-xl border-none bg-muted/50 pl-10 pr-4 focus-visible:ring-1"
            />
          </div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
            {loading ? "Syncing inventory..." : `Showing ${filteredProducts.length} results`}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Filter */}
          <div className="w-full lg:w-64 shrink-0 text-center">
            <FilterSidebar />
          </div>

          {/* Product Grid Container */}
          <main className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                  <ProductCard key={item.id} {...item} />
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-20 space-y-2">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">No products found</p>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-[10px] underline uppercase tracking-widest"
                  >
                    Clear all filters
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