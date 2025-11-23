import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl sm:text-4xl font-bold leading-none">
              <span className="text-gray-900">Ha</span>
              <span className="text-primary">jo</span>
            </span>
          </Link>
          <p className="text-gray-700 max-w-md text-pretty">
            Bringing traditional African savings circles on-chain.
          </p>
          <p className="text-sm text-gray-600">© 2025 Hajo. Built on Base blockchain.</p>
        </div>
      </div>
    </footer>
  )
}
