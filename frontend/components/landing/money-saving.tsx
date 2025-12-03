"use client"

import { motion } from "framer-motion"
import { CheckCircle, TrendingUp, Users, Wallet } from "lucide-react"

const benefits = [
  {
    icon: CheckCircle,
    title: "Smart Contracts",
    description: "Automated payouts and contributions handled by secure blockchain technology"
  },
  {
    icon: TrendingUp,
    title: "Yield Generation",
    description: "Optional DeFi integration to earn passive income on pooled funds"
  },
  {
    icon: Users,
    title: "Community Trust",
    description: "Build your on-chain reputation and join verified savings circles"
  },
  {
    icon: Wallet,
    title: "Full Control",
    description: "Non-custodial solution means you always maintain control of your funds"
  },
]

export function MoneySaving() {
  return (
    <section className="py-20 sm:py-32 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left side - Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Phone frame */}
              <div className="relative w-[280px] h-[560px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-[3rem] p-3 shadow-2xl mx-auto">
                {/* Phone notch */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-5 bg-gray-900 rounded-full z-10"></div>
                
                {/* Phone screen */}
                <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-500 rounded-[2.5rem] overflow-hidden p-6 relative">
                  {/* Header */}
                  <div className="text-white mb-6">
                    <p className="text-sm opacity-80 mb-1">Your Balance</p>
                    <p className="text-3xl font-bold">$12,450.00</p>
                  </div>

                  {/* Cards */}
                  <div className="space-y-4 mb-6">
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                      <div className="flex items-center justify-between text-white">
                        <div>
                          <p className="text-xs opacity-80 mb-1">Main Card</p>
                          <p className="font-semibold">**** 4829</p>
                        </div>
                        <p className="text-lg font-bold">$8,290</p>
                      </div>
                    </div>
                  </div>

                  {/* Transaction list */}
                  <div className="bg-white dark:bg-gray-800 rounded-t-3xl p-5 absolute bottom-0 left-0 right-0 h-[60%]">
                    <h3 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">Recent Activity</h3>
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                              <Wallet className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Payment</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Today</p>
                            </div>
                          </div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">-$45</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stats */}
              <div className="absolute -top-8 -right-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 animate-float hidden lg:block">
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">This Month</p>
                    <p className="font-bold text-gray-900 dark:text-gray-100">+$2,340</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance text-foreground">
              Community Savings Platform Built for Trust
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Hajo brings traditional African savings circles (Ajo/Esusu) on-chain, combining cultural trust with blockchain transparency and security.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-foreground">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
