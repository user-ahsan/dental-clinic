"use client"

export const dynamic = 'force-dynamic'

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/auth.context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { checkRateLimit } from "@/lib/rate-limit"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, login, loading } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [rateLimitBlocked, setRateLimitBlocked] = useState(false)

  // Show success toasts for redirects from registration flows
  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      toast.success("Account created! Please check your email to verify.")
    }
    if (searchParams.get("clinic_created") === "true") {
      toast.success("Clinic created! Check your email to verify your admin account.")
    }
    if (searchParams.get("reset") === "true") {
      toast.success("Password reset successful! You can now sign in.")
    }
  }, [searchParams])

  // Redirect if already logged in
  useEffect(() => {
    if (!user) return
    const redirectPath =
      user.role === "ADMIN"
        ? "/admin"
        : user.role === "DOCTOR"
          ? "/admin/doctors"
          : user.role === "RECEPTIONIST"
            ? "/admin"
            : "/"
    router.push(redirectPath)
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Rate-limit: max 5 failed attempts per 15 minutes per email
    const rateKey = `login:${email || 'unknown'}`
    const { allowed, remaining } = checkRateLimit(rateKey, 5, 15 * 60 * 1000)

    if (!allowed) {
      setRateLimitBlocked(true)
      setError("Too many login attempts. Please wait 15 minutes before trying again.")
      return
    }

    setIsSubmitting(true)

    try {
      await login(email, password)
      // Rate limiter window resets automatically on next attempt since
      // only failed attempts increment the counter
      setRateLimitBlocked(false)
    } catch {
      toast.error("Invalid credentials. Please try again.")
      // Show remaining attempts feedback
      if (remaining <= 2) {
        setError(`Invalid credentials. ${remaining > 0 ? `${remaining} attempt${remaining === 1 ? '' : 's'} remaining.` : 'Too many attempts.'}`)
      } else {
        setError("Invalid credentials. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm max-w-md w-full transition-shadow duration-200">
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h1>
          <p className="text-slate-600">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-slate-700">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-slate-700">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isSubmitting}
              className="w-full"
            />
          </div>

          {/* Forgot password link */}
          <div className="text-right">
            <Link href="/forgot-password" className="text-sm text-primary font-medium hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Reserve space for error message to prevent CLS */}
          <div
            className={`text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md transition-all duration-200 ${
              error ? "opacity-100 max-h-20 mb-0" : "opacity-0 max-h-0 mb-0 overflow-hidden p-0 border-0"
            }`}
            aria-live="polite"
            role="alert"
          >
            {error || "\u00A0"}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || loading || rateLimitBlocked}
          >
            {isSubmitting || loading ? "Signing in..." : rateLimitBlocked ? "Too Many Attempts" : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary font-medium hover:underline">
              Register
            </Link>
          </p>
          <p className="text-sm text-slate-600">
            <Link href="/booking" className="text-primary font-medium hover:underline">
              Book an appointment
            </Link>
          </p>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500 text-center">
              Demo: use any email/password to login as patient
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
