import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-12 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-4">
          <Link href="/" className="flex items-center gap-2 transition-transform duration-200 hover:scale-105">
            <span className="text-3xl sm:text-4xl font-bold leading-none">
              <span className="text-gray-900">Ha</span>
              <span className="text-primary">jo</span>
            </span>
          </Link>
          <p className="text-muted-foreground max-w-md text-pretty">
            Bringing traditional African savings circles on-chain.
          </p>
          <p className="text-sm text-muted-foreground">© 2025 Hajo. Built on Base blockchain.</p>
        </div>
      </div>
    </footer>
  )
}
