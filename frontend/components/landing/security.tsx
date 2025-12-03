"use client"

import { motion } from "framer-motion"
import { Smartphone, Monitor } from "lucide-react"

export function Security() {
  return (
    <section id="security" className="py-20 sm:py-32 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance text-foreground">
              Save Anywhere, Anytime
            </h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Access your savings groups from any device. Desktop, mobile, or tablet - Hajo works seamlessly across all platforms.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            {/* Main container with devices */}
            <div className="bg-gradient-to-br from-purple-100 via-blue-50 to-purple-50 dark:from-purple-950/30 dark:via-blue-950/20 dark:to-purple-950/30 rounded-3xl p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Left - Laptop mockup */}
                <div className="relative">
                  <div className="bg-gray-900 rounded-t-2xl p-3 shadow-2xl">
                    <div className="bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg aspect-video overflow-hidden">
                      <div className="p-6 text-white">
                        <h3 className="text-2xl font-bold mb-4">Community<br/>Savings<br/>with Hajo</h3>
                        <div className="mt-4 space-y-2">
                          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Total Balance</span>
                              <span className="font-bold">$12,450</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-800 h-2 rounded-b-2xl"></div>
                </div>

                {/* Right - Phone mockups */}
                <div className="relative flex justify-center gap-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="w-36 h-72 bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2rem] p-2 shadow-2xl">
                      <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-500 rounded-[1.5rem] overflow-hidden p-3">
                        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-3 text-white mb-3">
                          <p className="text-xs mb-1">Balance</p>
                          <p className="text-lg font-bold">$4,290</p>
                        </div>
                        <div className="space-y-2">
                          {[1, 2, 3, 4].map((j) => (
                            <div key={j} className="bg-white/10 backdrop-blur-lg rounded-lg p-2">
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
                  ))}
                </div>
              </div>

              {/* Download badges */}
              <div className="flex flex-wrap justify-center gap-4 mt-12">
                <div className="bg-black text-white rounded-xl px-6 py-3 flex items-center gap-3">
                  <Monitor className="w-6 h-6" />
                  <div>
                    <p className="text-xs opacity-70">Download on</p>
                    <p className="font-semibold">App Store</p>
                  </div>
                </div>
                <div className="bg-black text-white rounded-xl px-6 py-3 flex items-center gap-3">
                  <Smartphone className="w-6 h-6" />
                  <div>
                    <p className="text-xs opacity-70">Get it on</p>
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
