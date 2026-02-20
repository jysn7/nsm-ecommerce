import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-24 text-center space-y-10 max-w-2xl mx-auto border-t border-border/40">
      <div className="space-y-4">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Community Shop
        </p>
        <h2 className="text-4xl font-normal tracking-tight text-foreground uppercase">
          Find what you need
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Explore a wide range of products from independent sellers in your community.
        </p>
      </div>

      <Button
        size="lg"
        asChild
        className="rounded-xl px-14 py-7 text-[10px] uppercase tracking-widest font-bold"
      >
        <Link href="/products">
          Shop the full catalog
        </Link>
      </Button>
    </section>
  )
}