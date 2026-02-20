'use client';

import { useState, useEffect } from "react"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal, Loader2 } from "lucide-react"
import { useStore } from "@/hooks/use-cart"
import { getCategories } from "@/lib/supabase/products"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const conditions = ["New", "Used", "Refurbished"];
const sellerTypes = ["Verified Store", "Individual Seller"];

function FilterContent() {
  const { priceRange, setPriceRange, setCategory, category } = useStore()
  const [dbCategories, setDbCategories] = useState<{id: string, name: string}[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const result = await getCategories()
      if (result.success) {
        setDbCategories(result.data)
      }
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h4 className="text-[10px] uppercase tracking-widest text-muted-foreground">Department</h4>
        <Select 
          value={category} 
          onValueChange={(value) => setCategory(value)}
          disabled={loading}
        >
          <SelectTrigger className="w-full h-9 rounded-xl border-none bg-muted/50 focus:ring-0">
            {loading ? (
              <Loader2 className="h-3 w-3 animate-spin mx-auto" />
            ) : (
              <SelectValue placeholder="All Departments" />
            )}
          </SelectTrigger>
          <SelectContent className="rounded-xl border border-border bg-background shadow-xl">
            <SelectItem value="all" className="text-xs">All Departments</SelectItem>
            {dbCategories.map((cat) => (
              <SelectItem key={cat.id} value={cat.name.toLowerCase()} className="text-xs">
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator className="bg-border/40" />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-[10px] uppercase tracking-widest text-muted-foreground">Budget Limit</h4>
          <span className="text-xs font-normal">R {priceRange[0]}</span>
        </div>
        <Slider
          value={priceRange}
          max={50000}
          step={100}
          onValueChange={(value) => setPriceRange(value)}
          className="py-2"
        />
      </div>

      <Separator className="bg-border/40" />

      <Accordion type="multiple" defaultValue={["item-1", "item-2"]} className="w-full">
        <AccordionItem value="item-1" className="border-none">
          <AccordionTrigger className="py-2 hover:no-underline text-left">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Condition</span>
          </AccordionTrigger>
          <AccordionContent className="pt-2 space-y-3">
            {conditions.map((status) => (
              <div key={status} className="flex items-center space-x-2">
                <Checkbox id={status} className="rounded-md border-muted-foreground/30" />
                <label htmlFor={status} className="text-xs font-normal cursor-pointer text-foreground/80">
                  {status}
                </label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="border-none">
          <AccordionTrigger className="py-2 hover:no-underline text-left">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Seller Type</span>
          </AccordionTrigger>
          <AccordionContent className="pt-2 space-y-3">
            {sellerTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox id={type} className="rounded-md border-muted-foreground/30" />
                <label htmlFor={type} className="text-xs font-normal cursor-pointer text-foreground/80">
                  {type}
                </label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Button 
        variant="ghost" 
        className="w-full text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground"
        onClick={() => {
          setPriceRange([10000]);
          setCategory('all');
        }}
      >
        Reset Filters
      </Button>
    </div>
  )
}

export function FilterSidebar() {
  return (
    <>
      <div className="lg:hidden w-full mb-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full h-10 rounded-xl border-border flex items-center gap-2 font-normal text-xs">
              <SlidersHorizontal className="h-4 w-4" />
              Filter & Sort
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-75 px-6 sm:w-87.5 bg-background border-r border-border">
            <SheetHeader className="text-left pb-8 pt-4">
              <SheetTitle className="text-sm font-normal uppercase tracking-widest">Filters</SheetTitle>
            </SheetHeader>
            <FilterContent />
          </SheetContent>
        </Sheet>
      </div>

      <aside className="hidden lg:block w-full">
        <FilterContent />
      </aside>
    </>
  )
}