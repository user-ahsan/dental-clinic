# 🦷 DCMS — Part 5: Phase 3 — Patient Portal + Receptionist Engine

> **Goal:** Build Patient dashboard (health vault, profile, appointments, billing) and Receptionist dashboard (calendar, queue, POS).

---

## ORCHESTRATOR PRE-TASK

```powershell
cd d:\Projects\dental-clinic

# Install calendar & drag-drop libraries
yarn add @fullcalendar/core @fullcalendar/react @fullcalendar/daygrid @fullcalendar/timegrid @fullcalendar/interaction
yarn add react-dropzone

# Add more shadcn components
npx shadcn@latest add progress breadcrumb collapsible hover-card
```

---

## Task 3.1 — Dashboard Layouts

**Deploy:** 1 sub-agent | **Mode:** Sequential (first)

### Sub-Agent Prompt:

```
You are a coding sub-agent. You can ONLY create/write files. You CANNOT run terminal commands or edit config files.

PROJECT: d:\Projects\dental-clinic (Next.js 15 + Tailwind + shadcn + Supabase)

TASK: Create shared dashboard layout components.

FILES TO CREATE:

1. src/app/(dashboards)/layout.tsx
   - Server component — check auth, fetch user, pass to client layout
   - If not authenticated → redirect to /login

2. src/components/layouts/dashboard-shell.tsx
   - "use client"
   - Sidebar + top bar layout
   - Sidebar: collapsible, role-based navigation links
   - Top bar: user avatar, clinic name, notifications bell, sign out button
   - Main content area with padding
   - Responsive: sidebar becomes Sheet on mobile

3. src/components/layouts/sidebar-nav.tsx
   - Accept role prop, render appropriate nav items:
     PATIENT: Dashboard, Health Vault, My Profile, Appointments, Billing
     RECEPTIONIST: Calendar, Queue, New Patient, Billing/POS, Staff Directory
     DOCTOR: Active Queue, My Schedule, Profile
     ADMIN: Overview, Staff, Services, Settings, Reports
   - Active route highlighting
   - Use lucide-react icons for each item

4. src/components/dashboard/page-header.tsx
   - Reusable: title, description, optional action button
   - Breadcrumb support

Do NOT edit config files.
```

### Verification Prompt:

```
ORCHESTRATOR VERIFICATION for Task 3.1:
1. npx tsc --noEmit 2>&1 | Select-Object -First 20
2. Verify layout files exist for (dashboards) route group
3. If errors, deploy fix sub-agent.
```

---

## Task 3.2 — Patient Portal Pages

**Deploy:** 2 sub-agents | **Mode:** PARALLEL

### Sub-Agent A Prompt (Dashboard + Health Vault):

```
You are a coding sub-agent. You can ONLY create/write files. You CANNOT run terminal commands or edit config files.

PROJECT: d:\Projects\dental-clinic (Next.js 15 + Tailwind + shadcn + Supabase)
CONTEXT: Dashboard layout exists. User auth helpers at src/lib/auth/. Types at src/types/database.ts.

TASK: Build Patient Dashboard and Health Vault pages.

FILES TO CREATE:

1. src/app/(dashboards)/patient/page.tsx
   - Server component: fetch upcoming appointments, recent documents
   - Cards: "Upcoming Appointments" (next 3), "Recent Documents", "Quick Actions"
   - Quick actions: Book Appointment, Upload Document, Update Profile
   - Use shadcn Card, Badge, Button

2. src/app/(dashboards)/patient/vault/page.tsx
   - "use client"
   - File manager UI for patient documents
   - Upload area using react-dropzone (drag & drop)
   - Upload to Supabase Storage "patient-documents" bucket
   - File list: grid of document cards showing title, type badge, date, preview thumbnail
   - Filter by document type (X-Ray, Lab Report, Prescription, Other)
   - Click to view/download
   - Delete button with confirmation dialog

3. src/server/queries/patient-documents.ts
   - getPatientDocuments(userId): fetch from patient_document table
   - uploadPatientDocument(file, metadata): upload to storage + insert row
   - deletePatientDocument(docId): delete from storage + table

Do NOT edit config files.
```

### Sub-Agent B Prompt (Profile + Appointments + Billing):

