'use client'

import { User, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export function UserMenu({ email }: { email?: string }) {
  const supabase = createClient()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
          <User className="h-[1.1rem] w-[1.1rem] stroke-[1.5]" />
        </Button>
      </DropdownMenuTrigger>
      {/* Fixed: Added bg-background and solid border classes */}
      <DropdownMenuContent 
        align="end" 
        className="w-56 rounded-xl border border-border bg-background p-2 shadow-xl"
      >
        <DropdownMenuLabel className="font-normal px-2 py-1.5">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Account</p>
          <p className="text-xs text-foreground truncate mt-0.5">{email || 'User'}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border/60" />
        
        <DropdownMenuItem asChild className="rounded-lg cursor-pointer h-9">
          <Link href="/profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="text-xs">My Profile</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={handleLogout} 
          className="rounded-lg cursor-pointer h-9 text-destructive focus:text-destructive focus:bg-destructive/10"
        >
          <div className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            <span className="text-xs">Logout</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}