export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-background border border-border/5 text-left animate-pulse">
      {/* Image Placeholder */}
      <div className="aspect-square bg-muted/40" />
      
      {/* Content Placeholder */}
      <div className="p-3 space-y-3">
        <div className="space-y-2">
          {/* Category */}
          <div className="h-2 w-12 bg-muted/60 rounded" />
          {/* Title */}
          <div className="space-y-1">
            <div className="h-3 w-full bg-muted/60 rounded" />
            <div className="h-3 w-2/3 bg-muted/60 rounded" />
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-1">
          {/* Price */}
          <div className="h-4 w-16 bg-muted/60 rounded" />
          {/* Button */}
          <div className="h-7 w-7 bg-muted/60 rounded-lg" />
        </div>
      </div>
    </div>
  )
}