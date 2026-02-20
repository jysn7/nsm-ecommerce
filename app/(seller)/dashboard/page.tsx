'use client'

import { useState } from "react"
import InventoryTab from "@/features/seller/inventory/InventoryTab"
import PayoutsTab from "@/features/seller/payout/PayoutTab"
import SettingsTab from "@/features/seller/settings/SettingsTab"

export default function SellerPage() {
  const [activeTab, setActiveTab] = useState("inventory")

  const tabs = [
    { label: "Inventory", value: "inventory" },
    { label: "Payouts", value: "payouts" },
    { label: "Settings", value: "settings" },
  ]

  return (
    <div className="space-y-10">
      {/* Tab Navigation */}
      <div className="flex items-center gap-8 border-b border-border pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`text-[10px] uppercase tracking-widest transition-colors ${
              activeTab === tab.value
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "inventory" && <InventoryTab />}
        {activeTab === "payouts" && <PayoutsTab />}
        {activeTab === "settings" && <SettingsTab />}
      </div>
    </div>
  )
}
