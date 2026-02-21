'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { 
  Menu, 
  House, 
  Store,
  LayoutDashboard, 
  Package, 
  User, 
  LogOut, 
  ShoppingBasket,
  Loader2
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function MobileSidebar({ email, role }: { email?: string; role?: string }) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()
  const isSeller = role === 'seller'

  const handleLogout = async () => {
    setIsLoading(true)
    await supabase.auth.signOut()
    setOpen(false)
    setIsLoading(false)
    router.refresh()
  }

  const publicItems = [
    { name: 'Home', icon: House, href: '/' },
    { name: 'Shop All', icon: ShoppingBasket, href: '/products' },
    { name: 'Stores', icon: Store, href: '/stores' },
  ]

  const authItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', private: true },
    { name: 'Orders', icon: Package, href: '/orders', private: false },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl">
          <Menu className="h-6 w-6 stroke-[1.2]" />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="right" className="flex flex-col w-75 bg-background p-0 border-l border-border">
        
        <SheetHeader className="p-6 text-left border-b border-border/50">
          <SheetTitle className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">
            Kith
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 px-6 py-8 space-y-1">
          {publicItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              onClick={() => setOpen(false)}
              className="flex items-center gap-4 py-4 text-[10px] uppercase tracking-[0.15em] font-normal text-foreground hover:text-primary transition-colors border-b border-border/10"
            >
              <item.icon className="h-4 w-4 stroke-[1.5] text-muted-foreground" />
              {item.name}
            </Link>
          ))}

          {email && authItems.map((item) => {
            if (item.private && !isSeller) return null

            return (
              <Link 
                key={item.name} 
                href={item.href} 
                onClick={() => setOpen(false)}
                className="flex items-center gap-4 py-4 text-[10px] uppercase tracking-[0.15em] font-normal text-foreground hover:text-primary transition-colors border-b border-border/10"
              >
                <item.icon className="h-4 w-4 stroke-[1.5] text-muted-foreground" />
                {item.name}
              </Link>
            )
          })}
        </div>

        <div className="mt-auto border-t border-border bg-muted/20 p-6">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-background border border-border flex items-center justify-center">
                <User className="h-5 w-5 text-muted-foreground stroke-[1.2]" />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-normal truncate">{email || 'Guest User'}</span>
                {email && (
                  <Link 
                    href="/profile" 
                    onClick={() => setOpen(false)}
                    className="text-[9px] uppercase tracking-widest text-muted-foreground hover:text-primary"
                  >
                    View Profile
                  </Link>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {email ? (
                <Button 
                  disabled={isLoading}
                  onClick={handleLogout}
                  className="w-full rounded-xl h-10 text-[10px] uppercase tracking-widest font-semibold text-background hover:bg-primary/5 gap-2"
                >
                  {isLoading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <LogOut className="h-3.5 w-3.5" />
                  )}
                  {isLoading ? 'Processing' : 'Logout'}
                </Button>
              ) : (
                <Button asChild className="w-full rounded-xl h-10 text-[10px] uppercase tracking-widest font-normal">
                  <Link href="/login" onClick={() => setOpen(false)}>Login to Account</Link>
                </Button>
              )}
            </div>
          </div>
        </div>

      </SheetContent>
    </Sheet>
  )
}