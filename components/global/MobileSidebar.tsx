'use client'

import Link from 'next/link'
import { 
  Menu, 
  House, 
  ShoppingBag, 
  Store, 
  Heart, 
  User, 
  Settings, 
  LogOut 
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

const navItems = [
  { name: 'Home', icon: House, href: '/' },
  { name: 'Browse Products', icon: ShoppingBag, href: '/products' },
  { name: 'Top Stores', icon: Store, href: '/stores' },
  { name: 'My Wishlist', icon: Heart, href: '/wishlist' },
]

export function MobileSidebar({ email }: { email?: string }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl">
          <Menu className="h-6 w-6 stroke-[1.2]" />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="right" className="flex flex-col w-[300px] bg-background p-0 border-l border-border">
        
        {/* Header with Padding */}
        <SheetHeader className="p-6 text-left border-b border-border/50">
          <SheetTitle className="text-[10px] uppercase tracking-widest font-normal text-muted-foreground">
            Navigation
          </SheetTitle>
        </SheetHeader>

        {/* Main Nav with internal spacing */}
        <div className="flex-1 px-6 py-8 space-y-1">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className="flex items-center gap-4 py-3.5 text-xs font-normal text-foreground hover:text-primary transition-colors border-b border-border/10 last:border-none"
            >
              <item.icon className="h-4 w-4 stroke-[1.5] text-muted-foreground" />
              {item.name}
            </Link>
          ))}
        </div>

        {/* Profile Footer - Stick to bottom */}
        <div className="mt-auto border-t border-border bg-muted/20 p-6">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-background border border-border flex items-center justify-center">
                <User className="h-5 w-5 text-muted-foreground stroke-[1.2]" />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-normal truncate">{email || 'Guest User'}</span>
                <Link href="/profile" className="text-[9px] uppercase tracking-tighter text-muted-foreground hover:text-primary">
                  Manage Account
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <Button variant="outline" className="w-full rounded-xl h-9 text-[11px] font-normal border-border bg-background gap-2">
                <Settings className="h-3.5 w-3.5 text-muted-foreground" />
                Settings
              </Button>
              <Button variant="ghost" className="w-full rounded-xl h-9 text-[11px] font-normal text-destructive hover:bg-destructive/5 gap-2">
                <LogOut className="h-3.5 w-3.5" />
                Logout
              </Button>
            </div>
          </div>
        </div>

      </SheetContent>
    </Sheet>
  )
}