'use client';

import { ExternalLink } from "lucide-react";
import Link from "next/link";
import OrderItem from "./OrderItem";

const RECENT_ORDERS = [
  { id: "ORD-7721", item: "Minimalist Lamp", price: 899, status: "Processing" },
  { id: "ORD-7719", item: "Mechanical Keyboard", price: 1450, status: "Shipped" },
  { id: "ORD-7715", item: "Concrete Pot", price: 299, status: "Completed" },
];

export default function ActiveOrders() {
  return (
    <div className="lg:col-span-2 space-y-4">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-[10px] uppercase tracking-widest text-muted-foreground">
          Active Orders
        </h2>

        <Link
          href="/orders"
          className="text-[9px] uppercase tracking-widest text-primary flex items-center gap-1"
        >
          View All <ExternalLink className="h-2 w-2" />
        </Link>
      </div>

      <div className="bg-background border border-border/40 rounded-2xl overflow-hidden">
        {RECENT_ORDERS.map((order, index) => (
          <OrderItem
            key={order.id}
            order={order}
            isLast={index === RECENT_ORDERS.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
