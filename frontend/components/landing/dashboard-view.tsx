"use client"

import { motion } from "framer-motion"
import { Smartphone, Monitor, CheckCircle } from "lucide-react"

export function DashboardView() {
  return (
    <section id="dashboard" className="py-20 sm:py-32 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance text-foreground">
              Manage Everything from Your Dashboard
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-lg text-muted-foreground">
                  View all your savings groups, track contributions, and monitor upcoming payouts in one unified interface
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-lg text-muted-foreground">
                  Access comprehensive analytics on your savings performance and manage group memberships seamlessly
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right side - Devices mockup */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative">
              {/* Laptop mockup */}
              <div className="bg-gray-900 rounded-t-2xl p-3 shadow-2xl">
                <div className="bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg aspect-video overflow-hidden">
                  <div className="p-6 text-white">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold">Community<br/>Savings<br/>with Hajo</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
                        <p className="text-xs opacity-80 mb-2">Total Balance</p>
                        <p className="text-xl font-bold">$8,290</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
                        <p className="text-xs opacity-80 mb-2">This Month</p>
                        <p className="text-xl font-bold">+12%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 h-2 rounded-b-2xl"></div>

              {/* Phone mockup overlay */}
              <div className="absolute -bottom-8 -right-8 w-40 h-80 bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-500 rounded-[1.5rem] overflow-hidden p-3">
                  <div className="bg-white/10 backdrop-blur-lg rounded-lg p-3 text-white">
                    <p className="text-xs mb-1">Balance</p>
                    <p className="text-lg font-bold">$4,290</p>
                  </div>
                  <div className="mt-3 space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-white/10 backdrop-blur-lg rounded-lg p-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-white/20 rounded-full"></div>
                          <div className="flex-1">
                            <div className="h-2 bg-white/30 rounded w-full mb-1"></div>
                            <div className="h-1.5 bg-white/20 rounded w-2/3"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Download badges */}
              <div className="flex gap-3 mt-12">
                <div className="bg-black text-white rounded-lg px-4 py-2 flex items-center gap-2 text-xs">
                  <Monitor className="w-4 h-4" />
                  <div>
                    <p className="text-[8px] opacity-70">Download on</p>
                    <p className="font-semibold">App Store</p>
                  </div>
                </div>
                <div className="bg-black text-white rounded-lg px-4 py-2 flex items-center gap-2 text-xs">
                  <Smartphone className="w-4 h-4" />
                  <div>
                    <p className="text-[8px] opacity-70">Get it on</p>
                    <p className="font-semibold">Google Play</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
