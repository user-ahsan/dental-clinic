"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { createClinicSchema, clinicAdminSchema, type CreateClinicInput, type ClinicAdminInput } from "@/lib/validators/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { ArrowLeft, ArrowRight, Check, Building2 } from "lucide-react"

type Step = "clinic" | "admin"

export default function CreateClinicPage() {
  const router = useRouter()
  const supabase = createClient();
  const [step, setStep] = useState<Step>("clinic")
  const [submitError, setSubmitError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const clinicForm = useForm<CreateClinicInput>({
    resolver: zodResolver(createClinicSchema),
    defaultValues: { clinicName: "", phone: "", city: "", state: "", country: "" },
    mode: "onBlur",
  })

  const adminForm = useForm<ClinicAdminInput>({
    resolver: zodResolver(clinicAdminSchema),
    defaultValues: { fullName: "", email: "", password: "" },
    mode: "onBlur",
  })

  const stepIndex = step === "clinic" ? 0 : 1

  const goToAdmin = async () => {
    const valid = await clinicForm.trigger(["clinicName"])
    if (valid) setStep("admin")
  }

  const onSubmit = async (adminData: ClinicAdminInput) => {
    const clinicValid = await clinicForm.trigger()
    const adminValid = await adminForm.trigger()
    if (!clinicValid || !adminValid) return

    setIsSubmitting(true)
    setSubmitError("")

    try {
      const clinicData = clinicForm.getValues()

      // 1. Sign up the admin user via Supabase Auth
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: adminData.email,
        password: adminData.password,
        options: {
          data: { full_name: adminData.fullName, role: "ADMIN" },
        },
      })
      if (signUpError) throw signUpError
      if (!authData.user) throw new Error("Failed to create admin account")

      // 2. Create clinic record
      const { data: clinic, error: clinicError } = await supabase
        .from("clinic")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .insert({
          name: clinicData.clinicName,
          owner_id: authData.user.id,
          phone: clinicData.phone ?? null,
          city: clinicData.city ?? null,
          state: clinicData.state ?? null,
          country: clinicData.country ?? null,
        } as any)
        .select("id, invite_code")
        .single()

      if (clinicError) throw clinicError

      const createdClinic = clinic as { id: string; invite_code: string }

      // 3. Link admin user to the clinic
      await supabase
        .from("app_user")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .insert({
          id: authData.user.id,
          email: adminData.email,
          role: "ADMIN",
          clinic_id: createdClinic.id,
          first_name: adminData.fullName.split(" ")[0] ?? adminData.fullName,
          last_name: adminData.fullName.split(" ").slice(1).join(" ") || "",
          status: "ACTIVE",
        } as any)

      toast.success("Clinic created! Please check your email to confirm your account.")
      router.push("/login?clinic_created=true")
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to create clinic. Please try again."
      setSubmitError(message)
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm max-w-md w-full">
      {/* Step indicator */}
      <nav aria-label="Progress" className="mb-8">
        <ol className="flex items-center gap-2">
          {(["clinic", "admin"] as const).map((s, i) => (
            <li key={s} className={cn("flex items-center gap-2", i < 1 && "flex-1")}>
              <span
                className={cn(
                  "flex items-center justify-center size-8 rounded-full text-sm font-medium border-2 transition-colors",
                  i < stepIndex
                    ? "bg-primary border-primary text-primary-foreground"
                    : i === stepIndex
                      ? "border-primary text-primary"
                      : "border-slate-200 text-slate-400"
                )}
                aria-current={i === stepIndex ? "step" : undefined}
              >
                {i < stepIndex ? <Check className="size-4" /> : i + 1}
              </span>
              <span className={cn("text-sm font-medium hidden sm:inline", i <= stepIndex ? "text-slate-900" : "text-slate-400")}>
                {s === "clinic" ? "Clinic" : "Admin"}
              </span>
              {i < 1 && <span className={cn("flex-1 h-0.5 mx-2", i < stepIndex ? "bg-primary" : "bg-slate-200")} />}
            </li>
          ))}
        </ol>
      </nav>

      <div className="mb-6 text-center">
        <div className="size-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
          <Building2 className="size-6 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Create Your Clinic</h1>
        <p className="text-slate-600">
          {step === "clinic" ? "Tell us about your clinic" : "Create your admin account"}
        </p>
      </div>

      {/* Step 1: Clinic details */}
      {step === "clinic" && (
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="clinicName">Clinic Name <span className="text-red-500">*</span></Label>
            <Controller
              name="clinicName"
              control={clinicForm.control}
              render={({ field }) => (
                <Input id="clinicName" placeholder="Smile Dental Clinic" disabled={isSubmitting} {...field} />
              )}
            />
            {clinicForm.formState.errors.clinicName && (
              <p className="text-sm text-red-600">{clinicForm.formState.errors.clinicName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Controller
              name="phone"
              control={clinicForm.control}
              render={({ field }) => (
                <Input id="phone" placeholder="+1234567890" disabled={isSubmitting} value={field.value ?? ""} onChange={field.onChange} />
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Controller
                name="city"
                control={clinicForm.control}
                render={({ field }) => (
                  <Input id="city" placeholder="New York" disabled={isSubmitting} value={field.value ?? ""} onChange={field.onChange} />
                )}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Controller
                name="state"
                control={clinicForm.control}
                render={({ field }) => (
                  <Input id="state" placeholder="NY" disabled={isSubmitting} value={field.value ?? ""} onChange={field.onChange} />
                )}
              />
            </div>
          </div>

          <Button type="button" variant="primary" className="w-full" onClick={goToAdmin}>
            Continue <ArrowRight className="size-4 ml-1" />
          </Button>
        </div>
      )}

      {/* Step 2: Admin account */}
      {step === "admin" && (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            adminForm.handleSubmit(onSubmit)(e)
          }}
          className="space-y-5"
        >
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
            <Controller
              name="fullName"
              control={adminForm.control}
              render={({ field }) => (
                <Input id="fullName" placeholder="Dr. Jane Smith" disabled={isSubmitting} {...field} />
              )}
            />
            {adminForm.formState.errors.fullName && (
              <p className="text-sm text-red-600">{adminForm.formState.errors.fullName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="adminEmail">Email <span className="text-red-500">*</span></Label>
            <Controller
              name="email"
              control={adminForm.control}
              render={({ field }) => (
                <Input id="adminEmail" type="email" placeholder="admin@clinic.com" disabled={isSubmitting} {...field} />
              )}
            />
            {adminForm.formState.errors.email && (
              <p className="text-sm text-red-600">{adminForm.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="adminPassword">Password <span className="text-red-500">*</span></Label>
            <Controller
              name="password"
              control={adminForm.control}
              render={({ field }) => (
                <Input id="adminPassword" type="password" placeholder="Min. 8 characters" disabled={isSubmitting} {...field} />
              )}
            />
            {adminForm.formState.errors.password && (
              <p className="text-sm text-red-600">{adminForm.formState.errors.password.message}</p>
            )}
          </div>

          {submitError && (
            <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md" role="alert">
              {submitError}
            </div>
          )}

          <div className="flex gap-3">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setStep("clinic")} disabled={isSubmitting}>
              <ArrowLeft className="size-4 mr-1" /> Back
            </Button>
            <Button type="submit" variant="primary" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Clinic"}
            </Button>
          </div>
        </form>
      )}

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
