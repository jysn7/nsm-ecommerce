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
      <div className="flex items-center gap-10 border-b border-border/40">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value
          
          return (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className="relative pb-4"
            >
              <span className={`text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                isActive
                  ? "text-foreground font-bold"
                  : "text-muted-foreground hover:text-foreground/70"
              }`}>
                {tab.label}
              </span>
              
              {/* Animated Indicator */}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground transition-all duration-300" />
              )}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-100">
        {activeTab === "inventory" && <InventoryTab />}
        {activeTab === "payouts" && <PayoutsTab />}
        {activeTab === "settings" && <SettingsTab />}
      </div>
    </div>
  )
}