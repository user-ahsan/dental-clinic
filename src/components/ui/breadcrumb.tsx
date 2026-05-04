"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[]
  showBackButton?: boolean
  backButtonLabel?: string
}

function Breadcrumb({
  items,
  showBackButton = false,
  backButtonLabel = "Back"
}: BreadcrumbProps) {
  const pathname = usePathname()
  const hasExplicitItems = Array.isArray(items) && items.length > 0

  const generatedItems: BreadcrumbItem[] = hasExplicitItems
    ? items!
    : (() => {
        const segments = pathname.split("/").filter(Boolean)
        return segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/")
          const label = segment
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase())
          return {
            label,
            href: index < segments.length - 1 ? href : undefined
          }
        })
      })()

  // Show back button when explicitly requested or when backButtonLabel is customized
  const shouldShowBack = showBackButton || backButtonLabel !== "Back"

  // Back href: use the last clickable item's href (the parent page)
  // Falls back to "/" when there's no parent
  const backHref = (() => {
    if (!hasExplicitItems) {
      // Auto-generated: second-to-last segment's full path, or "/"
      const segments = pathname.split("/").filter(Boolean)
      if (segments.length <= 1) return "/"
      const parentSegments = segments.slice(0, -1)
      return "/" + parentSegments.join("/")
    }
    // Explicit items: find second-to-last item with href (the parent page)
    // The last item represents the current page — skip it
    const parentItems = generatedItems.slice(0, -1).filter(i => i.href)
    if (parentItems.length > 0) {
      const last = parentItems[parentItems.length - 1];
      return last?.href ?? "/";
    }
    return "/"
  })()

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 sm:gap-4">
          {shouldShowBack && (
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors shrink-0"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              <span className="hidden sm:inline">{backButtonLabel}</span>
              <span className="sm:hidden">Back</span>
            </Link>
          )}

          <ol className="flex items-center gap-1.5 sm:gap-2 text-sm min-w-0">
            <li className="shrink-0">
              <Link
                href="/"
                className="inline-flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors"
                aria-label="Go to Home"
              >
                <Home className="w-4 h-4" />
                <span className="sr-only">Home</span>
              </Link>
            </li>

            {generatedItems.map((item, index) => (
              <li key={index} className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-300 shrink-0" />
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-slate-500 hover:text-blue-600 transition-colors truncate max-w-[100px] sm:max-w-none"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-medium text-slate-900 truncate max-w-[120px] sm:max-w-none">
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </nav>
  )
}

export { Breadcrumb, type BreadcrumbItem }
