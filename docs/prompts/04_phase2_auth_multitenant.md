# 🦷 DCMS — Part 4: Phase 2 — Auth + Multi-Tenant Core

> **Goal:** Implement Supabase Auth, role-based registration, clinic creation, invite codes, staff approval, and protected route middleware.

---

## ORCHESTRATOR PRE-TASK

```powershell
cd d:\Projects\dental-clinic

# Install auth-related UI components if not already installed
npx shadcn@latest add form checkbox radio-group switch alert sonner

# Ensure middleware file location is ready
# (no directory creation needed — middleware.ts goes in src/)
```

---

## Task 2.1 — Auth Pages (Login + Register)

**Deploy:** 2 sub-agents | **Mode:** PARALLEL

### Sub-Agent A Prompt (Login + Forgot Password):

```
You are a coding sub-agent. You can ONLY create/write files. You CANNOT run terminal commands or edit config files.

PROJECT: d:\Projects\dental-clinic (Next.js 15 + Tailwind + shadcn + Supabase)
CONTEXT: Supabase client exists at src/lib/supabase/client.ts and server.ts. Zod schemas at src/lib/validators/auth.ts. shadcn form components installed.

TASK: Build Login and Forgot Password pages.

FILES TO CREATE:

1. src/app/(auth)/layout.tsx
   - Centered layout: flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-green-50
   - Left side: decorative dental branding panel (hidden on mobile)
   - Right side: {children} in a card

2. src/app/(auth)/login/page.tsx
   - "use client"
   - Form with: email (Input), password (Input type=password)
   - Use react-hook-form + zodResolver with loginSchema
   - On submit: call supabase.auth.signInWithPassword()
   - On success: redirect based on user role (fetch from app_user table)
   - Links: "Forgot password?", "New patient? Register here", "Staff? Register here"
   - Error display using shadcn Alert
   - Loading state on button

3. src/app/(auth)/forgot-password/page.tsx
   - Email input form
   - Call supabase.auth.resetPasswordForEmail()
   - Success message: "Check your email for reset instructions"

4. src/server/actions/auth.ts
   - "use server"
   - signIn action: validate with Zod, create server supabase client, signInWithPassword, return result
   - signOut action: sign out and redirect to /
   - resetPassword action: send reset email

Do NOT edit config files.
```

### Sub-Agent B Prompt (Patient Register + Staff Register):

```
You are a coding sub-agent. You can ONLY create/write files. You CANNOT run terminal commands or edit config files.

PROJECT: d:\Projects\dental-clinic (Next.js 15 + Tailwind + shadcn + Supabase)

TASK: Build Patient Registration and Staff Registration pages.

FILES TO CREATE:

1. src/app/(auth)/register/page.tsx
   - Patient registration form: firstName, lastName, email, phone, password, confirmPassword
   - Use react-hook-form + zodResolver with registerSchema
   - On submit server action: supabase.auth.signUp() → insert into app_user (role=PATIENT, status=ACTIVE) → insert empty patient_profile
   - Redirect to /patient dashboard on success
   - Link: "Already have an account? Login"

2. src/app/(auth)/register-staff/page.tsx
   - Staff registration form: firstName, lastName, email, phone, password, role (select: DOCTOR or RECEPTIONIST)
   - After registration, show prompt: "Do you have a clinic invite code?"
   - If yes → redirect to /join-clinic
   - If no → show message "Contact your clinic admin for an invite code"

3. src/server/actions/register.ts
   - "use server"
   - registerPatient action: sign up via Supabase Auth, insert app_user, insert patient_profile
   - registerStaff action: sign up via Supabase Auth, insert app_user with status=PENDING_APPROVAL

Do NOT edit config files.
```

### Verification Prompt:

```
ORCHESTRATOR VERIFICATION for Task 2.1:

1. Run: cd d:\Projects\dental-clinic && npx tsc --noEmit 2>&1 | Select-Object -First 30
2. Verify pages exist: (auth)/login/page.tsx, (auth)/register/page.tsx, (auth)/register-staff/page.tsx, (auth)/forgot-password/page.tsx
3. Verify server actions exist in src/server/actions/
4. If errors, deploy fix sub-agent.
```

---

