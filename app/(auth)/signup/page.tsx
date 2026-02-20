'use client';

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useAuthStore } from "@/hooks/use-auth-store"

export default function SignupPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)

  const { 
    name, setName, 
    email, setEmail, 
    password, setPassword, 
    errors, validate 
  } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (validate()) {
      setLoading(true)
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      })

      if (error) {
        toast.error(error.message)
        setLoading(false)
      } else {
        toast.success("Account created. Please check your email.")
        router.push('/login')
      }
    } else {
      toast.error("Please fix the errors in the form")
    }
  }

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    
    if (error) toast.error(error.message)
  }

  return (
    <div className="flex flex-col items-center">
      <Card className="w-full rounded-xl border-border bg-background shadow-lg shadow-zinc-200/10 overflow-hidden">
        <CardHeader className="px-6 pt-6 pb-2 text-center">
          <CardTitle className="text-xl font-normal tracking-tight text-foreground">Create Account</CardTitle>
        </CardHeader>
        
        <CardContent className="grid gap-4 px-6 pb-4">
          <Button 
            variant="outline" 
            onClick={handleGoogleLogin}
            className="h-10 w-full rounded-xl cursor-pointer border-border font-normal hover:bg-secondary transition-colors"
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </Button>

          <div className="relative flex items-center justify-center">
            <Separator className="bg-border" />
            <span className="absolute bg-background px-2 text-[9px] uppercase tracking-widest text-muted-foreground">or</span>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-3">
            <div className="grid gap-1">
              <div className="flex justify-between items-center">
                <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Name</Label>
                {errors.name && <span className="text-[9px] text-destructive tracking-wide uppercase">{errors.name}</span>}
              </div>
              <Input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name" 
                disabled={loading}
                className="h-10 rounded-xl border-none bg-muted/50 px-4 focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>

            <div className="grid gap-1">
              <div className="flex justify-between items-center">
                <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Email</Label>
                {errors.email && <span className="text-[9px] text-destructive tracking-wide uppercase">{errors.email}</span>}
              </div>
              <Input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address" 
                disabled={loading}
                className="h-10 rounded-xl border-none bg-muted/50 px-4 focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
            
            <div className="grid gap-1">
              <div className="flex justify-between items-center">
                <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Password</Label>
                {errors.password && <span className="text-[9px] text-destructive tracking-wide uppercase">{errors.password}</span>}
              </div>
              <Input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" 
                disabled={loading}
                className="h-10 rounded-xl border-none bg-muted/50 px-4 focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="mt-1 h-10 w-full cursor-pointer rounded-xl bg-primary font-normal text-primary-foreground hover:bg-primary/90 transition-all"
            >
              {loading ? 'Processing...' : 'Sign Up'}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center border-t border-border bg-muted/10 py-4">
          <Link href="/login" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Already have an account? Sign In
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}