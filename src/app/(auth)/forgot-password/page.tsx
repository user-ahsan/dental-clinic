"use client"

import { useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CheckCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const supabase = createClient()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      })
      if (error) throw error
      setSuccess(true)
      toast.success("Reset link sent!")
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to send reset link"
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm max-w-md w-full text-center">
        <div className="size-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="size-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Check Your Email</h1>
        <p className="text-slate-600 mb-6">
          Check your email for reset link
        </p>
        <Link href="/login" className="inline-flex items-center justify-center gap-1.5 min-h-11 px-3 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors w-full">
          <ArrowLeft className="size-4" /> Back to Sign In
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm max-w-md w-full">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Forgot Password?</h1>
        <p className="text-slate-600">
          Enter your email address and we&apos;ll send you a reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>

        <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link href="/login" className="text-sm text-primary font-medium hover:underline inline-flex items-center gap-1">
          <ArrowLeft className="size-3" /> Back to Sign In
        </Link>
      </div>
    </div>
  )
}
