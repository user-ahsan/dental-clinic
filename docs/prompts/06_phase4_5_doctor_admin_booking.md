# 🦷 DCMS — Part 6: Phase 4 & 5 — Doctor + Admin + Public Booking

---

## PHASE 4: Doctor Clinical Dashboard

### ORCHESTRATOR PRE-TASK

```powershell
cd d:\Projects\dental-clinic

# Install rich text editor for prescriptions + PDF generation
yarn add @tiptap/react @tiptap/starter-kit @tiptap/extension-placeholder
yarn add jspdf html2canvas
```

---

### Task 4.1 — Doctor Queue + Schedule

**Deploy:** 1 sub-agent | **Mode:** Sequential

#### Sub-Agent Prompt:

```
You are a coding sub-agent. You can ONLY create/write files. You CANNOT run terminal commands or edit config files.

PROJECT: d:\Projects\dental-clinic (Next.js 15 + Tailwind + shadcn + Supabase)

TASK: Build Doctor Active Queue and Schedule pages.

FILES TO CREATE:

1. src/app/(dashboards)/doctor/page.tsx
   - "use client" — auto-refresh every 30 seconds
   - Show ONLY checked-in patients waiting for THIS doctor
   - Each patient card: name, appointment time, reason for visit, wait time
   - "Start Consultation" button → navigates to /doctor/consultation/[appointmentId]
   - Updates appointment status to IN_CHAIR
   - Empty state: "No patients waiting — enjoy your coffee ☕"

2. src/app/(dashboards)/doctor/schedule/page.tsx
   - FullCalendar showing this doctor's appointments only
   - Day and Week views
   - Color-coded by status (same palette as receptionist calendar)
   - Read-only (doctors don't drag to reschedule)

3. src/server/queries/doctor.ts
   - getDoctorQueue(doctorUserId): appointments WHERE doctor_id=X AND status=CHECKED_IN
   - getDoctorSchedule(doctorUserId, dateRange)
   - startConsultation(appointmentId): update status to IN_CHAIR

Do NOT edit config files.
```

#### Verification Prompt:

```
ORCHESTRATOR VERIFICATION for Task 4.1:
1. npx tsc --noEmit 2>&1 | Select-Object -First 20
2. Verify doctor/page.tsx and doctor/schedule/page.tsx exist
3. If errors, deploy fix sub-agent.
```

---

### Task 4.2 — Consultation Room + Tooth Chart

**Deploy:** 1 sub-agent | **Mode:** Sequential (after 4.1)

#### Sub-Agent Prompt:

```
You are a coding sub-agent. You can ONLY create/write files. You CANNOT run terminal commands or edit config files.

PROJECT: d:\Projects\dental-clinic (Next.js 15 + Tailwind + shadcn + Supabase)

TASK: Build the core Consultation Room screen with tooth charting.

FILES TO CREATE:

1. src/app/(dashboards)/doctor/consultation/[appointmentId]/page.tsx
   - "use client"
   - Three-panel layout:
     LEFT SIDEBAR: Patient info (name, age, blood group, allergies, emergency contact) + Health Vault quick view (list recent documents, click to expand)
     CENTER: Tooth chart + treatment form
     RIGHT SIDEBAR: Clinical notes history for this patient
   - Fetch patient data from patient_profile + patient_document tables
   - "Complete Consultation" button → sets status=COMPLETED, auto-generates invoice

2. src/components/clinical/tooth-chart.tsx
   - "use client"
   - Visual SVG-based dental chart showing teeth 1-32 (universal numbering)
   - Click a tooth → highlight it, show treatment dropdown
   - Treatment dropdown: lists services from service table
   - Selected treatments shown as tags on the tooth
   - State: Map<toothNumber, { serviceId, notes }>

3. src/components/clinical/treatment-form.tsx
   - Form to add treatments to current appointment
   - Fields: selected tooth (from chart click), service (select), notes (textarea)
   - "Add Treatment" button → appends to treatment_record table
   - Running total of treatment costs displayed

4. src/server/actions/consultation.ts
   - addTreatmentRecord action
   - completeConsultation action (set appointment COMPLETED + create invoice from treatments)
   - getPatientVaultPreview(patientId): recent 5 documents

Do NOT edit config files.
```

