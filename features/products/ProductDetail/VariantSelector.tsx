export default function VariantSelector({
  variants,
  selectedVariant,
  setSelectedVariant,
  currentStock,
}: any) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-[10px] uppercase tracking-widest text-muted-foreground">
          Select Option
        </h4>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
          {currentStock} Available
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {variants.map((v: any) => (
          <button
            key={v.id}
            onClick={() => setSelectedVariant(v)}
            className={`px-4 py-2 rounded-xl text-xs transition-all border ${
              selectedVariant?.id === v.id
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-border hover:border-primary/50'
            }`}
          >
            {v.name}
          </button>
        ))}
      </div>
    </div>
  )
}