'use client'

import { useState, useEffect } from "react"
import InventoryHeader from "./InventoryHeader"
import InventoryList from "./InventoryList/InventoryList"
import AddProductModal from "./AddProductModal"
import { getProfileAndStore } from "@/lib/supabase/customer"
import { getStoreInventory, getCategories } from "@/lib/supabase/products"
import InventorySkeleton from "./InventorySkeleton"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function InventoryTab() {
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [storeId, setStoreId] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  useEffect(() => {
    fetchInventory()
  }, [])

  async function fetchInventory() {
    setLoading(true)
    try {
      const [{ store }, catRes] = await Promise.all([
        getProfileAndStore(),
        getCategories()
      ])
      
      if (catRes.success) setCategories(catRes.data)
      
      const id = store?.id
      if (id) {
        setStoreId(id)
        const { data } = await getStoreInventory(id)
        if (data) setProducts(data)
      }
    } catch (error) {
      console.error("inventory sync failed", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleCategory = (id: string) => {
    setCollapsed(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const handleRefresh = () => {
    fetchInventory()
  }

  const groupedProducts = categories.map(category => ({
    ...category,
    items: products.filter(p => p.categoryid === category.id)
  })).filter(group => group.items.length > 0)

  const uncategorized = products.filter(p => 
    !categories.some(c => c.id === p.categoryid)
  )

  if (loading) return <InventorySkeleton />

  return (
    <div className="space-y-12 w-full text-left">
      {storeId ? (
        <>
          <InventoryHeader onAdd={() => setShowAddModal(true)} />
          
          <div className="space-y-4">
            {groupedProducts.map((group) => (
              <section key={group.id} className="border-2 border-border rounded-2xl overflow-hidden bg-muted/5">
                <button 
                  onClick={() => toggleCategory(group.id)}
                  className="w-full px-8 py-6 flex items-center justify-between hover:bg-muted/10 transition-colors"
                >
                  <div className="space-y-1 text-left">
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground">
                      {group.name}
                    </h3>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                      {group.items.length} Items Listed
                    </p>
                  </div>
                  {collapsed[group.id] ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                </button>
                
                {!collapsed[group.id] && (
                  <div className="px-8 pb-8">
                    <InventoryList
                      products={group.items}
                      onStockUpdate={handleRefresh}
                    />
                  </div>
                )}
              </section>
            ))}

            {uncategorized.length > 0 && (
              <section className="border border-border/40 rounded-2xl overflow-hidden bg-muted/5">
                <button 
                  onClick={() => toggleCategory('uncategorized')}
                  className="w-full px-8 py-6 flex items-center justify-between hover:bg-muted/10 transition-colors"
                >
                  <div className="space-y-1 text-left">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">
                      Uncategorized
                    </h3>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                      {uncategorized.length} Units
                    </p>
                  </div>
                  {collapsed['uncategorized'] ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                </button>
                
                {!collapsed['uncategorized'] && (
                  <div className="px-8 pb-8">
                    <InventoryList
                      products={uncategorized}
                      onStockUpdate={handleRefresh}
                    />
                  </div>
                )}
              </section>
            )}

            {products.length === 0 && (
              <div className="py-24 border border-dashed border-border/60 rounded-2xl flex flex-col items-center justify-center text-center">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Your inventory is currently empty
                </p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="py-20 border border-dashed border-border/60 rounded-2xl flex flex-col items-start px-10 gap-2">
          <p className="text-sm font-normal uppercase">Store profile not initialized</p>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Please complete your seller setup to manage inventory
          </p>
        </div>
      )}

      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleRefresh}
          storeId={storeId || ""} 
        />
      )}
    </div>
  )
}