#### Verification Prompt:

```
ORCHESTRATOR VERIFICATION for Task 4.2:
1. npx tsc --noEmit 2>&1 | Select-Object -First 20
2. Verify consultation page and tooth-chart component exist
3. If errors, deploy fix sub-agent.
```

---

### Task 4.3 — Prescription Pad + Doctor Profile

**Deploy:** 1 sub-agent | **Mode:** Sequential (after 4.2)

#### Sub-Agent Prompt:

```
You are a coding sub-agent. You can ONLY create/write files. You CANNOT run terminal commands or edit config files.

PROJECT: d:\Projects\dental-clinic (Next.js 15 + Tailwind + shadcn + Supabase + TipTap + jsPDF)

TASK: Build the Prescription Pad and Doctor Profile edit page.

FILES TO CREATE:

1. src/app/(dashboards)/doctor/prescription/new/page.tsx
   - "use client"
   - TipTap rich text editor for prescription content
   - Pre-filled template: Clinic header, patient name, date
   - Drug entry: drug name (text input), dosage, frequency, duration, notes
   - "Add Drug" button → appends to list
   - Drug list shown as table below editor
   - "Sign & Send" button:
     → Generate PDF using jsPDF (clinic header + drug table + doctor signature line)
     → Upload PDF to Supabase Storage patient-documents bucket
     → Insert patient_document record (type=PREVIOUS_PRESCRIPTION)
   - "Preview" button: show PDF preview in dialog

2. src/app/(dashboards)/doctor/profile/page.tsx
   - Edit form for doctor_profile:
     Bio (textarea), specialization, license number, years of experience
     Qualifications (dynamic list — add/remove)
     Languages spoken (multi-select or tag input)
     Consultation fee (number input)
     Working hours (day-by-day start/end time pickers)
     Social links (LinkedIn, Twitter inputs)
   - Avatar upload
   - Save via server action

3. src/server/actions/doctor.ts
   - updateDoctorProfile action
   - generatePrescriptionPDF(data): create and upload PDF

4. src/server/queries/doctor-profile.ts
   - getDoctorProfile(userId)
   - getPublicDoctorProfile(doctorId): for marketing pages

Do NOT edit config files.
```

#### Verification Prompt:

```
ORCHESTRATOR VERIFICATION for Task 4.3:
1. npx tsc --noEmit
2. Verify prescription and profile pages exist
3. Git commit: git add -A && git commit -m "feat: Phase 4 — Doctor clinical dashboard"
```

---

## PHASE 5: Admin Dashboard + Public Booking

### ORCHESTRATOR PRE-TASK

```powershell
cd d:\Projects\dental-clinic

# Install charting library for admin analytics
yarn add recharts

# Add shadcn chart component if available
npx shadcn@latest add chart 2>$null
```

---

### Task 5.1 — Admin Dashboard

**Deploy:** 2 sub-agents | **Mode:** PARALLEL

#### Sub-Agent A Prompt (Overview + Staff Management):

