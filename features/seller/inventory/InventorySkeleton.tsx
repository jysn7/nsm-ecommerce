export default function InventorySkeleton() {
  return (
    <div className="space-y-12 w-full animate-pulse">
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <div className="h-4 w-32 bg-muted rounded" />
          <div className="h-10 w-64 bg-muted rounded" />
          <div className="h-3 w-80 bg-muted rounded" />
        </div>
        <div className="h-14 w-40 bg-muted rounded-xl" />
      </div>

      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border border-border/40 rounded-2xl overflow-hidden">
            <div className="px-8 py-6 flex items-center justify-between border-b border-border/20">
              <div className="space-y-2">
                <div className="h-4 w-24 bg-muted rounded" />
                <div className="h-2 w-16 bg-muted rounded" />
              </div>
              <div className="h-4 w-4 bg-muted rounded" />
            </div>
            
            <div className="p-8 space-y-4">
              {[1, 2].map((j) => (
                <div key={j} className="flex items-center justify-between p-4 bg-muted/5 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-muted rounded-xl" />
                    <div className="space-y-2">
                      <div className="h-3 w-32 bg-muted rounded" />
                      <div className="h-2 w-20 bg-muted rounded" />
                    </div>
                  </div>
                  <div className="flex gap-8">
                    <div className="h-8 w-16 bg-muted rounded-lg" />
                    <div className="h-8 w-16 bg-muted rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}