"use client"

import { Card } from "@/components/ui/card"
import { Shield, CreditCard, BarChart3 } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Shield,
    title: "Blockchain Security",
    description: "Your funds are protected by audited smart contracts on Base blockchain. Non-custodial and fully transparent.",
  },
  {
    icon: CreditCard,
    title: "Flexible Savings Groups",
    description: "Create or join rotational, target-based, or flexible savings circles that match your financial goals.",
  },
  {
    icon: BarChart3,
    title: "Track Your Progress",
    description: "Monitor contributions, view payment schedules, and track your group's savings growth in real-time.",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-32 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={item} 
              className="text-left p-6 rounded-xl transition-all duration-300 hover:bg-accent/30 hover:shadow-md"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 mb-6 transition-all duration-300 hover:bg-purple-200 hover:scale-110">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground text-pretty leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
