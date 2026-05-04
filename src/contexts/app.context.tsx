'use client'

import React, { useMemo } from 'react'

// Theme state context - used internally by ThemeSync component
// Prefer using useTheme() from 'next-themes' for dark mode operations
type ThemeState = {
  isDark: boolean
}

type ThemeActions = {
  toggleTheme: () => void
}

export type ThemeContextValue = ThemeState & ThemeActions

export const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined
)

export const useThemeContext = (): ThemeContextValue => {
  const context = React.useContext(ThemeContext)
  if (context === undefined) {
    throw new Error(
      'useThemeContext must be used within a ThemeContextProvider'
    )
  }
  return context
}

interface ThemeContextProviderProps {
  children: React.ReactNode
  isDark: boolean
  onToggle: () => void
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({
  children,
  isDark,
  onToggle,
}) => {
  // Memoize the context value to prevent unnecessary re-renders
  // This is the key fix for Context abuse - stable reference prevents
  // all consumers from re-rendering when unrelated state changes
  const value = useMemo(
    () => ({
      isDark,
      toggleTheme: onToggle,
    }),
    [isDark, onToggle]
  )

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}
