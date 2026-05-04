"use client"

import React, { memo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth.context"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/doctors", label: "Doctors" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

interface HeaderNavLinksProps {
  className?: string
  onLinkClick?: () => void
}

const HeaderNavLinks: React.FC<HeaderNavLinksProps> = memo(function HeaderNavLinks({
  className,
  onLinkClick,
}) {
  const pathname = usePathname()
  const { user } = useAuth()

  const dashboardHref =
    !user
      ? "/login"
      : user.role === "ADMIN" || user.role === "RECEPTIONIST"
        ? "/admin"
        : user.role === "DOCTOR"
          ? "/admin/doctors"
          : "/"

  return (
    <nav className={cn("flex items-center gap-2", className)} role="navigation" aria-label="Main navigation">
      {navLinks.map((link) => {
        const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onLinkClick}
            className={cn(
              "relative min-h-11 px-4 py-2.5 text-sm font-medium transition-colors duration-200 rounded-md inline-flex items-center",
              isActive
                ? "text-blue-700 bg-blue-100"
                : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {link.label}
          </Link>
        )
      })}
      <Link
        href={dashboardHref}
        onClick={onLinkClick}
        className={cn(
          "relative min-h-11 px-4 py-2.5 text-sm font-medium transition-colors duration-200 rounded-md inline-flex items-center",
          pathname.startsWith(dashboardHref) && dashboardHref !== "/"
            ? "text-blue-700 bg-blue-100"
            : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
        )}
      >
        {user ? "Dashboard" : "Login"}
      </Link>
    </nav>
  )
})

export default HeaderNavLinks