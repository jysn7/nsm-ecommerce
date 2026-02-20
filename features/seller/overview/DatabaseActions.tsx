'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DatabaseActions() {
  return (
    <div className="space-y-4">
      <h2 className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1">
        Database Actions
      </h2>

      <div className="bg-muted/20 p-6 rounded-2xl border border-border/20 space-y-6">
        <div className="space-y-2">
          <p className="text-xs text-foreground font-normal">
            Inventory Sync
          </p>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Update your product variants and stock counts directly in the database.
          </p>

          <Button
            variant="outline"
            asChild
            className="w-full h-8 rounded-lg text-[9px] uppercase tracking-widest border-border/40"
          >
            <Link href="/inventory">Manage Stock</Link>
          </Button>
        </div>

        <div className="h-[1px] bg-border/40 w-full" />

        <div className="space-y-2">
          <p className="text-xs text-foreground font-normal">
            Payout Settings
          </p>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Verify your store status to enable automatic payouts to your wallet.
          </p>

          <Button
            variant="outline"
            asChild
            className="w-full h-8 rounded-lg text-[9px] uppercase tracking-widest border-border/40"
          >
            <Link href="/settings/payouts">Store Setup</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
