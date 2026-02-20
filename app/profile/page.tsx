'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import { getProfileAndStore, activateSellerAccount, updateStoreProfile } from "@/lib/supabase/customer"
import { User, Store, Loader2, ArrowRight, LayoutDashboard, Settings2, Image as ImageIcon, Upload } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

export default function ProfilePage() {
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const [store, setStore] = useState<any>(null)
  
  const [newStoreName, setNewStoreName] = useState("")
  const [editData, setEditData] = useState({ store_name: "" })
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [bannerFile, setBannerFile] = useState<File | null>(null)

  const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    try {
      const { profile, store } = await getProfileAndStore()
      setProfile(profile)
      setStore(store)
      if (store) setEditData({ store_name: store.store_name })
    } catch (error) {
      toast.error("Failed to load profile data")
    } finally {
      setLoading(false)
    }
  }

  const validateFile = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      toast.error(`${file.name} is too large`, {
        description: "Please select an image smaller than 2MB."
      })
      return false
    }
    return true
  }

  async function handleUpdateStore() {
    if (!profile || !store) return
    if (logoFile && !validateFile(logoFile)) return
    if (bannerFile && !validateFile(bannerFile)) return

    setUpdating(true)
    try {
      const result = await updateStoreProfile(profile.id, {
        storeName: editData.store_name,
        logoFile: logoFile || undefined,
        bannerFile: bannerFile || undefined
      })

      if (result.success) {
        setStore(result.store)
        setIsEditing(false)
        setLogoFile(null)
        setBannerFile(null)
        toast.success("Store profile updated successfully")
      } else {
        toast.error("Update failed", { description: result.error })
      }
    } catch (error: any) {
      toast.error("An unexpected error occurred")
    } finally {
      setUpdating(false)
    }
  }

  async function handleBecomeSeller() {
    if (!newStoreName || !profile) return
    setUpdating(true)
    try {
      const result = await activateSellerAccount(profile.id, newStoreName)
      if (result.success) {
        setStore(result.store)
        setProfile({ ...profile, role: 'seller' })
        setEditData({ store_name: newStoreName })
        toast.success("Merchant account activated")
      } else {
        toast.error("Activation failed")
      }
    } catch (err) {
      toast.error("Could not activate account")
    } finally {
      setUpdating(false)
    }
  }

  if (loading) return (
    <div className="h-screen flex items-center justify-center">
      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto space-y-12 py-16 px-6">
      <section className="space-y-6 text-center">
        <h2 className="text-lg font-normal tracking-tight uppercase">Account Settings</h2>
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
              <h3 className="text-sm font-normal uppercase">Ready to start selling?</h3>
              <p className="text-[11px] text-muted-foreground max-w-xs mx-auto leading-relaxed">
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
          <div className="bg-muted/20 border border-border/40 rounded-2xl p-8 space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-background border border-border/40 flex items-center justify-center overflow-hidden relative">
                  {store.logo_url ? (
                    <Image src={store.logo_url} alt="" fill className="object-cover" unoptimized />
                  ) : (
                    <Store className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-normal uppercase">{store.store_name}</p>
                  <p className="text-[9px] uppercase tracking-widest text-muted-foreground mt-1">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2" />
                    Active Merchant
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="p-2 hover:bg-background rounded-lg transition-colors"
              >
                <Settings2 className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            {isEditing ? (
              <div className="space-y-6 pt-4 border-t border-border/40">
                <div className="grid gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-muted-foreground ml-1">Store Name</label>
                    <input 
                      value={editData.store_name}
                      onChange={(e) => setEditData({...editData, store_name: e.target.value})}
                      className="w-full bg-background border border-border/40 rounded-xl px-4 py-3 text-xs outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-wider text-muted-foreground ml-1">Store Logo</label>
                    <div className="relative group flex items-center justify-center w-full h-24 border border-dashed border-border/60 rounded-xl bg-background/50 overflow-hidden">
                      {logoFile ? (
                         <div className="text-[10px] text-primary uppercase">{logoFile.name}</div>
                      ) : store.logo_url ? (
                        <Image src={store.logo_url} alt="" fill className="object-contain opacity-40 p-2" unoptimized />
                      ) : (
                        <Upload className="h-4 w-4 text-muted-foreground" />
                      )}
                      <input 
                        type="file"
                        accept="image/*"
                        onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-wider text-muted-foreground ml-1">Store Banner</label>
                    <div className="relative group flex items-center justify-center w-full h-32 border border-dashed border-border/60 rounded-xl bg-background/50 overflow-hidden">
                      {bannerFile ? (
                        <div className="text-[10px] text-primary uppercase">{bannerFile.name}</div>
                      ) : store.banner_url ? (
                        <Image src={store.banner_url} alt="" fill className="object-cover opacity-40" unoptimized />
                      ) : (
                        <ImageIcon className="h-4 w-4 text-muted-foreground" />
                      )}
                      <input 
                        type="file"
                        accept="image/*"
                        onChange={(e) => setBannerFile(e.target.files?.[0] || null)}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      />
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleUpdateStore}
                  disabled={updating}
                  className="w-full bg-foreground text-background text-[10px] uppercase tracking-widest py-4 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  {updating ? <Loader2 className="h-3 w-3 animate-spin" /> : "Save Profile Changes"}
                </button>
              </div>
            ) : (
              <Link 
                href="/dashboard"
                className="w-full bg-primary text-background text-[10px] uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 font-bold"
              >
                <LayoutDashboard className="h-3.5 w-3.5" />
                Access Dashboard
              </Link>
            )}
          </div>
        )}
      </section>
    </div>
  )
}