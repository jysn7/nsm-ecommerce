'use client'

import { useState, useEffect } from "react"
import { getProfileAndStore, activateSellerAccount } from "@/lib/supabase/customer"
import { User, Store, ShieldCheck, Loader2, ArrowRight } from "lucide-react"
import { toast } from "sonner"

export default function ProfilePage() {
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const [store, setStore] = useState<any>(null)
  const [newStoreName, setNewStoreName] = useState("")

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    try {
      const { profile, store } = await getProfileAndStore()
      setProfile(profile)
      setStore(store)
    } catch (error) {
      toast.error("Failed to load profile data")
    } finally {
      setLoading(false)
    }
  }

  async function handleBecomeSeller() {
    if (!newStoreName || !profile) return
    setUpdating(true)
    
    const result = await activateSellerAccount(profile.id, newStoreName)
    
    if (result.success) {
      setStore(result.store)
      setProfile({ ...profile, role: 'seller' })
      toast.success("Merchant account activated", {
        description: `${newStoreName} is now ready for business.`
      })
    } else {
      toast.error("Activation failed", {
        description: result.error || "Please try again later."
      })
    }
    
    setUpdating(false)
  }

  if (loading) return (
    <div className="h-screen flex items-center justify-center">
      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto space-y-12 py-16 px-6">
      <section className="space-y-6 text-center">
        <h2 className="text-lg font-normal tracking-tight">Account Settings</h2>
        <div className="bg-muted/20 border border-border/40 rounded-2xl p-8 flex items-center gap-6 text-left">
          <div className="h-12 w-12 rounded-full bg-background border border-border/40 flex items-center justify-center">
            <User className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-normal">{profile?.full_name}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{profile?.email}</p>
          </div>
          <div className="px-4 py-1 rounded-full bg-background border border-border/40 text-[9px] uppercase tracking-widest font-medium text-primary">
            {profile?.role}
          </div>
        </div>
      </section>

      <section>
        {!store ? (
          <div className="bg-background border border-border/40 rounded-2xl p-10 space-y-8 text-center">
            <div className="space-y-2">
              <h3 className="text-sm font-normal">Ready to start selling?</h3>
              <p className="text-[11px] text-muted-foreground max-w-xs mx-auto">
                Enter your store name below to activate your merchant dashboard instantly.
              </p>
            </div>
            <div className="max-w-xs mx-auto space-y-4">
              <input 
                placeholder="Store Name"
                value={newStoreName}
                onChange={(e) => setNewStoreName(e.target.value)}
                className="w-full bg-muted/20 border border-border/40 rounded-xl px-4 py-3 text-xs outline-none text-center"
              />
              <button 
                onClick={handleBecomeSeller}
                disabled={updating || !newStoreName}
                className="w-full bg-primary text-primary-foreground text-[10px] uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-2"
              >
                {updating ? "Activating..." : "Create Store"}
                {!updating && <ArrowRight className="h-3 w-3" />}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-muted/20 border border-border/40 rounded-2xl p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-background border border-border/40 flex items-center justify-center">
                  <Store className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-normal">{store.store_name}</p>
                  <p className="text-[9px] uppercase tracking-widest text-muted-foreground mt-1">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2" />
                    Active Merchant
                  </p>
                </div>
              </div>
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
          </div>
        )}
      </section>
    </div>
  )
}