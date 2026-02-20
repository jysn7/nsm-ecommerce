export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-background flex justify-center items-start">
      <div className="w-full max-w-300 px-8 py-6">
        
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center space-x-2 mb-6">
          <div className="h-3 w-12 bg-muted rounded animate-pulse" />
          <div className="h-3 w-3 bg-muted rounded animate-pulse" />
          <div className="h-3 w-16 bg-muted rounded animate-pulse" />
          <div className="h-3 w-3 bg-muted rounded animate-pulse" />
          <div className="h-3 w-24 bg-muted rounded animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 py-6">
          
          {/* Main Image Skeleton */}
          <div className="space-y-4">
            <div className="aspect-square w-full rounded-2xl bg-muted animate-pulse" />
          </div>

          {/* Details Skeleton */}
          <div className="flex flex-col space-y-8">
            
            {/* Header Area */}
            <div className="space-y-4">
              <div className="h-3 w-24 bg-muted rounded animate-pulse" />
              <div className="h-10 w-3/4 bg-muted rounded-lg animate-pulse" />
              <div className="h-8 w-32 bg-muted rounded-md animate-pulse" />
            </div>

            {/* Description Area */}
            <div className="space-y-4">
              <div className="h-px w-full bg-border/40" />
              <div className="h-3 w-20 bg-muted rounded animate-pulse" />
              <div className="space-y-2">
                <div className="h-3 w-full bg-muted rounded animate-pulse" />
                <div className="h-3 w-full bg-muted rounded animate-pulse" />
                <div className="h-3 w-2/3 bg-muted rounded animate-pulse" />
              </div>
            </div>

            {/* Variants Area */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <div className="h-3 w-24 bg-muted rounded animate-pulse" />
                <div className="h-3 w-16 bg-muted rounded animate-pulse" />
              </div>
              <div className="flex gap-2">
                <div className="h-10 w-20 bg-muted rounded-xl animate-pulse" />
                <div className="h-10 w-20 bg-muted rounded-xl animate-pulse" />
                <div className="h-10 w-20 bg-muted rounded-xl animate-pulse" />
              </div>
            </div>

            {/* Action Area */}
            <div className="pt-4 space-y-3">
              <div className="h-12 w-full bg-muted rounded-xl animate-pulse" />
            </div>

            {/* Store Footer Area */}
            <div className="pt-8 mt-8 border-t border-border/40 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                <div className="h-3 w-20 bg-muted rounded animate-pulse" />
              </div>
              <div className="h-8 w-24 bg-muted rounded-lg animate-pulse" />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}