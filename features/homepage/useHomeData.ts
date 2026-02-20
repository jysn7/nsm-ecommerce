'use client'

import { useEffect, useState } from "react"
import { getBuyerProducts, getCategories, getStores } from "@/lib/supabase/products"
import { createClient } from "@/lib/supabase/client"

export function useHomeData() {
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [stores, setStores] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    async function loadData() {
      setLoading(true)

      const supabase = await createClient()
      const { data: { user: authUser } } = await supabase.auth.getUser()
      setUser(authUser)

      const [prodRes, catRes, storeRes] = await Promise.all([
        getBuyerProducts(),
        getCategories(),
        getStores()
      ])

      if (prodRes.success) setProducts(prodRes.data.slice(0, 8))
      if (catRes.success) setCategories(catRes.data)
      if (storeRes.success) setStores(storeRes.data ?? [])

      setLoading(false)
    }

    loadData()
  }, [])

  const sellerRoute = user ? "/profile" : "/login"

  return { products, categories, stores, loading, sellerRoute }
}