"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Menu, ArrowLeft } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { WalletButton } from "@/components/wallet-button"
import { ThemeToggle } from "@/components/theme-toggle"

export function DashboardHeader() {
  

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg transition-shadow duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" aria-label="Back to home" className="inline-flex">
              <Button variant="ghost" size="icon" className="transition-all duration-200 hover:bg-accent/50">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/" className="flex items-center gap-2 transition-transform duration-200 hover:scale-105">
              <span className="text-3xl sm:text-4xl font-bold leading-none">
                <span className="text-gray-900 dark:text-gray-100">Ha</span>
                <span className="text-primary">joo</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <WalletButton />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="sm:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/">Home</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