```
You are a coding sub-agent. You can ONLY create/write files. You CANNOT run terminal commands or edit config files.

PROJECT: d:\Projects\dental-clinic (Next.js 15 + Tailwind + shadcn + Supabase + Recharts)

TASK: Build Admin Overview and Staff Management pages.

FILES TO CREATE:

1. src/app/(dashboards)/admin/page.tsx
   - Server component: fetch analytics data
   - KPI cards: Total Revenue (this month), Total Appointments, New Patients, Active Staff
   - Charts using Recharts:
     Bar chart: monthly revenue (last 6 months)
     Line chart: appointment trends
     Pie chart: services breakdown
   - Recent activity feed

2. src/app/(dashboards)/admin/staff/page.tsx
   - "use client"
   - Tab view: "Active Staff" | "Pending Approval" | "Suspended"
   - Table: name, role (badge), email, phone, status, joined date, actions
   - Actions: Approve (for pending), Suspend, Revoke Access
   - "Pending" tab shows staff who joined via invite code awaiting approval
   - Approve action: update status PENDING→ACTIVE
   - Revoke action: update status→SUSPENDED, call supabase admin to disable user

3. src/server/actions/admin.ts
   - approveStaff action
   - suspendStaff action
   - revokeStaffAccess action

4. src/server/queries/admin.ts
   - getClinicAnalytics(clinicId)
   - getClinicStaffByStatus(clinicId, status)
   - getRevenueChart(clinicId, months)

Do NOT edit config files.
```

#### Sub-Agent B Prompt (Services + Settings + Reports):

```
You are a coding sub-agent. You can ONLY create/write files. You CANNOT run terminal commands or edit config files.

PROJECT: d:\Projects\dental-clinic (Next.js 15 + Tailwind + shadcn + Supabase)

TASK: Build Admin Service Catalog, Clinic Settings, and Financial Reports.

FILES TO CREATE:

1. src/app/(dashboards)/admin/services/page.tsx
   - CRUD table for dental services
   - Columns: Name, Price ($), Duration (min), Actions (Edit/Delete)
   - "Add Service" button → dialog with form (name, price, duration)
   - Inline edit or edit dialog
   - Delete with confirmation

2. src/app/(dashboards)/admin/settings/page.tsx
   - Clinic settings form: name, phone, email, address, logo
   - Display invite code prominently with copy button
   - "Regenerate Code" button (with warning dialog)
   - Billing information section

3. src/app/(dashboards)/admin/reports/page.tsx
   - Date range picker for report period
   - Revenue breakdown table by service type
   - Unpaid invoices list
   - Export to CSV button
   - Doctor-wise revenue split

4. src/server/actions/services.ts
   - createService, updateService, deleteService actions

5. src/server/actions/clinic-settings.ts
   - updateClinicSettings, regenerateInviteCode actions

6. src/server/queries/reports.ts
   - getRevenueByDateRange(clinicId, start, end)
   - getRevenueByService(clinicId)
   - getUnpaidInvoices(clinicId)

Do NOT edit config files.
```

#### Verification Prompt:

```
ORCHESTRATOR VERIFICATION for Task 5.1:
1. npx tsc --noEmit 2>&1 | Select-Object -First 30
2. Verify all 5 admin pages exist
3. If errors, deploy fix sub-agent.
```

---

### Task 5.2 — Public Booking Portal + Marketing Pages

**Deploy:** 2 sub-agents | **Mode:** PARALLEL

#### Sub-Agent A Prompt (Booking Flow):

```
You are a coding sub-agent. You can ONLY create/write files. You CANNOT run terminal commands or edit config files.

PROJECT: d:\Projects\dental-clinic (Next.js 15 + Tailwind + shadcn + Supabase)

TASK: Build the multi-step public booking flow.

FILES TO CREATE:

1. src/app/(marketing)/layout.tsx
   - Public layout: navbar (from components/appbar) + footer
   - No auth required

2. src/app/(marketing)/booking/page.tsx
   - Step 1: Select Service
   - Grid of service cards (fetch from service table for the clinic)
   - Click → stores selection, navigates to /booking/slot

3. src/app/(marketing)/booking/slot/page.tsx
   - "use client"
   - Step 2: Select Doctor & Time Slot
   - Doctor cards (with photo, name, specialization, fee)
   - Click doctor → show available time slots (calendar date picker + time grid)
   - Slots calculated from doctor working_hours minus existing appointments
   - Click slot → navigates to /booking/confirm

4. src/app/(marketing)/booking/confirm/page.tsx
   - Step 3: Confirm & Authenticate
   - Show summary: service, doctor, date/time, estimated price
   - If logged in: show patient info, "Confirm Booking" button
   - If NOT logged in: show login/register form inline
   - On confirm: create appointment record, redirect to patient dashboard

5. src/server/actions/booking.ts
   - getAvailableSlots(doctorId, date): compute from working_hours - booked
   - confirmBooking(data): create appointment

6. src/components/booking/booking-stepper.tsx
   - Visual step indicator (Step 1 → 2 → 3)
   - Reusable across booking pages

Do NOT edit config files.
```

