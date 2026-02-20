'use client'

import Link from 'next/link'
import { LayoutDashboard, Package, Store } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { UserMenu } from "./UserMenu"
import { MobileSidebar } from "./MobileSidebar"
import { CartMenu } from "./CartMenu"

export function Navbar({ email, role }: { email?: string; role?: string }) {
  const isSeller = role === 'seller'

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="flex h-16 items-center justify-between px-6 md:px-12 lg:px-20">
        
        {/* Brand Logo */}
        <div className="flex items-center">
          <Link href="/" className="text-lg font-normal tracking-tighter uppercase">
            Marketplace
          </Link>
        </div>

        {/* Action Group */}
        <div className="flex items-center gap-1 sm:gap-2">
          
          <Button variant="ghost" asChild className="h-10 rounded-xl text-muted-foreground hover:text-foreground px-3">
            <Link href="/products" className="flex items-center gap-2">
              <Store className="h-[1.1rem] w-[1.1rem] stroke-[1.5]" />
              <span className="text-xs tracking-widest hidden sm:inline">Shop All</span>
            </Link>
          </Button>

          {email && (
            <div className="hidden md:flex items-center gap-1">
              {isSeller && (
                <Button variant="ghost" asChild className="h-10 rounded-xl text-muted-foreground hover:text-foreground px-3">
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <LayoutDashboard className="h-[1.1rem] w-[1.1rem] stroke-[1.5]" />
                    <span className="text-xs tracking-widest">Dashboard</span>
                  </Link>
                </Button>
              )}
              
              <Button variant="ghost" asChild className="h-10 rounded-xl text-muted-foreground hover:text-foreground px-3">
                <Link href="/orders" className="flex items-center gap-2">
                  <Package className="h-[1.1rem] w-[1.1rem] stroke-[1.5]" />
                  <span className="text-xs tracking-widest">Orders</span>
                </Link>
              </Button>
            </div>
          )}

          {/* Sidebar Cart Component */}
          <CartMenu />

          <div className="hidden md:block mx-2 h-4 w-px bg-border" />

          {/* Desktop Auth State */}
          <div className="hidden md:block">
            {email ? (
              <UserMenu email={email} />
            ) : (
              <Button 
                variant="outline" 
                asChild 
                className="h-10 rounded-xl border-border px-6 text-xs uppercase tracking-widest font-normal transition-all hover:bg-foreground hover:text-background"
              >
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <MobileSidebar email={email} role={role} />
          </div>
        </div>

      </div>
    </header>
  )
}