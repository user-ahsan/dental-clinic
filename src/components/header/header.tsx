"use client"

import React, { memo } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import HeaderNavLinks from "./header-nav-links"
import HeaderBookingButton from "./header-booking-button"
import HeaderMobileMenu from "./header-mobile-menu"

interface HeaderProps {
  className?: string
  sticky?: boolean
}

const Header: React.FC<HeaderProps> = memo(function Header({
  className,
  sticky = true,
}) {
  return (
    <header
      className={cn(
        "w-full bg-white border-b border-slate-200",
        sticky && "sticky top-0 z-40",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="SmileCare Dental - Home"
          >
            <div className="w-10 h-10 lg:w-11 lg:h-11 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-[var(--shadow-blue-sm)] group-hover:shadow-[var(--shadow-blue-md)] transition-shadow duration-200">
              <span aria-hidden="true" className="text-xl lg:text-2xl">🦷</span>
            </div>
            <span className="font-bold text-xl md:text-2xl lg:text-2xl text-slate-900 truncate max-w-44 md:max-w-48 lg:max-w-64">SmileCare</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <HeaderNavLinks />
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <HeaderBookingButton />
          </div>

          {/* Mobile Menu */}
          <HeaderMobileMenu />
        </div>
      </div>
    </header>
  )
})

export default Header