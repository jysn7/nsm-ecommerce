'use client'

import { Button } from "@/components/ui/button"

export default function InventoryActions() {
  return (
    <div className="space-y-4">
      <h2 className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1">
        Inventory Tools
      </h2>

      <div className="bg-muted/20 p-6 rounded-2xl border border-border/20 space-y-6">
        <div className="space-y-2">
          <p className="text-xs text-foreground font-normal">
            Bulk Update
          </p>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Update multiple product stock counts and pricing at once.
          </p>

          <Button
            variant="outline"
            className="w-full h-8 rounded-lg text-[9px] uppercase tracking-widest border-border/40"
          >
            Run Update
          </Button>
        </div>

        <div className="h-px bg-border/40 w-full" />

        <div className="space-y-2">
          <p className="text-xs text-foreground font-normal">
            Export Inventory
          </p>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Download a full CSV of your current inventory database.
          </p>

          <Button
            variant="outline"
            className="w-full h-8 rounded-lg text-[9px] uppercase tracking-widest border-border/40"
          >
            Export CSV
          </Button>
        </div>
      </div>
    </div>
  )
}
