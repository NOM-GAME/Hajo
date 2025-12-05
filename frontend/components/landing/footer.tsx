"use client"

import Link from "next/link"
import { Github, Twitter, ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-12 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-2 transition-transform duration-200 hover:scale-105 mb-4">
              <span className="text-3xl sm:text-4xl font-bold leading-none">
                <span className="text-gray-900 dark:text-gray-100">Ha</span>
                <span className="text-primary">jo</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md text-pretty text-center md:text-left">
              Bringing traditional African savings circles on-chain. Save together, grow together.
            </p>
          </div>

          {/* Networks Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold mb-4 text-foreground">Supported Networks</h3>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span>Hedera</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>Base</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                <span>Celo</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                <span>Somnia</span>
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold mb-4 text-foreground">Resources</h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
              <a 
                href="https://github.com/Uchechukwu-Ekezie/Hajo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                GitHub
                <ExternalLink className="w-3 h-3" />
              </a>
              <a 
                href="https://docs.base.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                Documentation
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © 2025 Hajo. Multi-chain community savings platform.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Uchechukwu-Ekezie/Hajo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