## Task 2.2 — Clinic Creation + Join Clinic

**Deploy:** 1 sub-agent | **Mode:** Sequential (after 2.1)

### Sub-Agent Prompt:

```
You are a coding sub-agent. You can ONLY create/write files. You CANNOT run terminal commands or edit config files.

PROJECT: d:\Projects\dental-clinic (Next.js 15 + Tailwind + shadcn + Supabase)

TASK: Build the Create Clinic and Join Clinic flows.

FILES TO CREATE:

1. src/app/(auth)/create-clinic/page.tsx
   - Multi-step form (use useState for step tracking):
     Step 1: Clinic name, phone, email
     Step 2: Address (street, city, state, zip)
     Step 3: Logo upload (file input — upload to Supabase Storage clinic-assets bucket)
   - On submit server action: insert clinic row, update current user's clinicId and role=ADMIN
   - Show generated invite code on success screen (styled prominently)
   - Copy-to-clipboard button for the code

2. src/app/(auth)/join-clinic/page.tsx
   - Single input: "Enter Clinic Invite Code" (e.g., DENT-X9Y2A)
   - On submit: query clinic table by invite_code
   - If found: update user's clinicId, set status=PENDING_APPROVAL
   - Show: "You've been added to [Clinic Name]. Awaiting admin approval."
   - If not found: error message

3. src/server/actions/clinic.ts
   - "use server"
   - createClinic action: generate unique invite code (format: XXXX-XXXXX), insert clinic, update user
   - joinClinic action: validate code, link user to clinic
   - generateInviteCode helper: random alphanumeric string

4. src/lib/utils/invite-code.ts
   - Function to generate random invite codes: PREFIX-XXXXX format
   - Function to validate invite code format

Do NOT edit config files.
```

### Verification Prompt:

```
ORCHESTRATOR VERIFICATION for Task 2.2:

1. Run: npx tsc --noEmit 2>&1 | Select-Object -First 30
2. Verify create-clinic and join-clinic pages exist
3. Verify server/actions/clinic.ts has createClinic and joinClinic
4. If errors, deploy fix sub-agent.
```

---

## Task 2.3 — Middleware + Route Protection

**Deploy:** 1 sub-agent | **Mode:** Sequential (after 2.2)

### Sub-Agent Prompt:

```
You are a coding sub-agent. You can ONLY create/write files. You CANNOT run terminal commands or edit config files.

PROJECT: d:\Projects\dental-clinic (Next.js 15 + Tailwind + shadcn + Supabase)

TASK: Create the auth middleware and route protection logic.

FILES TO CREATE:

1. src/middleware.ts
   - Import { createServerClient } from "@supabase/ssr"
   - Refresh auth session on every request
   - Define route groups:
     PUBLIC: /, /services, /doctors, /doctors/*, /contact, /booking, /booking/*
     AUTH_ONLY: /login, /register, /register-staff, /join-clinic, /create-clinic, /forgot-password
     PROTECTED: /patient/*, /receptionist/*, /doctor/*, /admin/*
   - Logic:
     - If user is authenticated and visits AUTH_ONLY → redirect to their dashboard
     - If user is NOT authenticated and visits PROTECTED → redirect to /login
     - If user visits wrong dashboard for their role → redirect to correct one
   - Use matcher config to exclude static assets

2. src/lib/auth/get-user.ts
   - Helper: getCurrentUser() — returns user + role from app_user table
   - Helper: requireAuth() — throws redirect if not authenticated
   - Helper: requireRole(role) — throws redirect if wrong role

3. src/lib/auth/redirect-by-role.ts
   - Function: getDashboardByRole(role: UserRole): string
     ADMIN → /admin
     DOCTOR → /doctor
     RECEPTIONIST → /receptionist
     PATIENT → /patient

Do NOT edit config files (next.config.ts, etc).
```

### Verification Prompt:

```
ORCHESTRATOR VERIFICATION for Task 2.3:

1. Run: npx tsc --noEmit
2. Verify src/middleware.ts exists and has route protection logic
3. Verify lib/auth/ helpers exist
4. yarn build — ensure middleware compiles
5. Git commit: git add -A && git commit -m "feat: Phase 2 — Auth + multi-tenant + middleware"
```
