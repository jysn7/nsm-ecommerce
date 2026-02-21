import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Store as StoreIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function StoresSection({ stores, loading }: any) {
  return (
    <section className="space-y-10">
      <div className="text-left">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
          Community
        </p>
        <h3 className="text-3xl font-normal tracking-tight text-foreground uppercase">
          Shop by Store
        </h3>
        <Separator className="mt-6 opacity-40" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="aspect-4/5 bg-muted rounded-2xl animate-pulse" />
            ))
          : stores.map((store: any) => (
              <Link
                key={store.id}
                href={`/stores/${store.id}`}
                className="group relative flex flex-col items-center bg-foreground rounded-2xl transition-all duration-500 hover:scale-[1.01] border border-transparent shadow-2xl"
              >
                {/* Banner Area - Top Half */}
                <div className="relative w-full aspect-square rounded-t-2xl overflow-hidden bg-neutral-900">
                  {store.banner_url ? (
                    <Image 
                      src={store.banner_url} 
                      alt="" 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80" 
                      unoptimized 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center opacity-20">
                      <StoreIcon className="h-12 w-12 text-background" />
                    </div>
                  )}
                </div>

                {/* Floating Logo Overlay */}
                <div className="absolute top-5/7 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full bg-foreground p-1 shadow-xl z-30">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-muted flex items-center justify-center">
                    {store.logo_url ? (
                      <Image
                        src={store.logo_url}
                        alt={store.store_name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <StoreIcon className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                </div>

                <div className="w-full pt-12 pb-8 px-6 flex flex-col items-center text-center space-y-4 bg-foreground rounded-b-2xl">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-background/60">
                      Verified Merchant
                    </span>
                    <h4 className="text-lg font-normal tracking-tight text-background uppercase">
                      {store.store_name}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-background font-semibold group-hover:gap-4 transition-all">
                    Visit Store <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
                <div className="absolute inset-0 pointer-events-none rounded-2xl bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.05)_0%,transparent_80%)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
      </div>
    </section>
  )
}