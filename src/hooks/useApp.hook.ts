'use client'

import { useContext } from 'react'
import { ThemeContext, type ThemeContextValue } from '@/contexts/app.context'

export const useApp = (): ThemeContextValue => {
  const appState = useContext(ThemeContext)
  if (appState === undefined) {
    throw new Error('useApp must be used within a ThemeContextProvider')
  }
  return appState
}