#### Sub-Agent B Prompt (Marketing Pages):

```
You are a coding sub-agent. You can ONLY create/write files. You CANNOT run terminal commands or edit config files.

PROJECT: d:\Projects\dental-clinic (Next.js 15 + Tailwind + shadcn + Supabase)

TASK: Build the public marketing pages: Services, Doctors, Doctor Detail, Contact.

FILES TO CREATE:

1. src/app/(marketing)/services/page.tsx
   - Public services catalog page
   - Grid of service cards with name, description, price range, duration
   - Each card links to booking flow pre-selecting that service
   - SEO: proper metadata, h1, structured data

2. src/app/(marketing)/doctors/page.tsx
   - "Meet Our Team" page
   - Grid of doctor cards: photo, name, specialization, qualifications preview
   - Click → /doctors/[id]

3. src/app/(marketing)/doctors/[id]/page.tsx
   - Full doctor profile page
   - Photo, bio, qualifications list, languages, consultation fee
   - Available slots preview (next 3 days)
   - "Book with Dr. X" CTA button → booking flow
   - SEO: generateMetadata from doctor profile

4. src/app/(marketing)/contact/page.tsx
   - Same content as landing page contact section but as full page
   - Embedded map placeholder (div with bg-gray-200 and "Map Coming Soon")
   - Contact form with Zod validation

5. src/app/(marketing)/page.tsx
   - Move the current landing page here (Hero, About, etc.)
   - The root page.tsx should redirect to /(marketing) or re-export

Do NOT edit config files.
```

#### Verification Prompt:

```
ORCHESTRATOR VERIFICATION for Task 5.2:
1. npx tsc --noEmit
2. Verify all marketing pages exist under (marketing)/
3. Verify booking flow: /booking, /booking/slot, /booking/confirm
4. yarn build — full production build
5. Git commit: git add -A && git commit -m "feat: Phase 5 — Admin dashboard + public booking portal"
```

---

## FINAL PROJECT VERIFICATION

```
ORCHESTRATOR FINAL VERIFICATION:

1. Full build: cd d:\Projects\dental-clinic && yarn build
2. Type check: npx tsc --noEmit
3. Lint: yarn lint

4. Page inventory check (34 pages from PRD):
   - Marketing: /, /services, /doctors, /doctors/[id], /contact, /booking, /booking/slot, /booking/confirm
   - Auth: /login, /register, /register-staff, /join-clinic, /create-clinic, /forgot-password
   - Patient: /patient, /patient/vault, /patient/profile, /patient/appointments, /patient/billing
   - Receptionist: /receptionist, /receptionist/queue, /receptionist/patients/new, /receptionist/billing, /receptionist/staff
   - Doctor: /doctor, /doctor/consultation/[id], /doctor/prescription/new, /doctor/schedule, /doctor/profile
   - Admin: /admin, /admin/staff, /admin/services, /admin/settings, /admin/reports

5. No leftover agency content:
   Select-String -Path "src\**\*.tsx","src\**\*.ts" -Pattern "digital agency|hiriski|portfolio" -SimpleMatch

6. Git final commit:
   git add -A && git commit -m "feat: DCMS v1.0 — all phases complete"
```
