"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
 

export function Header() {

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-white/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl sm:text-4xl font-bold leading-none">
              <span className="text-gray-900">Ha</span>
              <span className="text-primary">jo</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Button size="lg" className="rounded-full px-8" asChild>
              <Link href="/dashboard">Launch App</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

