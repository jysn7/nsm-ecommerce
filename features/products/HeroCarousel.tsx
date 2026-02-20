'use client';

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

const slides = [
  { id: 1, image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80" },
  { id: 2, image: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=1200&q=80" }
];

export function HeroCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  return (
    <div className="w-full">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="ml-0">
          {slides.map((s) => (
            <CarouselItem key={s.id} className="pl-0">
              <div className="relative h-[40vh] w-full overflow-hidden bg-muted">
                <img 
                  src={s.image} 
                  className="h-full w-full object-cover" 
                  alt="Marketplace Banner" 
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}