"use client"

import { useAccount } from "wagmi"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs"
import { useEffect } from "react"

export default function DashboardPage() {
  const { isConnected, isConnecting } = useAccount()

  useEffect(() => {
    if (!isConnecting && !isConnected) {
      redirect("/")
    }
  }, [isConnected, isConnecting])

  if (!isConnected) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <DashboardHeader />
      <main className="pt-20">
        <DashboardTabs />
      </main>
    </div>
  )
}
