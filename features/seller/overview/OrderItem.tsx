'use client';

import { Package } from "lucide-react";

type Order = {
  id: string;
  item: string;
  price: number;
  status: string;
};

export default function OrderItem({
  order,
  isLast,
}: {
  order: Order;
  isLast: boolean;
}) {
  return (
    <div
      className={`p-5 flex items-center justify-between hover:bg-muted/10 transition-colors ${
        !isLast ? "border-b border-border/40" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center">
          <Package className="h-4 w-4 text-muted-foreground stroke-[1.5]" />
        </div>

        <div>
          <p className="text-xs font-normal text-foreground">{order.item}</p>
          <p className="text-[9px] uppercase tracking-tight text-muted-foreground">
            {order.id} • R {order.price}
          </p>
        </div>
      </div>

      <span className="text-[8px] uppercase tracking-widest px-3 py-1 rounded-full bg-muted text-muted-foreground font-medium">
        {order.status}
      </span>
    </div>
  );
}