```
You are a coding sub-agent. You can ONLY create/write files. You CANNOT run terminal commands or edit config files.

PROJECT: d:\Projects\dental-clinic (Next.js 15 + Tailwind + shadcn + Supabase)

TASK: Build Patient Profile, Appointment History, and Billing pages.

FILES TO CREATE:

1. src/app/(dashboards)/patient/profile/page.tsx
   - Form: first name, last name, phone, DOB, blood group (select), height, weight, address, emergency contact (name + relation + phone), previous diseases (tag input), medical notes
   - Pre-fill from patient_profile table
   - Avatar upload to Supabase Storage "avatars" bucket
   - Save via server action

2. src/app/(dashboards)/patient/appointments/page.tsx
   - Table of past appointments using shadcn Table
   - Columns: Date, Doctor, Service, Status (badge), Actions
   - Click row → expand to see treatment details
   - "Reschedule" and "Cancel" buttons for future SCHEDULED appointments

3. src/app/(dashboards)/patient/billing/page.tsx
   - Table of invoices
   - Columns: Invoice #, Date, Amount, Paid, Status (badge with colors), Actions
   - Download PDF button (placeholder — generates basic receipt)

4. src/server/actions/patient.ts
   - updatePatientProfile action
   - cancelAppointment action
   - rescheduleAppointment action

5. src/server/queries/patient.ts
   - getPatientProfile(userId)
   - getPatientAppointments(userId)
   - getPatientInvoices(userId)

Do NOT edit config files.
```

### Verification Prompt:

```
ORCHESTRATOR VERIFICATION for Task 3.2:
1. npx tsc --noEmit 2>&1 | Select-Object -First 30
2. Verify all 5 patient pages exist
3. Verify server queries and actions exist
4. If errors, deploy fix sub-agent.
```

---

## Task 3.3 — Receptionist Dashboard

**Deploy:** 2 sub-agents | **Mode:** PARALLEL

### Sub-Agent A Prompt (Calendar + Queue):

```
You are a coding sub-agent. You can ONLY create/write files. You CANNOT run terminal commands or edit config files.

PROJECT: d:\Projects\dental-clinic (Next.js 15 + Tailwind + shadcn + Supabase + FullCalendar)

TASK: Build the Receptionist Calendar and Queue Management.

FILES TO CREATE:

1. src/app/(dashboards)/receptionist/page.tsx
   - "use client"
   - FullCalendar integration: Day/Week views
   - Color-coded appointment statuses:
     SCHEDULED=#3B82F6, CHECKED_IN=#F59E0B, IN_CHAIR=#8B5CF6, COMPLETED=#10B981, CANCELLED=#6B7280, NO_SHOW=#EF4444
   - Click event → popover with appointment details + action buttons
   - Click empty slot → quick-create appointment dialog
   - Drag-and-drop to reschedule (using FullCalendar interaction plugin)

2. src/app/(dashboards)/receptionist/queue/page.tsx
   - Today's appointments in Kanban-style columns: Scheduled → Checked In → In Chair → Completed
   - Each card: patient name, time, doctor, service
   - "Check-In" button moves from Scheduled → Checked In
   - Visual indicators for running late

3. src/server/queries/appointments.ts
   - getClinicAppointments(clinicId, dateRange)
   - getToday​Queue(clinicId)
   - updateAppointmentStatus(appointmentId, status)

4. src/server/actions/appointments.ts
   - createAppointment action
   - rescheduleAppointment action (drag-drop)
   - checkInPatient action

Do NOT edit config files.
```

### Sub-Agent B Prompt (New Patient + POS + Staff Directory):

```
You are a coding sub-agent. You can ONLY create/write files. You CANNOT run terminal commands or edit config files.

PROJECT: d:\Projects\dental-clinic (Next.js 15 + Tailwind + shadcn + Supabase)

TASK: Build walk-in patient registration, POS billing, and staff directory.

FILES TO CREATE:

1. src/app/(dashboards)/receptionist/patients/new/page.tsx
   - Quick registration form for walk-in patients
   - Fields: firstName, lastName, email (optional), phone, reason for visit
   - Auto-creates: Supabase auth user + app_user + patient_profile + emergency appointment
   - Success: shows the patient's queue position

2. src/app/(dashboards)/receptionist/billing/page.tsx
   - List pending invoices (from completed consultations)
   - Click invoice → payment form:
     Show line items (treatments), subtotal, tax, total
     Payment method: Cash / Card / Split
     For split: two amount inputs
     "Apply Discount" field (percentage or fixed)
     "Record Payment" button → update invoice status
     "Print Receipt" button (placeholder)

3. src/app/(dashboards)/receptionist/staff/page.tsx
   - Table: doctors on shift today
   - Columns: Name, Specialization, Status (Available/Busy/Off), Current Patient
   - Pull from app_user + doctor_profile where clinicId matches

4. src/server/actions/billing.ts
   - recordPayment action (update invoice paid_amount and status)
   - applyDiscount action

5. src/server/queries/staff.ts
   - getClinicStaff(clinicId)
   - getDoctorsOnShift(clinicId, date)

Do NOT edit config files.
```

### Verification Prompt:

```
ORCHESTRATOR VERIFICATION for Task 3.3:
1. npx tsc --noEmit 2>&1 | Select-Object -First 30
2. Verify all receptionist pages exist (5 pages)
3. Verify FullCalendar renders without errors: yarn dev
4. Git commit: git add -A && git commit -m "feat: Phase 3 — Patient portal + Receptionist engine"
```
