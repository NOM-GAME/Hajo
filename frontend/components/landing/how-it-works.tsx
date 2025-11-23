"use client"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { UserPlus, CreditCard, CheckCircle } from "lucide-react"

const steps = [
  {
    number: "1",
    icon: UserPlus,
    title: "Connect Wallet",
    description: "Link your Web3 wallet to get started. We support all major wallets for seamless access.",
  },
  {
    number: "2",
    icon: CreditCard,
    title: "Join or Create Group",
    description: "Start your own savings circle or join an existing trusted group that fits your goals.",
  },
  {
    number: "3",
    icon: CheckCircle,
    title: "Save & Earn",
    description: "Make automated contributions and receive payouts on schedule. Build your financial future!",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-32 bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance text-gray-900">
            How Hajo Works
          </h2>
          <p className="text-lg text-gray-700 text-pretty">
            Get started in minutes with our simple three-step process. No complicated setup, just pure savings power.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto"
        >
          {steps.map((step, index) => (
            <motion.div key={index} variants={item} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 border-t-2 border-dashed border-primary/30" />
              )}
              
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-24 h-24 rounded-full bg-white border-4 border-primary/20 flex items-center justify-center mb-6 relative">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center text-lg shadow-lg">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
                <p className="text-gray-700 text-pretty leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
