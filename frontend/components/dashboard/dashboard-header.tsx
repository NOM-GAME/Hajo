"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAppKit } from "@reown/appkit/react"
import { useAccount } from "wagmi"
import { Menu } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function DashboardHeader() {
  const { open } = useAppKit()
  const { address } = useAccount()

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
            <Button onClick={() => open()} size="lg" className="hidden sm:flex rounded-full px-6">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="sm:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => open()}>
                  Wallet: {address?.slice(0, 6)}...{address?.slice(-4)}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
