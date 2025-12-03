"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MyGroups } from "@/components/dashboard/my-groups"
import { CreateGroup } from "@/components/dashboard/create-group"
import { Transactions } from "@/components/dashboard/transactions"
import { Home, PlusCircle, Receipt, Users, TrendingUp, DollarSign, ArrowUpRight, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export function DashboardTabs() {
  const [activeTab, setActiveTab] = useState("groups")

  const handleCreateClick = useCallback(() => {
    setActiveTab("create")
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e9d5ff]/70 via-white to-[#bfdbfe]/70 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ddd6fe]/60 via-transparent to-[#bfdbfe]/60 dark:from-purple-950/20 dark:via-transparent dark:to-blue-950/20" />
        <div className="absolute -top-10 -right-10 w-[28rem] h-[28rem] bg-primary/40 rounded-full blur-3xl dark:bg-primary/20" />
        <div className="absolute bottom-[-4rem] left-[-4rem] w-[22rem] h-[22rem] bg-blue-400/30 rounded-full blur-3xl dark:bg-blue-500/20" />
        
        <div className="relative z-10 px-4 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border shadow-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Powered by Hedera</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-[64px] font-extrabold leading-[1.1] tracking-tight text-foreground">
              Community Savings <br />
              <span className="bg-gradient-to-r from-[#7A5AF8] to-[#5B8DEF] bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join trusted savings circles powered by blockchain. Contribute together, earn together, and build your financial future with transparent, automated group savings.
            </p>

          </motion.div>
          
          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl mx-auto mt-12"
          >
            <Card className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-primary/10 shadow-lg shadow-primary/10 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:scale-105">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#efeaff] to-white dark:from-primary/20 dark:to-gray-700 shadow-sm transition-all duration-300 hover:scale-110">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-2xl font-bold text-foreground">0</div>
              <div className="text-sm text-muted-foreground">Active Pools</div>
            </Card>
            
            <Card className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-primary/10 shadow-lg shadow-primary/10 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:scale-105">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#e7efff] to-white dark:from-blue-500/20 dark:to-gray-700 shadow-sm transition-all duration-300 hover:scale-110">
                  <DollarSign className="h-5 w-5 text-[#5B8DEF]" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-2xl font-bold text-foreground">$0</div>
              <div className="text-sm text-muted-foreground">Total Saved</div>
            </Card>
            
            <Card className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-primary/10 shadow-lg shadow-primary/10 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:scale-105">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#f2f2ff] to-white dark:from-primary/20 dark:to-gray-700 shadow-sm transition-all duration-300 hover:scale-110">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-2xl font-bold text-foreground">0%</div>
              <div className="text-sm text-muted-foreground">Completion Rate</div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-center gap-3 p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border shadow-sm rounded-full">
            <TabsTrigger value="groups" className="gap-2 rounded-full px-5 py-2.5 md:px-6 md:py-3 text-sm md:text-base font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow transition-all duration-200 hover:bg-accent/50">
              <Home className="h-4 w-4" />
              <span>Pools</span>
            </TabsTrigger>
            <TabsTrigger value="create" className="gap-2 rounded-full px-5 py-2.5 md:px-6 md:py-3 text-sm md:text-base font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow transition-all duration-200 hover:bg-accent/50">
              <PlusCircle className="h-4 w-4" />
              <span>Create</span>
            </TabsTrigger>
            <TabsTrigger value="transactions" className="gap-2 rounded-full px-5 py-2.5 md:px-6 md:py-3 text-sm md:text-base font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow transition-all duration-200 hover:bg-accent/50">
              <Receipt className="h-4 w-4" />
              <span>Activity</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-6 min-h-[600px]">
            <TabsContent value="groups" className="mt-0">
              <MyGroups onCreateClick={handleCreateClick} />
            </TabsContent>

            <TabsContent value="create" className="mt-0">
              <CreateGroup />
            </TabsContent>

            <TabsContent value="transactions" className="mt-0">
              <Transactions />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
