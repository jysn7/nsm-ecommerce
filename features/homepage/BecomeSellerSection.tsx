import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function BecomeSellerSection({ sellerRoute }: any) {
  return (
    <section className="relative w-full py-22 rounded-2xl overflow-hidden flex items-center justify-center text-center px-6">
      <Image
        src="/static/BecomeSeller.jpg"
        alt="Start selling"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-foreground/60" />

      <div className="relative z-10 max-w-xl space-y-8">
        <div className="space-y-4">
          <p className="text-[10px] uppercase tracking-[0.3em] text-background opacity-90">
            Marketplace
          </p>
          <h2 className="text-4xl font-normal tracking-tight text-background uppercase">
            Turn your goods into cash
          </h2>
          <p className="text-sm text-background/80 max-w-sm mx-auto leading-relaxed">
            Join our community. List your items in seconds and reach buyers across the country.
          </p>
        </div>

        <Button
          size="lg"
          asChild
          className="h-14 rounded-xl bg-background text-foreground hover:bg-background/90 px-10 text-[10px] uppercase tracking-widest font-semibold"
        >
          <Link href={sellerRoute}>
            Become a seller
          </Link>
        </Button>
      </div>
    </section>
  )
}