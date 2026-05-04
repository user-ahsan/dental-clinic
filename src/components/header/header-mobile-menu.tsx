"use client"

import React, { memo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import HeaderBookingButton from "./header-booking-button"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/doctors", label: "Doctors" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

interface HeaderMobileMenuProps {
  className?: string
}

const HeaderMobileMenu: React.FC<HeaderMobileMenuProps> = memo(function HeaderMobileMenu({
  className,
}) {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <div className={cn("lg:hidden", className)}>
      <Sheet open={open} onOpenChange={setOpen}>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          onClick={() => setOpen(!open)}
        >
          <Menu className="size-5" />
        </Button>

        <SheetContent side="right" className="w-[90vw] sm:w-80 p-0">
          <div className="flex flex-col h-full">
            {/* Mobile Logo */}
            <div className="flex items-center justify-between p-6 pb-4">
              <div className="flex items-center gap-2">
                <span aria-hidden="true" className="text-2xl">🦷</span>
                <span className="font-bold text-xl truncate max-w-44">SmileCare</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X className="size-5" />
              </Button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex flex-col gap-1 px-4" role="navigation" aria-label="Mobile navigation">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "min-h-11 px-4 py-3 text-base font-medium rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none inline-flex items-center",
                      "hover:bg-gray-100 dark:hover:bg-gray-800",
                      isActive
                        ? "text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-950"
                        : "text-gray-700 dark:text-gray-300"
                    )}
                    aria-current={isActive ? "page" : undefined}
                    aria-label={link.label}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            {/* Mobile CTA */}
            <div className="mt-auto p-6 pt-4">
              <Link href="/booking" className="block" onClick={() => setOpen(false)}>
                <HeaderBookingButton className="w-full" />
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
})

export default HeaderMobileMenu