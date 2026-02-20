'use client';

import OverviewHeader from "./OverviewHeader";
import ActiveOrders from "./ActiveOrders";
import DatabaseActions from "./DatabaseActions";

export default function OverviewTab() {
  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      <OverviewHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ActiveOrders />
        <DatabaseActions />
      </div>
    </div>
  );
}
