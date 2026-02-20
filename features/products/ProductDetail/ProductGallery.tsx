import Image from 'next/image'

export default function ProductGallery({ product }: { product: any }) {
  return (
    <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted/30 border border-border/10">
      {product.image_url && (
        <Image
          src={product.image_url}
          alt={product.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      )}
    </div>
  )
}