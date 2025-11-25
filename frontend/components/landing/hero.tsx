"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Smartphone, CreditCard, Send, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Large purple circle background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-200/20 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-200/15 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="max-w-2xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-gray-900 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
              Community Savings <br />
              Made Simple <br />
              with <span className="text-primary">Hajo</span>
            </h1>

            <p className="text-lg text-gray-700 mb-8 max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              Join trusted savings circles powered by blockchain. Contribute together, earn together, and build your financial future with transparent, automated group savings.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              <Button size="lg" variant="ghost" className="text-lg px-6 h-14" asChild>
                <Link href="#features" className="flex items-center gap-2">
                  Learn More
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-700 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-fuchsia-400 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-indigo-400 border-2 border-white"></div>
              </div>
              <span>Join 1,000+ active savers building wealth together</span>
            </div>
          </div>

          {/* Right side - Phone mockup */}
          <div className="relative lg:h-[600px] flex items-center justify-center animate-in fade-in slide-in-from-right-4 duration-1000 delay-200">
            {/* Phone frame */}
            <div className="relative w-[300px] h-[600px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-[3rem] p-3 shadow-2xl">
              {/* Phone notch */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-full z-10"></div>
              
              {/* Phone screen */}
              <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-500 rounded-[2.5rem] overflow-hidden relative">
                {/* Top section - Card display */}
                <div className="p-6">
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard className="w-5 h-5" />
                      <span className="text-xs">Primary Card</span>
                    </div>
                    <p className="text-lg font-semibold mb-1">**** **** **** 8029</p>
                    <p className="text-2xl font-bold">$4,290.76</p>
                  </div>
                </div>

                {/* Quick actions */}
                <div className="px-6 grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-white rounded-xl p-3 flex flex-col items-center gap-1">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Send className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-xs font-medium">Send</span>
                  </div>
                  <div className="bg-purple-500 rounded-xl p-3 flex flex-col items-center gap-1 text-white">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-medium">Request</span>
                  </div>
                  <div className="bg-white rounded-xl p-3 flex flex-col items-center gap-1">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-lg">...</span>
                    </div>
                    <span className="text-xs font-medium">More</span>
                  </div>
                </div>

                {/* Recent payments */}
                <div className="bg-white rounded-t-3xl p-6 h-full">
                  <h3 className="font-semibold mb-4 text-gray-900">Recent Payments</h3>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Transaction</p>
                            <p className="text-xs text-gray-500">Today • 12:30 PM</p>
                          </div>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">-$56.00</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements around phone */}
            <div className="absolute top-20 -left-10 w-16 h-16 bg-purple-200 rounded-2xl shadow-lg animate-float hidden lg:block"></div>
            <div className="absolute bottom-20 -right-10 w-20 h-20 bg-blue-200 rounded-full shadow-lg animate-float" style={{ animationDelay: "1s" }}></div>
          </div>
        </div>
      </div>
    </section>
  )
}
