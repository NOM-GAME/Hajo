"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTA() {
  return (
    <section className="py-20 sm:py-32 bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance text-gray-900">
            Ready to Start Building Your Financial Future?
          </h2>
          <p className="text-lg text-foreground/80 mb-8 text-pretty max-w-2xl mx-auto">
            Join thousands of savers who trust Hajo for transparent, secure, and community-driven savings circles
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 h-14 rounded-full" asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

