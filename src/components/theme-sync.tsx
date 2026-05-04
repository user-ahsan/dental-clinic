'use client'

import { useTheme } from 'next-themes'
import { useCallback, useEffect, useState } from 'react'
import { ThemeContextProvider } from '@/contexts'

interface ThemeSyncProps {
  children: React.ReactNode
}

/**
 * ThemeSync bridges next-themes with the local ThemeContext.
 * It syncs the theme state and only re-renders when theme actually changes.
 * This component should be placed high in the tree (near layout) but
 * doesn't need to wrap the entire app - only the parts that need theme context.
 */
export default function ThemeSync({ children }: ThemeSyncProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // Determine if we're in dark mode based on resolved theme
  const isDark = mounted
    ? resolvedTheme === 'dark'
    : false

  const handleToggle = useCallback(() => {
    setTheme(isDark ? 'light' : 'dark')
  }, [isDark, setTheme])

  // Don't render children until mounted to avoid hydration mismatch
  // But keep the structure stable once mounted
  return (
    <ThemeContextProvider isDark={isDark} onToggle={handleToggle}>
      {children}
    </ThemeContextProvider>
  )
}