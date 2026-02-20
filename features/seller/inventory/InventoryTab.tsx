'use client'

import { useState, useEffect } from "react"
import InventoryHeader from "./InventoryHeader"
import InventoryList from "./InventoryList/InventoryList"
import AddProductModal from "./AddProductModal"
import { getProfileAndStore } from "@/lib/supabase/customer"
import { getStoreInventory } from "@/lib/supabase/products"
import { Loader2 } from "lucide-react"
import InventorySkeleton from "./InventorySkeleton"

export default function InventoryTab() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [storeId, setStoreId] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    fetchInventory()
  }, [])

  async function fetchInventory() {
    setLoading(true)
    try {
      const { store } = await getProfileAndStore()
      const id = store?.id || store?.storeid
      
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

  const handleRefresh = () => {
    fetchInventory()
  }

  if (loading) return (
    <InventorySkeleton />
  )

  return (
    <div className="space-y-6 md:space-y-10 w-full max-w-5xl mx-auto px-4 md:px-0 text-left">
      {storeId && (
        <InventoryHeader onAdd={() => setShowAddModal(true)} />
      )}

      {!storeId && !loading && (
        <div className="py-20 border border-dashed border-border/60 rounded-3xl flex flex-col items-start px-10 gap-2">
          <p className="text-sm font-normal">Store profile not initialized</p>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Please complete your seller setup to manage inventory</p>
        </div>
      )}

      <div className="w-full">
        <InventoryList
          products={products}
          onStockUpdate={handleRefresh}
        />
      </div>

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