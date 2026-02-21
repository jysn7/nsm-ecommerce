'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Store as StoreIcon, Search, ShoppingBag } from "lucide-react"
import { getStores } from "@/lib/supabase/products"
import { Separator } from "@/components/ui/separator"

export default function StoresPage() {
  const [stores, setStores] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    async function loadStores() {
      setLoading(true)
      const { success, data } = await getStores()
      if (success) setStores(data ?? [])
      setLoading(false)
    }
    loadStores()
  }, [])

  const filteredStores = stores.filter(store => 
    store.store_name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background pb-24">
      <section className="pt-32 pb-16 px-8 md:px-16 lg:px-24">
        <div className="max-w-350 mx-auto space-y-12">
          <div className="text-left max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
              Shop by Seller
            </p>
            <h1 className="text-5xl font-normal tracking-tighter text-foreground uppercase mb-6">
              All Stores
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Find your favorite local sellers and browse their full inventory. Secure shopping directly from independent merchants.
            </p>
          </div>

          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text"
              placeholder="Search for a store..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-muted/20 border border-border rounded-xl py-4 pl-12 pr-4 text-[10px] uppercase tracking-widest outline-1 focus:bg-muted/40 transition-colors"
            />
          </div>
          
          <Separator className="opacity-40" />
        </div>
      </section>

      <section className="px-8 md:px-16 lg:px-24">
        <div className="max-w-350 mx-auto">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="aspect-3/4 bg-muted/40 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : filteredStores.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {filteredStores.map((store) => (
                <Link
                  key={store.id}
                  href={`/stores/${store.id}`}
                  className="group relative flex flex-col bg-foreground rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl border border-transparent"
                >
                  <div className="relative w-full aspect-video bg-neutral-900">
                    {store.banner_url ? (
                      <Image 
                        src={store.banner_url} 
                        alt="" 
                        fill 
                        className="object-cover opacity-70 transition-transform group-hover:scale-105" 
                        unoptimized 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center opacity-10">
                        <StoreIcon className="h-8 w-8 text-background" />
                      </div>
                    )}
                  </div>

                  <div className="relative flex flex-col p-4 pt-10 bg-foreground">
                    
                    <div className="absolute -top-6 left-4 h-12 w-12 rounded-lg bg-background p-0.5 shadow-lg">
                      <div className="relative w-full h-full rounded-md overflow-hidden bg-muted flex items-center justify-center">
                        {store.logo_url ? (
                          <Image
                            src={store.logo_url}
                            alt=""
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <StoreIcon className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="min-h-10">
                        <h4 className="text-xs font-bold tracking-tight text-background uppercase line-clamp-2">
                          {store.store_name}
                        </h4>
                        <p className="text-[9px] uppercase tracking-tighter text-background/50 mt-1">
                          Merchant Store
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-background/10">
                        <span className="text-[9px] font-bold text-background uppercase tracking-widest flex items-center gap-1">
                          <ShoppingBag className="h-3 w-3" /> View Shop
                        </span>
                        <ArrowRight className="h-3 w-3 text-background group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">No stores found.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}