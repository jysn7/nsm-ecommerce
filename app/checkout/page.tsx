'use client';

import { useState } from "react"
import { useStore } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { CreditCard, Truck, ShieldCheck, ArrowLeft } from "lucide-react"
import { createOrder } from "@/lib/supabase/orders"
import { createClient } from "@/lib/supabase/client" // Ensure you have this helper
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function CheckoutPage() {
  const router = useRouter()
  const supabase = createClient()
  const { items, total: cartTotal } = useStore()
  const [isProcessing, setIsProcessing] = useState(false)

  const shipping = 50.00
  const finalTotal = cartTotal + shipping

  const handleFakePayment = async () => {
    if (items.length === 0) return

    setIsProcessing(true)
    
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser()

      if (authError || !user) {
        toast.error("Authentication required", {
          description: "Please sign in to complete your purchase."
        })
        router.push('/login')
        return
      }

      const result = await createOrder({
        buyerId: user.id,
        items: items
      })

      if (result.success) {
        toast.success("Payment successful")
        router.push('/app/buyer') 
      } else {
        throw new Error(result.error)
      }
      
    } catch (error: any) {
      toast.error("Transaction failed", {
        description: error.message || "An error occurred."
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-muted/20 p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        <Link 
          href="/products" 
          className="mb-6 flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3 w-3" /> Back to shopping
        </Link>

        <div className="grid gap-6 md:grid-cols-12">
          <div className="space-y-6 md:col-span-7">
            
            <div className="rounded-2xl bg-background p-6 shadow-sm border border-border/40">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-full bg-primary/5 p-2 text-primary">
                  <Truck className="h-4 w-4" />
                </div>
                <h2 className="text-sm font-medium">Delivery Information</h2>
              </div>
              <div className="grid gap-4">
                <input 
                  placeholder="Full Name" 
                  className="w-full rounded-lg border bg-muted/20 p-3 text-xs focus:outline-none focus:ring-1 focus:ring-primary/20" 
                />
                <input 
                  placeholder="Shipping Address" 
                  className="w-full rounded-lg border bg-muted/20 p-3 text-xs focus:outline-none focus:ring-1 focus:ring-primary/20" 
                />
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="City" className="rounded-lg border bg-muted/20 p-3 text-xs" />
                  <input placeholder="Postal Code" className="rounded-lg border bg-muted/20 p-3 text-xs" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-background p-6 shadow-sm border border-border/40">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-full bg-primary/5 p-2 text-primary">
                  <CreditCard className="h-4 w-4" />
                </div>
                <h2 className="text-sm font-medium">Simulated Payment</h2>
              </div>
              <div className="space-y-4">
                <div className="rounded-xl border border-dashed border-primary/20 bg-primary/5 p-4 text-center">
                  <p className="text-[10px] uppercase tracking-widest text-primary font-medium">Simulation Mode</p>
                  <p className="text-[10px] text-muted-foreground mt-1">This will record the order for your current user account.</p>
                </div>
                <div className="space-y-3">
                  <div className="relative">
                    <input 
                      value="4242 4242 4242 4242" 
                      readOnly 
                      className="w-full rounded-lg border bg-muted/10 p-3 text-xs font-mono text-muted-foreground cursor-not-allowed" 
                    />
                    <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input value="12/26" readOnly className="rounded-lg border bg-muted/10 p-3 text-xs font-mono text-muted-foreground" />
                    <input value="123" readOnly className="rounded-lg border bg-muted/10 p-3 text-xs font-mono text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="sticky top-8 rounded-2xl bg-background p-6 shadow-sm border border-border/40">
              <h2 className="mb-6 text-sm font-medium">Order Summary</h2>
              
              <div className="mb-6 space-y-4 max-h-75 overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-muted border border-border/10">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="truncate text-[11px] font-normal leading-tight">{item.name}</p>
                      <p className="text-[9px] text-muted-foreground mt-0.5">Quantity: {item.quantity}</p>
                    </div>
                    <p className="text-[11px] font-medium">R {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-border/40 pt-6">
                <div className="flex justify-between text-[11px] text-muted-foreground uppercase tracking-tight">
                  <span>Subtotal</span>
                  <span>R {cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[11px] text-muted-foreground uppercase tracking-tight">
                  <span>Shipping</span>
                  <span>R {shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-border/40 pt-3 text-sm font-medium">
                  <span className="uppercase tracking-tight">Total</span>
                  <span>R {finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <Button 
                onClick={handleFakePayment}
                disabled={isProcessing || items.length === 0}
                className="mt-8 w-full rounded-xl bg-primary py-6 text-[11px] uppercase tracking-widest font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98]"
              >
                {isProcessing ? "Verifying..." : `Complete Payment · R ${finalTotal.toFixed(2)}`}
              </Button>

              <div className="mt-6 flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60">
                <ShieldCheck className="h-3 w-3" /> Secure Transaction
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}