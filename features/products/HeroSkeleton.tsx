export default function HeroSkeleton() {
  return (
    <div className="relative w-full h-[60vh] bg-muted overflow-hidden">
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/10 to-transparent" />
      
      {/* Content Mockup */}
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center px-6 text-center">
        <div className="flex flex-col items-center justify-center space-y-8 max-w-3xl w-full">
          
          <div className="space-y-4 w-full flex flex-col items-center">
            {/* Small label */}
            <div className="h-3 w-24 bg-foreground/10 rounded-full" />
            {/* Big Title */}
            <div className="h-12 md:h-20 w-3/4 bg-foreground/10 rounded-2xl" />
          </div>
          
          {/* Subtitle */}
          <div className="space-y-2 w-full flex flex-col items-center">
            <div className="h-4 w-1/2 max-w-sm bg-foreground/10 rounded-lg" />
            <div className="h-4 w-1/3 max-w-xs bg-foreground/10 rounded-lg" />
          </div>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="h-14 w-full sm:w-44 bg-foreground/10 rounded-xl" />
            <div className="h-14 w-full sm:w-44 bg-foreground/10 rounded-xl border border-foreground/5" />
          </div>

        </div>
      </div>
      
      {/* Bottom indicator dots */}
      <div className="absolute bottom-8 left-0 w-full flex justify-center gap-2">
        <div className="h-1 w-8 bg-foreground/20 rounded-full" />
        <div className="h-1 w-8 bg-foreground/10 rounded-full" />
      </div>
    </div>
  )
}