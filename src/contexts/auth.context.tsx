"use client"

import React, { createContext, useContext, useState, useCallback, useMemo, useEffect, type ReactNode } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

export type UserRole = 'PATIENT' | 'ADMIN' | 'DOCTOR' | 'RECEPTIONIST'

export interface AuthUser {
  id: string
  email: string
  name: string
  role: UserRole
}

interface AuthContextValue {
  user: AuthUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  getRole: () => UserRole | null
}

const AuthContext = createContext<AuthContextValue | null>(null)

/**
 * Brute-force prevention: tracks consecutive login failures per email
 * and enforces a growing cooldown delay.
 */
const loginFailureMap = new Map<string, { count: number; lastAttempt: number }>()
const COOLDOWN_THRESHOLD = 5
const BASE_COOLDOWN_MS = 5_000 // 5 seconds base, grows with failures

/** Periodically clear stale entries to prevent memory leaks */
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of loginFailureMap) {
      // Clear entries older than 30 minutes
      if (now - entry.lastAttempt > 30 * 60_000) {
        loginFailureMap.delete(key)
      }
    }
  }, 120_000)
}

/**
 * Maps a Supabase User to our application AuthUser type.
 * Reads role from app_metadata or user_metadata.
 */
function mapSupabaseUser(supabaseUser: User | null): AuthUser | null {
  if (!supabaseUser?.email) return null

  const role = (supabaseUser.app_metadata?.role as UserRole) ??
               (supabaseUser.user_metadata?.role as UserRole) ??
               'PATIENT'

  const name = supabaseUser.user_metadata?.full_name as string ??
               supabaseUser.user_metadata?.name as string ??
               supabaseUser.email.split('@')[0] ??
               'User'

  return {
    id: supabaseUser.id,
    email: supabaseUser.email,
    name,
    role,
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const supabase = createClient()
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  // Hydrate user from Supabase session on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { user: supabaseUser } } = await supabase.auth.getUser()
        setUser(mapSupabaseUser(supabaseUser))
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    initAuth()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(mapSupabaseUser(session?.user ?? null))
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase])

  const login = useCallback(async (email: string, password: string) => {
    // Brute-force prevention cooldown
    const normalizedEmail = email.toLowerCase().trim()
    const now = Date.now()
    const failureEntry = loginFailureMap.get(normalizedEmail)

    if (failureEntry) {
      const excessFailures = failureEntry.count - COOLDOWN_THRESHOLD
      if (excessFailures >= 0) {
        // Growing cooldown: 5s base, +5s per excess failure (capped at 60s)
        const cooldownMs = Math.min(BASE_COOLDOWN_MS + excessFailures * 5_000, 60_000)
        const elapsed = now - failureEntry.lastAttempt
        if (elapsed < cooldownMs) {
          const waitSeconds = Math.ceil((cooldownMs - elapsed) / 1000)
          throw new Error(`Too many login attempts. Please wait ${waitSeconds} second${waitSeconds === 1 ? '' : 's'}.`)
        }
      }
    }

    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    
    if (error) {
      // Track failure
      const current = loginFailureMap.get(normalizedEmail) ?? { count: 0, lastAttempt: 0 }
      loginFailureMap.set(normalizedEmail, { count: current.count + 1, lastAttempt: Date.now() })
      setLoading(false)
      throw new Error(error.message)
    }

    // Success: clear failure tracking
    loginFailureMap.delete(normalizedEmail)
    // onAuthStateChange will update user state
    setLoading(false)
  }, [supabase])

  const logout = useCallback(async () => {
    await supabase.auth.signOut()
    setUser(null)
  }, [supabase])

  const getRole = useCallback(() => user?.role ?? null, [user])

  // Memoize context value to prevent re-renders of all consumers when unrelated state changes.
  const value = useMemo(
    () => ({ user, loading, login, logout, getRole }),
    [user, loading, login, logout, getRole]
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}
