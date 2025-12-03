"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { TrendingUp } from "lucide-react"

const faqs = [
  {
    question: "What is Hajo and how does it work?",
    answer: "Hajo is a blockchain-powered community savings platform that brings traditional African savings circles (Ajo/Esusu) on-chain. Members contribute funds regularly, and smart contracts automate payouts transparently and securely."
  },
  {
    question: "Is my money safe with Hajo?",
    answer: "Absolutely! Your funds are protected by audited smart contracts on the Base blockchain. We're non-custodial, meaning you maintain full control. All transactions are transparent and recorded on-chain."
  },
  {
    question: "How do I join or create a savings group?",
    answer: "Simply connect your Web3 wallet, then browse existing groups or create your own. You can choose between rotational, target-based, or flexible savings circles to match your financial goals."
  },
  {
    question: "What happens if someone misses a payment?",
    answer: "Smart contracts automatically track contributions. Late payments are flagged, and repeated defaults may result in removal from the cycle to protect other members. This builds trust and accountability in the community."
  },
]

export function FAQ() {
  return (
    <section id="faq" className="py-20 sm:py-32 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Left side - Card preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 rounded-3xl p-8 lg:p-12">
              <div className="bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl p-6 text-white shadow-2xl max-w-sm">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-sm font-medium">Group Savings</span>
                  <TrendingUp className="w-5 h-5" />
                </div>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-sm opacity-80 mb-1">Total Balance</p>
                    <p className="text-3xl font-bold">$85,678.39</p>
                  </div>
                  
                  {/* Mini chart */}
                  <div className="h-24 flex items-end justify-between gap-1">
                    {[40, 60, 35, 75, 45, 85, 50, 95, 65, 80, 55, 70].map((height, i) => (
                      <div key={i} className="flex-1 bg-white/30 rounded-t" style={{ height: `${height}%` }}></div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="opacity-80">Last 12 Months</span>
                    <span className="font-semibold">+12.5%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - FAQ */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Got questions? We've got answers. Learn more about how Hajo revolutionizes community savings.
            </p>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-xl px-6 bg-purple-50/30 dark:bg-purple-950/30">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                    {index + 1}. {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
