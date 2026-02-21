'use client';

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { ShoppingBag, ArrowRight } from "lucide-react"
import HeroSkeleton from "./HeroSkeleton"

const slides = [
  { 
    id: 1, 
    title: "Curated Collection",
    subtitle: "discover handpicked quality from verified local sellers",
    image: "/static/hero-1.jpg",
    cta: "Shop the drop",
    link: "/products"
  },
  { 
    id: 2, 
    title: "Elevated Essentials",
    subtitle: "minimalist design meets functional daily hardware",
    image: "/static/hero-beauty.jpg",
    cta: "View technical goods",
    link: "/products?category=technology"
  }
];

export function HeroCarousel() {
  const [isMounted, setIsMounted] = React.useState(false)
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  React.useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])

  if (!isMounted) return <HeroSkeleton />

  return (
    <div className="w-full animate-in fade-in duration-700">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="ml-0">
          {slides.map((s, index) => (
            <CarouselItem key={s.id} className="pl-0">
              <div className="relative h-[60vh] w-full overflow-hidden bg-background">
                
                <Image 
                  src={s.image} 
                  alt={s.title}
                  fill
                  priority={index === 0}
                  className="object-cover transition-transform duration-3000 ease-out hover:scale-105" 
                  sizes="100vw"
                />

                <div className="absolute inset-0 bg-foreground/50 z-10" />

                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
                  <div className="flex flex-col items-center justify-center space-y-8 max-w-3xl">
                    <div className="space-y-3">
                      <p className="text-[10px] uppercase tracking-[0.5em] text-background/90 font-normal">
                        New arrivals
                      </p>
                      <h1 className="text-4xl md:text-7xl text-background font-bold tracking-tight uppercase leading-[0.9]">
                        {s.title}
                      </h1>
                    </div>
                    
                    <p className="text-sm md:text-base text-background/80 font-normal lowercase tracking-wide max-w-lg mx-auto leading-relaxed">
                      {s.subtitle}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                      <Button asChild className="h-14 px-10 rounded-xl bg-background text-foreground hover:bg-background/90 text-[10px] uppercase tracking-widest font-bold border-none transition-all hover:-translate-y-0.5">
                        <Link href={s.link} className="flex items-center gap-2">
                          <ShoppingBag className="h-4 w-4" />
                          {s.cta}
                        </Link>
                      </Button>
                      
                      <Button asChild className="h-14 px-10 rounded-xl bg-transparent border border-background/30 text-background hover:bg-background/10 text-[10px] uppercase tracking-widest font-bold transition-all hover:-translate-y-0.5">
                        <Link href="/products" className="flex items-center gap-2">
                          Explore all <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}