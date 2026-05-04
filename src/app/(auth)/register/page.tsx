"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { registerPatientSchema, type RegisterPatientInput } from "@/lib/validators/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"

type Step = "account" | "role"

const steps: { key: Step; label: string }[] = [
  { key: "account", label: "Account" },
  { key: "role", label: "Role" },
]

const roles = [
  { value: "PATIENT" as const, label: "Patient", desc: "Book appointments and manage your dental care" },
  { value: "ADMIN" as const, label: "Clinic Admin", desc: "Manage a dental clinic, staff, and patients" },
]

export default function RegisterPage() {
  const router = useRouter()
  const supabase = createClient()
  const [step, setStep] = useState<Step>("account")
  const [submitError, setSubmitError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<RegisterPatientInput>({
    // @ts-expect-error Zod v4 resolver type mismatch with react-hook-form
    resolver: zodResolver(registerPatientSchema),
    defaultValues: { fullName: "", email: "", password: "", confirmPassword: "", role: "PATIENT" },
    mode: "onBlur",
  })

  const { handleSubmit, control, trigger, formState: { errors } } = form

  const goToStep = async (next: Step, fields: (keyof RegisterPatientInput)[]) => {
    const valid = await trigger(fields)
    if (valid) setStep(next)
  }

  const onSubmit = async (data: RegisterPatientInput) => {
    setIsSubmitting(true)
    setSubmitError("")

    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: { full_name: data.fullName, role: data.role },
        },
      })

      if (error) throw error

      toast.success("Account created! Please check your email to confirm.")
      router.push("/login?registered=true")
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Registration failed. Please try again."
      setSubmitError(message)
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentStepIndex = steps.findIndex((s) => s.key === step)

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm max-w-md w-full">
      {/* Step indicator */}
      <nav aria-label="Progress" className="mb-8">
        <ol className="flex items-center gap-2">
          {steps.map((s, i) => (
            <li key={s.key} className={cn("flex items-center gap-2", i < steps.length - 1 && "flex-1")}>
              <span
                className={cn(
                  "flex items-center justify-center size-8 rounded-full text-sm font-medium border-2 transition-colors",
                  i < currentStepIndex
                    ? "bg-primary border-primary text-primary-foreground"
                    : i === currentStepIndex
                      ? "border-primary text-primary"
                      : "border-slate-200 text-slate-400"
                )}
                aria-current={i === currentStepIndex ? "step" : undefined}
              >
                {i < currentStepIndex ? <Check className="size-4" /> : i + 1}
              </span>
              <span className={cn("text-sm font-medium hidden sm:inline", i <= currentStepIndex ? "text-slate-900" : "text-slate-400")}>
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <span className={cn("flex-1 h-0.5 mx-2", i < currentStepIndex ? "bg-primary" : "bg-slate-200")} />
              )}
            </li>
          ))}
        </ol>
      </nav>

      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Create Account</h1>
        <p className="text-slate-600">
          {step === "account" ? "Enter your details to get started" : "Choose your role"}
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          handleSubmit(onSubmit as any)(e)
        }}
        className="space-y-5"
      >
        {step === "account" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <Input id="fullName" placeholder="John Doe" disabled={isSubmitting} {...field} />
                )}
              />
              {errors.fullName && <p className="text-sm text-red-600">{errors.fullName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input id="email" type="email" placeholder="john@example.com" disabled={isSubmitting} {...field} />
                )}
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input id="password" type="password" placeholder="Min. 8 characters" disabled={isSubmitting} {...field} />
                )}
              />
              {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <Input id="confirmPassword" type="password" placeholder="Re-enter password" disabled={isSubmitting} {...field} />
                )}
              />
              {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>}
            </div>

            <Button
              type="button"
              variant="primary"
              className="w-full"
              onClick={() => goToStep("role", ["fullName", "email", "password", "confirmPassword"])}
            >
              Continue <ArrowRight className="size-4 ml-1" />
            </Button>
          </>
        )}

        {step === "role" && (
          <>
            <fieldset className="space-y-3">
              <legend className="sr-only">Choose your role</legend>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <>
                    {roles.map((r) => (
                      <label
                        key={r.value}
                        className={cn(
                          "flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors",
                          field.value === r.value
                            ? "border-primary bg-blue-50"
                            : "border-slate-200 hover:border-slate-300"
                        )}
                      >
                        <input
                          type="radio"
                          className="mt-0.5 accent-primary"
                          checked={field.value === r.value}
                          onChange={() => field.onChange(r.value)}
                          disabled={isSubmitting}
                        />
                        <div>
                          <p className="font-medium text-slate-900">{r.label}</p>
                          <p className="text-sm text-slate-600">{r.desc}</p>
                        </div>
                      </label>
                    ))}
                  </>
                )}
              />
            </fieldset>

            {errors.role && <p className="text-sm text-red-600">{errors.role.message}</p>}

            {submitError && (
              <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md" role="alert">
                {submitError}
              </div>
            )}

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setStep("account")}
                disabled={isSubmitting}
              >
                <ArrowLeft className="size-4 mr-1" /> Back
              </Button>
              <Button type="submit" variant="primary" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Account"}
              </Button>
            </div>
          </>
        )}
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-slate-600">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
