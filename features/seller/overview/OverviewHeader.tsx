'use client';

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function OverviewHeader() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="text-center md:text-left">
        <h1 className="text-xl font-normal text-foreground tracking-tight">
          Store Management
        </h1>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
          Control your inventory and fulfillment
        </p>
      </div>

      <Button
        asChild
        className="h-10 rounded-xl px-8 text-[10px] uppercase tracking-widest bg-primary hover:opacity-90"
      >
        <Link href="/inventory/new">
          <Plus className="mr-2 h-4 w-4" />
          List New Item
        </Link>
      </Button>
    </div>
  );
}
