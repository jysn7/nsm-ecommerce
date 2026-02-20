import Link from "next/link"
import { Box } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function CategoriesSection({ categories, loading }: any) {
  return (
    <section className="space-y-10">
      <div className="text-left">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
          Departments
        </p>
        <h3 className="text-3xl font-normal tracking-tight text-foreground uppercase">
          Shop by Category
        </h3>
        <Separator className="mt-6 opacity-40" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded-2xl animate-pulse" />
            ))
          : categories.map((cat: any) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className="relative group h-32 overflow-hidden rounded-2xl bg-muted/30 border border-border/50 flex items-center justify-center transition-all hover:bg-muted/50"
              >
                <div className="flex flex-col items-center space-y-2">
                  <Box className="h-5 w-5 text-muted-foreground stroke-[1.5]" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-foreground">
                    {cat.name}
                  </span>
                </div>
              </Link>
            ))}
      </div>
    </section>
  )
}