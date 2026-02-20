import { Separator } from "@/components/ui/separator"

export default function PayoutsSkeleton() {
  return (
    <div className="space-y-12 animate-pulse">
      
      {/* Metrics Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-muted/20 border border-border/40 rounded-4xl p-8 space-y-4">
            <div className="h-5 w-5 bg-muted rounded-full" />
            <div className="space-y-2">
              <div className="h-3 w-20 bg-muted rounded" />
              <div className="h-8 w-32 bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Action Area Skeleton */}
      <div className="bg-muted/10 border border-border/40 rounded-4xl p-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 flex-1">
          <div className="h-6 w-48 bg-muted rounded mx-auto md:mx-0" />
          <div className="h-3 w-full max-w-sm bg-muted rounded mx-auto md:mx-0" />
        </div>
        <div className="h-14 w-full md:w-44 bg-muted rounded-xl" />
      </div>

      {/* List Items Skeleton */}
      <div className="space-y-6">
        <div className="h-3 w-32 bg-muted rounded mx-auto md:mx-0" />
        <Separator className="opacity-40" />
        
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-muted/5 border border-border/40 rounded-2xl w-full" />
          ))}
        </div>
      </div>

    </div>
  )
}