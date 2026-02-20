'use client'

import Link from 'next/link'
import { Store, Package } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { UserMenu } from "./UserMenu"
import { MobileSidebar } from "./MobileSidebar"
import { CartMenu } from "./CartMenu"

export function Navbar({ email }: { email?: string }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="flex h-16 items-center justify-between px-6 md:px-12 lg:px-20">
        
        {/* Brand Logo */}
        <div className="flex items-center">
          <Link href="/" className="text-lg font-normal tracking-tighter">
            MARKETPLACE
          </Link>
        </div>

        {/* Action Group */}
        <div className="flex items-center gap-1 sm:gap-2">
          
          {/* Authenticated Links: Only show if email exists */}
          {email && (
            <div className="hidden md:flex items-center gap-1">
              <Button variant="ghost" size="icon" asChild className="h-10 w-10 rounded-xl text-muted-foreground hover:text-foreground">
                <Link href="/inventory" title="Seller Dashboard">
                  <Store className="h-[1.1rem] w-[1.1rem] stroke-[1.5]" />
                </Link>
              </Button>
              
              <Button variant="ghost" size="icon" asChild className="h-10 w-10 rounded-xl text-muted-foreground hover:text-foreground">
                <Link href="/orders" title="Order History">
                  <Package className="h-[1.1rem] w-[1.1rem] stroke-[1.5]" />
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
                className="h-10 rounded-xl border-border px-6 text-sm font-normal transition-all hover:!bg-foreground hover:!text-background"
              >
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <MobileSidebar email={email} />
          </div>
        </div>

      </div>
    </header>
  )
}