"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <DashboardHeader />
      <main className="pt-20">
        <DashboardTabs />
      </main>
    </div>
  )
}
