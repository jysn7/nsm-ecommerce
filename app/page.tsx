'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Box, Loader2 } from "lucide-react"
import { ProductCard } from "@/features/products/ProductCard"
import { ProductCardSkeleton } from "@/features/products/ProductCardSkeleton"
import { HeroCarousel } from "@/features/products/HeroCarousel"
import { getBuyerProducts, getCategories } from "@/lib/supabase/products"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  
  const supabase = createClient()

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      
      const { data: { user: authUser } } = await supabase.auth.getUser()
      setUser(authUser)

      const [prodRes, catRes] = await Promise.all([
        getBuyerProducts(),
        getCategories()
      ])
      
      if (prodRes.success) {
        setProducts(prodRes.data.slice(0, 8))
      }
      
      if (catRes.success) {
        setCategories(catRes.data)
      }
      setLoading(false)
    }
    loadData()
  }, [])

  const sellerRoute = user ? "/profile" : "/login"

  return (
    <div className="flex flex-col items-center bg-background min-h-screen">
      
      <HeroCarousel />

      <div className="w-full max-w-[1400px] px-8 md:px-16 lg:px-24 py-12 space-y-24">
        
        {/* Categories Section */}
        <section className="space-y-10">
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Departments</p>
            <h3 className="text-3xl font-normal tracking-tight text-foreground uppercase">Shop by Category</h3>
            <Separator className="mt-6 opacity-40" />
          </div>
          
          <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex justify-start items-center min-w-max gap-8 md:gap-14 px-2">
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center space-y-3">
                    <div className="h-20 w-20 rounded-full bg-muted animate-pulse" />
                    <div className="h-2 w-12 bg-muted rounded animate-pulse" />
                  </div>
                ))
              ) : (
                categories.map((cat) => (
                  <Link 
                    key={cat.id}
                    href={`/products?category=${cat.name.toLowerCase()}`}
                    className="flex flex-col items-center group space-y-4 min-w-[90px]"
                  >
                    <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center border border-border/50 transition-all group-hover:bg-muted/80 group-hover:scale-105">
                      <Box className="h-7 w-7 text-muted-foreground" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground group-hover:text-foreground text-center">
                      {cat.name}
                    </span>
                  </Link>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="space-y-10">
          <div className="flex items-center justify-between">
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Marketplace</p>
              <h3 className="text-3xl font-normal tracking-tight text-foreground uppercase">Recently Listed</h3>
            </div>
            <Button variant="ghost" asChild className="text-[10px] uppercase tracking-widest gap-2">
              <Link href="/products">
                See all <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          </div>
          <Separator className="opacity-40" />

          <div className="relative">
            <div className="flex overflow-x-auto pb-8 gap-6 scrollbar-hide snap-x snap-mandatory">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="min-w-[300px] snap-start">
                    <ProductCardSkeleton />
                  </div>
                ))
              ) : (
                products.map((item) => (
                  <div key={item.id} className="min-w-[300px] snap-start">
                    <ProductCard {...item} />
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

      {/* Become a Seller Promo */}
      <section className="relative w-full py-22 rounded-[2rem] overflow-hidden flex items-center justify-center text-center px-6">
        <Image
          src="/static/BecomeSeller.jpg"
          alt="Start selling"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 max-w-xl space-y-8">
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white opacity-90">Marketplace</p>
            <h2 className="text-4xl md:text-4xl font-normal tracking-tight text-white uppercase">
              Turn your goods into cash
            </h2>
            <p className="text-sm text-white/80 max-w-sm mx-auto leading-relaxed">
              Join our community. List your items in seconds and reach buyers across the country.
            </p>
          </div>

          <Button 
            size="lg" 
            asChild 
            className="h-14 rounded-xl bg-white text-black hover:bg-neutral-100 px-10 text-[10px] uppercase tracking-widest font-bold"
          >
            <Link href={sellerRoute}>
              Become a seller
            </Link>
          </Button>
        </div>
      </section>

        {/* Final CTA Centered */}
        <section className="py-24 text-center space-y-10 max-w-2xl mx-auto border-t border-border/40">
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Community Shop</p>
            <h2 className="text-4xl font-normal tracking-tight text-foreground uppercase">Find what you need</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Explore a wide range of products from independent sellers in your community.
            </p>
          </div>
          <Button size="lg" asChild className="rounded-xl px-14 py-7 text-[10px] uppercase tracking-widest font-bold">
            <Link href="/products">
              Shop the full catalog
            </Link>
          </Button>
        </section>

      </div>
    </div>
  )
}