import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ProductCard } from "@/features/products/ProductCard"
import { ProductCardSkeleton } from "@/features/products/ProductCardSkeleton"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function RecentlyListedSection({ products, loading }: any) {
  return (
    <section className="space-y-10">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
            Marketplace
          </p>
          <h3 className="text-3xl text-left font-normal tracking-tight text-foreground uppercase">
            Recently Listed
          </h3>
        </div>

        <Button variant="ghost" asChild className="text-[10px] uppercase tracking-widest gap-2">
          <Link href="/products">
            See all <ArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      </div>

      <Separator className="opacity-40" />

      <div className="flex overflow-x-auto pb-8 gap-6 scrollbar-hide snap-x snap-mandatory">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="min-w-75 snap-start">
                <ProductCardSkeleton />
              </div>
            ))
          : products.map((item: any) => (
              <div key={item.id} className="min-w-75 snap-start">
                <ProductCard {...item} />
              </div>
            ))}
      </div>
    </section>
  )
}