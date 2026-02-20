'use client'

import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { useStore } from "@/hooks/use-cart"
import Link from "next/link"

export function CartMenu() {
  const { items, removeItem, updateQuantity } = useStore()
  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-xl text-muted-foreground hover:text-foreground">
          <ShoppingCart className="h-[1.1rem] w-[1.1rem] stroke-[1.5]" />
          {cartCount > 0 && (
            <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 bg-primary rounded-full" />
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="flex flex-col w-full sm:w-[440px] p-0 bg-background border-l border-border">
        <SheetHeader className="p-6 border-b border-border/50">
          <SheetTitle className="text-[10px] uppercase tracking-widest font-normal text-muted-foreground">
            Shopping Bag ({cartCount})
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-muted-foreground stroke-[1]" />
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-widest text-foreground">Your bag is empty</p>
                <p className="text-[10px] text-muted-foreground">Add some items to get started</p>
              </div>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="h-20 w-20 shrink-0 rounded-xl bg-muted/30 overflow-hidden">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
                
                <div className="flex flex-1 flex-col justify-between py-0.5">
                  <div className="flex justify-between items-start gap-2">
                    <div className="space-y-1">
                      <h4 className="text-xs font-normal leading-tight line-clamp-2">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">R {item.price}</p>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5 stroke-[1.5]" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3 border border-border/60 rounded-lg px-2 py-1">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-[10px] font-medium w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <span className="text-xs ml-auto">R {item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-border bg-muted/5 space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Subtotal</span>
                <span className="text-sm font-normal">R {total}</span>
              </div>
              <p className="text-[9px] text-muted-foreground">Shipping and taxes calculated at checkout.</p>
            </div>
            <Button asChild className="w-full h-12 rounded-xl text-xs font-normal uppercase tracking-widest bg-foreground text-background hover:bg-foreground/90">
              <Link href="/checkout">Continue to Checkout</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}