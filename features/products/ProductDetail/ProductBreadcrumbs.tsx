'use client'

import { useRouter } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

export default function ProductBreadcrumbs({ title }: { title: string }) {
  const router = useRouter()

  return (
    <nav className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-muted-foreground mb-6">
      <span onClick={() => router.push('/')} className="cursor-pointer hover:text-foreground transition-colors">
        Home
      </span>
      <ChevronRight className="h-3 w-3" />
      <span onClick={() => router.push('/products')} className="cursor-pointer hover:text-foreground transition-colors">
        Products
      </span>
      <ChevronRight className="h-3 w-3" />
      <span className="text-foreground truncate max-w-50">
        {title}
      </span>
    </nav>
  )
}