'use client'

import { HeroSection } from "@/features/homepage/HeroSection"
import { CategoriesSection } from "@/features/homepage/CategoriesSection"
import { BecomeSellerSection } from "@/features/homepage/BecomeSellerSection"
import { StoresSection } from "@/features/homepage/StoresSection"
import { CTASection } from "@/features/homepage/CTASection"
import { useHomeData } from "@/features/homepage/useHomeData"
import { RecentlyListedSection } from "@/features/homepage/RecentlyListedSection"

export default function HomePage() {
  const { products, categories, stores, loading, sellerRoute } = useHomeData()

  return (
    <div className="flex flex-col items-center bg-background min-h-screen">
      <HeroSection />

      <div className="w-full max-w-350 px-8 md:px-16 lg:px-24 py-12 space-y-24">
        <CategoriesSection categories={categories} loading={loading} />
        <RecentlyListedSection products={products} loading={loading} />
        <BecomeSellerSection sellerRoute={sellerRoute} />
        <StoresSection stores={stores} loading={loading} />
        <CTASection />
      </div>
    </div>
  )
}