'use client'

import { useState, useEffect, useRef } from "react"
import { createProduct } from "@/lib/supabase/products"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { Loader2, ImagePlus, X } from "lucide-react"

export default function AddProductModal({
  onClose,
  onAdd,
  storeId,
}: {
  onClose: () => void
  onAdd: () => void
  storeId: string
}) {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [sku, setSku] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [categories, setCategories] = useState<{ id: string, name: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [fetchingCategories, setFetchingCategories] = useState(true)
  
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    async function loadCategories() {
      const supabase = createClient()
      const { data } = await supabase
        .from('categories')
        .select('id, name')
        .order('name', { ascending: true })
      
      if (data) {
        setCategories(data)
        if (data.length > 0) setSelectedCategory(data[0].id)
      }
      setFetchingCategories(false)
    }
    loadCategories()
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const maxSize = 2 * 1024 * 1024 // 2MB
    const allowedTypes = ["image/jpeg", "image/png"]

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a JPEG or PNG image")
      return
    }

    if (file.size > maxSize) {
      toast.error("Image must be smaller than 2MB")
      return
    }

    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleSubmit = async () => {
    if (!title || !price || !stock || !selectedCategory) {
      toast.error("Please fill in all required fields")
      return
    }

    setLoading(true)

    const result = await createProduct({
      storeid: storeId,
      categoryid: selectedCategory,
      title,
      price: Number(price),
      stock: Number(stock),
      sku: sku || undefined,
      image: imageFile || undefined 
    })

    if (result.success) {
      toast.success("Product launched successfully")
      onAdd() 
      onClose()
    } else {
      toast.error("Failed to create product", {
        description: result.error
      })
    }

    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-background p-8 rounded-2xl w-full max-w-[400px] space-y-6 border border-border/40 shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="text-center">
          <h2 className="text-sm font-normal tracking-tight">New Catalog Item</h2>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Enter inventory details</p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <input 
            type="file" 
            accept="image/jpeg, image/png" 
            hidden 
            ref={fileInputRef} 
            onChange={handleImageChange}
          />
          {imagePreview ? (
            <div className="relative h-32 w-32 group">
              <img 
                src={imagePreview} 
                className="h-full w-full object-cover rounded-2xl border border-border/40" 
                alt="preview" 
              />
              <button 
                onClick={() => { setImageFile(null); setImagePreview(null); }}
                className="absolute -top-2 -right-2 bg-background border border-border/40 p-1 rounded-full shadow-sm"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="h-32 w-full border-2 border-dashed border-border/40 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-muted/20 transition-colors"
            >
              <ImagePlus className="h-6 w-6 text-muted-foreground" />
              <div className="text-center">
                <span className="block text-[9px] uppercase tracking-widest text-muted-foreground">Upload Product Photo</span>
                <span className="block text-[7px] uppercase tracking-tighter text-muted-foreground/60 mt-1">JPG, PNG up to 2MB</span>
              </div>
            </button>
          )}
        </div>

        <div className="space-y-3">
          <input
            placeholder="Product Title"
            className="w-full bg-muted/20 border border-border/40 rounded-xl px-4 py-3 text-xs outline-none focus:border-primary/50"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />

          <select
            className="w-full bg-muted/20 border border-border/40 rounded-xl px-4 py-3 text-xs outline-none focus:border-primary/50 appearance-none"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            disabled={loading || fetchingCategories}
          >
            {fetchingCategories ? (
              <option>Loading categories...</option>
            ) : (
              categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))
            )}
          </select>

          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="Price (R)"
              className="w-full bg-muted/20 border border-border/40 rounded-xl px-4 py-3 text-xs outline-none"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              disabled={loading}
            />
            <input
              type="number"
              placeholder="Initial Stock"
              className="w-full bg-muted/20 border border-border/40 rounded-xl px-4 py-3 text-xs outline-none"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              disabled={loading}
            />
          </div>

          <input
            placeholder="SKU (Optional)"
            className="w-full bg-muted/20 border border-border/40 rounded-xl px-4 py-3 text-xs outline-none"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="flex items-center justify-center gap-6 pt-2">
          <button
            onClick={onClose}
            disabled={loading}
            className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading || fetchingCategories}
            className="bg-primary text-primary-foreground text-[10px] uppercase tracking-widest px-8 py-3 rounded-xl hover:opacity-90 flex items-center gap-2"
          >
            {loading && <Loader2 className="h-3 w-3 animate-spin" />}
            {loading ? "Creating..." : "Create Product"}
          </button>
        </div>
      </div>
    </div>
  )
}