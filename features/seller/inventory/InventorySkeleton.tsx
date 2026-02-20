export default function InventorySkeleton() {
  return (
    <div className="space-y-6 md:space-y-10 w-full max-w-5xl mx-auto px-4 md:px-0 animate-pulse">
      
      {/* Header Skeleton */}
      <div className="flex items-center justify-between pb-4">
        <div className="space-y-2">
          <div className="h-6 w-32 bg-muted rounded" />
          <div className="h-3 w-48 bg-muted rounded" />
        </div>
        <div className="h-12 w-32 bg-muted rounded-xl" />
      </div>

      {/* Product List Skeleton */}
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div 
            key={i} 
            className="flex items-center justify-between p-6 bg-muted/10 border border-border/40 rounded-2xl"
          >
            <div className="flex items-center gap-4">
              {/* Image placeholder */}
              <div className="h-16 w-16 bg-muted rounded-xl" />
              
              <div className="space-y-2">
                {/* Title and Category placeholders */}
                <div className="h-4 w-40 bg-muted rounded" />
                <div className="h-2 w-20 bg-muted rounded" />
              </div>
            </div>

            <div className="flex items-center gap-8">
              {/* Stock and Price placeholders */}
              <div className="hidden md:block space-y-2">
                <div className="h-2 w-12 bg-muted rounded" />
                <div className="h-4 w-16 bg-muted rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-2 w-12 bg-muted rounded" />
                <div className="h-4 w-16 bg-muted rounded" />
              </div>
              {/* Actions placeholder */}
              <div className="h-8 w-8 bg-muted rounded-lg" />
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}