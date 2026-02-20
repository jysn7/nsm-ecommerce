'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface CartItem {
  id: string // variantid
  productid: string
  storeid: string
  name: string
  price: number
  quantity: number
  image: string
  stock: number 
}

interface MarketplaceState {
  items: CartItem[]
  total: number
  addItem: (product: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, delta: number) => void
  clearCart: () => void
  
  searchQuery: string
  setSearchQuery: (query: string) => void
  priceRange: number[]
  setPriceRange: (range: number[]) => void
  category: string
  setCategory: (category: string) => void
}

// Helper to calculate total
const calculateTotal = (items: CartItem[]) => 
  Number(items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2))

export const useStore = create<MarketplaceState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      searchQuery: '',
      priceRange: [10000],
      category: 'all',

      addItem: (product) => set((state) => {
        const existingItem = state.items.find((item) => item.id === product.id)
        
        if (existingItem && existingItem.quantity >= product.stock) {
          return state 
        }

        let newItems
        if (existingItem) {
          newItems = state.items.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        } else {
          newItems = [...state.items, { ...product, quantity: 1 }]
        }
        
        return { 
          items: newItems, 
          total: calculateTotal(newItems) 
        }
      }),

      removeItem: (id) => set((state) => {
        const newItems = state.items.filter((item) => item.id !== id)
        return { 
          items: newItems, 
          total: calculateTotal(newItems) 
        }
      }),

      updateQuantity: (id, delta) => set((state) => {
        const newItems = state.items.map((item) => {
          if (item.id === id) {
            const nextQuantity = item.quantity + delta
            if (nextQuantity < 1) return item
            if (nextQuantity > item.stock) return item
            return { ...item, quantity: nextQuantity }
          }
          return item
        })
        
        return { 
          items: newItems, 
          total: calculateTotal(newItems) 
        }
      }),

      clearCart: () => set({ items: [], total: 0 }),

      setSearchQuery: (query) => set({ searchQuery: query }),
      setPriceRange: (range) => set({ priceRange: range }),
      setCategory: (category) => set({ category }),
    }),
    {
      name: 'marketplace-storage', 
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        items: state.items, 
        total: state.total,
        category: state.category,
        priceRange: state.priceRange 
      }),
    }
  )
)