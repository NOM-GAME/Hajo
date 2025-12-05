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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100/80 via-transparent to-gray-200/80 dark:from-purple-950/30 dark:via-gray-950/80 dark:to-blue-950/30 transition-colors duration-700" />
        <motion.div 
          className="absolute -top-10 -right-10 w-[28rem] h-[28rem] bg-primary/20 rounded-full blur-3xl dark:bg-primary/30"
          animate={{
            scale: [1, 1.05, 1],
            x: [0, 10, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-[-4rem] left-[-4rem] w-[22rem] h-[22rem] bg-gray-300/40 rounded-full blur-3xl dark:bg-blue-500/30"
          animate={{
            scale: [1, 1.05, 1],
            x: [0, -10, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        <div className="relative z-10 px-4 py-12 sm:py-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center space-y-6"
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 10 }}
              className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-200/80 dark:border-gray-700/60 shadow-sm hover:shadow transition-all duration-300 hover:border-primary/30 dark:hover:border-primary/50"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse group-hover:animate-none" />
                <Sparkles className="relative h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-white bg-clip-text text-transparent">
                Powered by Hedera
              </span>
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
              Community Savings <br />
              <span className="bg-gradient-to-r from-[#7A5AF8] to-[#5B8DEF] bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
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
            <Card className="p-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-100/80 dark:border-gray-700/70 shadow-lg shadow-gray-200/50 dark:shadow-primary/10 transition-all duration-300 hover:shadow-xl hover:shadow-gray-300/50 dark:hover:shadow-primary/20 hover:scale-[1.02] dark:hover:border-gray-600/70">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100/80 dark:from-primary/20 dark:to-gray-700 shadow-sm transition-all duration-300 hover:scale-110 group-hover:shadow-md">
                  <Users className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <motion.div 
                  className="p-1 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </motion.div>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">0</div>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Pools</div>
            </Card>
            
            <Card className="p-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-100/80 dark:border-gray-700/70 shadow-lg shadow-gray-200/50 dark:shadow-primary/10 transition-all duration-300 hover:shadow-xl hover:shadow-gray-300/50 dark:hover:shadow-primary/20 hover:scale-[1.02] dark:hover:border-gray-600/70">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100/80 dark:from-blue-500/20 dark:to-gray-700 shadow-sm transition-all duration-300 hover:scale-110 group-hover:shadow-md">
                  <DollarSign className="h-5 w-5 text-[#5B8DEF] group-hover:scale-110 transition-transform" />
                </div>
                <motion.div 
                  className="p-1 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </motion.div>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">$0</div>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Saved</div>
            </Card>
            
            <Card className="p-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-100/80 dark:border-gray-700/70 shadow-lg shadow-gray-200/50 dark:shadow-primary/10 transition-all duration-300 hover:shadow-xl hover:shadow-gray-300/50 dark:hover:shadow-primary/20 hover:scale-[1.02] dark:hover:border-gray-600/70">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100/80 dark:from-primary/20 dark:to-gray-700 shadow-sm transition-all duration-300 hover:scale-110 group-hover:shadow-md">
                  <TrendingUp className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <motion.div 
                  className="p-1 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </motion.div>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">0%</div>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Completion Rate</div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full"
        >
          <TabsList className="w-full justify-center gap-2 p-1 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-200/80 dark:border-gray-700/70 shadow-sm hover:shadow-md/60 dark:hover:shadow-gray-900/60 rounded-2xl transition-all duration-300">
            <TabsTrigger 
              value="groups" 
              className="group gap-1.5 rounded-xl px-5 py-1.5 md:px-7 md:py-2 min-w-[110px] md:min-w-[140px] text-xs md:text-sm font-medium data-[state=active]:bg-primary/90 data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all duration-200 hover:bg-gray-50/80 dark:hover:bg-gray-700/60 hover:shadow-sm active:scale-95"
            >
              <Home className="h-3.5 w-3.5 transition-transform group-hover:scale-110 group-data-[state=active]:scale-110" />
              <span className="relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full group-data-[state=active]:after:w-full">Pools</span>
            </TabsTrigger>
            <TabsTrigger 
              value="create" 
              className="group gap-1.5 rounded-xl px-5 py-1.5 md:px-7 md:py-2 min-w-[110px] md:min-w-[140px] text-xs md:text-sm font-medium data-[state=active]:bg-primary/90 data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all duration-200 hover:bg-gray-50/80 dark:hover:bg-gray-700/60 hover:shadow-sm active:scale-95"
            >
              <PlusCircle className="h-3.5 w-3.5 transition-transform group-hover:scale-110 group-data-[state=active]:scale-110" />
              <span className="relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full group-data-[state=active]:after:w-full">Create</span>
            </TabsTrigger>
            <TabsTrigger 
              value="transactions" 
              className="group gap-1.5 rounded-xl px-5 py-1.5 md:px-7 md:py-2 min-w-[110px] md:min-w-[140px] text-xs md:text-sm font-medium data-[state=active]:bg-primary/90 data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all duration-200 hover:bg-gray-50/80 dark:hover:bg-gray-700/60 hover:shadow-sm active:scale-95"
            >
              <Receipt className="h-3.5 w-3.5 transition-transform group-hover:scale-110 group-data-[state=active]:scale-110" />
              <span className="relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full group-data-[state=active]:after:w-full">Activity</span>
            </TabsTrigger>
          </TabsList>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mt-6 min-h-[600px]"
          >
            <TabsContent value="groups" className="mt-0">
              <MyGroups onCreateClick={handleCreateClick} />
            </TabsContent>

            <TabsContent value="create" className="mt-0">
              <CreateGroup />
            </TabsContent>

            <TabsContent value="transactions" className="mt-0">
              <Transactions />
            </TabsContent>
          </motion.div>
        </Tabs>
      </div>
    </div>
  )
}
