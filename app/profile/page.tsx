'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import { getProfileAndStore, activateSellerAccount, updateStoreProfile } from "@/lib/supabase/customer"
import { User, Store, Loader2, ArrowRight, LayoutDashboard, Settings2, Image as ImageIcon, Upload } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

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

  const MAX_FILE_SIZE = 2 * 1024 * 1024

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    try {
      // Using your helper which now returns public URLs automatically
      const { profile, store } = await getProfileAndStore()
      setProfile(profile)
      setStore(store)
      if (store) setEditData({ store_name: store.store_name })
    } catch (error) {
      toast.error("Account error", { description: "Could not sync profile data." })
    } finally {
      setLoading(false)
    }
  }

  async function handleUpdateStore() {
    if (!profile || !store) return
    setUpdating(true)
    try {
      const result = await updateStoreProfile(profile.id, {
        storeName: editData.store_name,
        logoFile: logoFile || undefined,
        bannerFile: bannerFile || undefined
      })

      if (result.success) {
        // Refresh local data after update
        await loadData()
        setIsEditing(false)
        setLogoFile(null)
        setBannerFile(null)
        toast.success("Merchant profile updated")
      } else {
        toast.error("Update failed")
      }
    } catch (error: any) {
      toast.error("Network error")
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
        await loadData()
        toast.success("Merchant account activated")
      } else {
        toast.error("Activation failed")
      }
    } catch (err) {
      toast.error("Service error")
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
    <div className="min-h-screen bg-background pb-24">
      <section className="pt-32 pb-16 px-8 md:px-16 lg:px-24">
        <div className="max-w-350 mx-auto space-y-12">
          <div className="text-left max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
              Account Management
            </p>
            <h1 className="text-5xl font-normal tracking-tighter text-foreground uppercase mb-6">
              Settings
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Manage your merchant profile, update business credentials, and view your account status.
            </p>
          </div>
          <Separator className="opacity-40" />
        </div>
      </section>

      <main className="px-8 md:px-16 lg:px-24">
        <div className="max-w-350 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-muted/20 border border-border/40 rounded-2xl p-8 space-y-6">
              <div className="flex items-center gap-6">
                <div className="h-16 w-16 rounded-full bg-background border border-border/40 flex items-center justify-center">
                  <User className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-tight">{profile?.full_name}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">{profile?.email}</p>
                </div>
              </div>
              <div className="pt-6 border-t border-border/20">
                <div className="inline-block px-4 py-1 rounded-full bg-foreground text-background text-[9px] uppercase tracking-[0.2em] font-bold">
                  {profile?.role} ID: {profile?.id.slice(0, 8)}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            {!store ? (
              <div className="bg-foreground rounded-2xl p-12 space-y-8">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-background/50">Business Registration</span>
                  <h3 className="text-2xl font-normal text-background uppercase tracking-tight">Activate Merchant Store</h3>
                  <p className="text-xs text-background/60 leading-relaxed max-w-md">
                    Open your store to start listing products. Choose a business name to generate your unique store handle.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
                  <input 
                    placeholder="ENTER STORE NAME..."
                    value={newStoreName}
                    onChange={(e) => setNewStoreName(e.target.value)}
                    className="flex-1 bg-background/10 border border-background/20 rounded-xl px-6 py-4 text-xs text-background outline-none uppercase tracking-widest placeholder:text-background/30"
                  />
                  <button 
                    onClick={handleBecomeSeller}
                    disabled={updating || !newStoreName}
                    className="bg-background text-foreground px-8 py-4 rounded-xl text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-background/90 transition-all"
                  >
                    {updating ? "Registering..." : "Open Store"}
                    {!updating && <ArrowRight className="h-3 w-3" />}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-muted/20 border border-border/40 rounded-2xl p-10 space-y-10">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-6">
                    <div className="h-20 w-20 rounded-2xl bg-background border border-border/40 flex items-center justify-center overflow-hidden relative shadow-sm">
                      {store.logo_url ? (
                        <Image src={store.logo_url} alt="" fill className="object-cover" unoptimized />
                      ) : (
                        <Store className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-xl font-normal uppercase tracking-tight">{store.store_name}</h4>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-500 font-bold mt-1">
                        Seller ID: {store.storeid}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 px-4 py-2 bg-background border border-border/40 rounded-xl text-[10px] uppercase tracking-widest font-bold hover:bg-muted/50 transition-colors"
                  >
                    <Settings2 className="h-3.5 w-3.5" />
                    {isEditing ? "Exit Edit" : "Edit Store"}
                  </button>
                </div>

                {isEditing ? (
                  <div className="space-y-8 pt-8 border-t border-border/20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Trading Name</label>
                        <input 
                          value={editData.store_name}
                          onChange={(e) => setEditData({...editData, store_name: e.target.value})}
                          className="w-full bg-background border border-border/40 rounded-xl px-4 py-4 text-xs outline-none uppercase tracking-widest"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Logo Upload</label>
                        <div className="relative group h-14 border border-dashed border-border/60 rounded-xl bg-background flex items-center px-4 overflow-hidden cursor-pointer">
                          <Upload className="h-4 w-4 text-muted-foreground mr-3" />
                          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                            {logoFile ? logoFile.name : "Choose File"}
                          </span>
                          <input 
                            type="file"
                            accept="image/*"
                            onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Header Image</label>
                      <div className="relative group h-32 border border-dashed border-border/60 rounded-xl bg-background flex items-center justify-center overflow-hidden cursor-pointer">
                        {bannerFile ? (
                          <span className="text-[10px] text-primary uppercase font-bold">{bannerFile.name}</span>
                        ) : store.banner_url ? (
                          <Image src={store.banner_url} alt="" fill className="object-cover opacity-20" unoptimized />
                        ) : (
                          <ImageIcon className="h-6 w-6 text-muted-foreground opacity-40" />
                        )}
                        <input 
                          type="file"
                          accept="image/*"
                          onChange={(e) => setBannerFile(e.target.files?.[0] || null)}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>

                    <button 
                      onClick={handleUpdateStore}
                      disabled={updating}
                      className="w-full bg-foreground text-background text-[10px] uppercase tracking-[0.3em] py-5 rounded-xl font-bold flex items-center justify-center gap-2"
                    >
                      {updating ? <Loader2 className="h-3 w-3 animate-spin" /> : "Confirm Changes"}
                    </button>
                  </div>
                ) : (
                  <Link 
                    href="/dashboard"
                    className="w-full bg-foreground text-background text-[10px] uppercase tracking-[0.3em] py-5 rounded-xl flex items-center justify-center gap-3 font-bold hover:bg-neutral-800 transition-colors"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Manage Inventory
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}