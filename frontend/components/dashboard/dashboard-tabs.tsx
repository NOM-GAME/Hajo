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
    <div className="min-h-screen bg-gradient-to-br from-[#f3f1ff]/60 via-white to-[#eef4ff]/60">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#efeaff]/70 via-transparent to-[#e7efff]/70" />
        <div className="absolute -top-10 -right-10 w-[28rem] h-[28rem] bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-[-4rem] left-[-4rem] w-[22rem] h-[22rem] bg-accent/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 px-4 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border shadow-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Powered by Hedera</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-[64px] font-extrabold leading-[1.1] tracking-tight">
              Community Savings <br />
              <span className="bg-gradient-to-r from-[#7A5AF8] to-[#5B8DEF] bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join trusted savings circles powered by blockchain. Contribute together, earn together, and build your financial future with transparent, automated group savings.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" variant="outline" onClick={() => setActiveTab("groups")} className="gap-2 rounded-full px-7 py-6 text-base font-semibold bg-white/80 backdrop-blur-sm border border-[#e8e9f5]">
                <Home className="h-5 w-5" /> My Pools
              </Button>
            </div>
          </motion.div>
          
          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl mx-auto mt-12"
          >
            <Card className="p-6 bg-white/80 backdrop-blur-sm border shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#efeaff] to-white shadow-sm">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-green-600" />
              </div>
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm text-muted-foreground">Active Pools</div>
            </Card>
            
            <Card className="p-6 bg-white/80 backdrop-blur-sm border shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#e7efff] to-white shadow-sm">
                  <DollarSign className="h-5 w-5 text-[#5B8DEF]" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-green-600" />
              </div>
              <div className="text-2xl font-bold">$0</div>
              <div className="text-sm text-muted-foreground">Total Saved</div>
            </Card>
            
            <Card className="p-6 bg-white/80 backdrop-blur-sm border shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#f2f2ff] to-white shadow-sm">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-green-600" />
              </div>
              <div className="text-2xl font-bold">0%</div>
              <div className="text-sm text-muted-foreground">Completion Rate</div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-center gap-3 p-2 bg-white/80 backdrop-blur-sm border shadow-sm rounded-full">
            <TabsTrigger value="groups" className="gap-2 rounded-full px-5 py-2.5 md:px-6 md:py-3 text-sm md:text-base font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow">
              <Home className="h-4 w-4" />
              <span>Pools</span>
            </TabsTrigger>
            <TabsTrigger value="create" className="gap-2 rounded-full px-5 py-2.5 md:px-6 md:py-3 text-sm md:text-base font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow">
              <PlusCircle className="h-4 w-4" />
              <span>Create</span>
            </TabsTrigger>
            <TabsTrigger value="transactions" className="gap-2 rounded-full px-5 py-2.5 md:px-6 md:py-3 text-sm md:text-base font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow">
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
