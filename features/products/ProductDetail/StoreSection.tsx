'use client'

import { useRouter } from 'next/navigation'
import { Store, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function StoreSection({ store }: any) {
  const router = useRouter()

  return (
    <div className="pt-8 mt-8 border-t border-border/40">
      <div className="flex items-center gap-4">
        <div className="relative h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden border border-border/10">
          <Store className="h-5 w-5 text-muted-foreground" />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-1">
            <p className="text-sm font-normal text-foreground">
              {store?.name || 'Retailer'}
            </p>
            {store?.verified && (
              <ShieldCheck className="h-3 w-3 text-primary" />
            )}
          </div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
            Partnered Store
          </p>
        </div>

        <Button
          variant="outline"
          className="h-8 rounded-lg text-[10px] uppercase tracking-widest px-4"
          onClick={() => router.push(`/stores/${store?.id}`)}
        >
          Visit Store
        </Button>
      </div>
    </div>
  )
}