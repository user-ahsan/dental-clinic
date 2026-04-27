# 🦷 DCMS — Part 3: Phase 1 — UI Migration + Supabase Init

> **Goal:** Migrate from MUI + Emotion to Tailwind CSS + shadcn/ui. Initialize Supabase backend with full schema.

---

## ORCHESTRATOR PRE-TASK: Package Installation

> [!IMPORTANT]
> Only the orchestrator runs these commands. Sub-agents NEVER run install commands.

```powershell
cd d:\Projects\dental-clinic

# Step 1: Remove MUI + Emotion packages
yarn remove @mui/material @mui/material-nextjs @emotion/cache @emotion/react @emotion/server @emotion/styled @svgr/webpack

# Step 2: Install Tailwind CSS v4 + PostCSS
yarn add -D tailwindcss @tailwindcss/postcss postcss autoprefixer

# Step 3: Initialize Tailwind config
npx tailwindcss init -p

# Step 4: Install shadcn/ui CLI and initialize
npx shadcn@latest init -y

# Step 5: Install core shadcn components
npx shadcn@latest add button card input label select textarea dialog sheet dropdown-menu avatar badge separator tabs table calendar popover command navigation-menu scroll-area skeleton toast tooltip

# Step 6: Install additional dependencies from PRD
yarn add @tanstack/react-query react-hook-form zod @hookform/resolvers
yarn add @supabase/supabase-js @supabase/ssr
yarn add date-fns lucide-react clsx tailwind-merge class-variance-authority

# Step 7: Install Supabase CLI globally
npm install -g supabase

# Step 8: Initialize Supabase in the project
cd d:\Projects\dental-clinic
npx supabase init
```

> [!WARNING]
> After these installations, the orchestrator must NOT edit `tailwind.config.ts`, `postcss.config.js`, `next.config.ts`, or `tsconfig.json`. The shadcn init handles config automatically.

---

## Task 1.1 — Remove MUI, Setup Tailwind Foundation

**Deploy:** 1 sub-agent | **Mode:** Sequential (first)

### Sub-Agent Prompt:

```
You are a coding sub-agent. You can ONLY create/write files. You CANNOT run terminal commands or edit config files (next.config.ts, tsconfig.json, package.json, tailwind.config.ts, postcss.config.js, components.json).

PROJECT: d:\Projects\dental-clinic (Next.js 15 + TypeScript)
CONTEXT: MUI has been uninstalled. Tailwind CSS + shadcn/ui have been installed by the orchestrator. shadcn components are in src/components/ui/.

TASK: Remove all MUI references and set up the Tailwind-based foundation.

FILES TO MODIFY/CREATE:

1. src/app/globals.css
   - Replace all content with Tailwind directives + dental CSS custom properties:
     @tailwind base; @tailwind components; @tailwind utilities;
   - Add :root CSS variables for dental color palette:
     --background, --foreground, --primary (#2563EB), --primary-foreground (#FFFFFF),
     --accent (#10B981), --accent-foreground, --muted, --muted-foreground,
     --destructive (#EF4444), --border, --ring, --radius
   - Add .dark class variables
   - Add base body styles with the Plus Jakarta Sans font

2. src/app/layout.tsx
   - Remove ALL MUI imports (AppRouterCacheProvider, MuiThemeProvider)
   - Remove the plugins/@mui import
   - Remove AppContextProvider if it only handled dark mode
   - Keep Plus_Jakarta_Sans font import
   - Import globals.css
   - Simple layout: html > body > {children}
   - Add a cn() utility class on body
   - Import and use a new Providers component (create it)

3. CREATE src/lib/utils.ts
   - Export cn() function using clsx + tailwind-merge:
     import { clsx, type ClassValue } from "clsx"
     import { twMerge } from "tailwind-merge"
     export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }

4. CREATE src/components/providers.tsx
   - "use client"
   - Wrap children with QueryClientProvider from @tanstack/react-query
   - Export as default

5. DELETE (by creating empty re-exports or gutting):
   - src/plugins/@mui/ — create an empty index.ts
   - src/theme.ts — export empty object
   - src/configs/theme.config.ts — export empty object
   - src/contexts/app.context.tsx — remove MUI theme toggle, keep minimal context

Do NOT edit any config files. Do NOT run commands.
```

### Verification Prompt:

```
ORCHESTRATOR VERIFICATION for Task 1.1:

1. Run: cd d:\Projects\dental-clinic && npx tsc --noEmit 2>&1 | Select-Object -First 30
2. Verify no MUI imports exist: Select-String -Path "src\**\*.tsx","src\**\*.ts" -Pattern "@mui" -SimpleMatch
3. Run: yarn build 2>&1 | Select-Object -Last 20
4. If TypeScript errors from MUI removal, deploy fix sub-agent with errors.
```

---

## Task 1.2 — Rebuild Landing Page Components with Tailwind

**Deploy:** 2 sub-agents | **Mode:** PARALLEL

### Sub-Agent A Prompt (Hero + About + Motivation):

```
You are a coding sub-agent. You can ONLY create/write files. You CANNOT run terminal commands or edit config files.

PROJECT: d:\Projects\dental-clinic (Next.js 15 + Tailwind CSS + shadcn/ui)
CONTEXT: MUI has been fully removed. Use Tailwind CSS classes + shadcn Button component. Import { Button } from "@/components/ui/button". Import { cn } from "@/lib/utils".

TASK: Rebuild the Hero, About, and Motivation sections using Tailwind CSS.

FILES TO CREATE/OVERWRITE:

1. src/app/_components/home-hero.tsx
   - Full-width hero with gradient background (dental blue/green)
   - "use client" for animations
   - Use framer-motion for entrance animations (it's still installed)
   - Heading: "Your Smile, Our Passion" (text-5xl font-bold)
   - Subheading with stats
   - Two CTA buttons using shadcn Button: "Book Appointment" (default) + "View Services" (outline)
   - Decorative gradient circles/blobs for visual appeal
   - Responsive: stack on mobile, side-by-side on lg

2. src/app/_components/home-about.tsx
   - Section: "Why Choose SmileCare?"
   - 4 feature cards in a grid (responsive 1-2-4 columns)
   - Each card: icon (use lucide-react icons like Shield, Heart, Cpu, Award), title, description
   - Stats row: "10,000+ Happy Patients" | "15+ Dentists" | "98% Satisfaction"
   - Use framer-motion for scroll-triggered animations
   - Tailwind classes only, no MUI

3. src/app/_components/home-our-motivation.tsx
   - Section: "Our Commitment to Your Smile"
   - Two-column layout: text left, decorative right
   - Content about pain-free dentistry, modern techniques
   - Use Tailwind prose classes for rich text
   - Framer-motion fade-in animations

DELETE the old src/app/_components/home-hero/ directory contents and replace with a single home-hero.tsx.

Do NOT edit config files.
```

### Sub-Agent B Prompt (Services + CTA + Contact):

```
You are a coding sub-agent. You can ONLY create/write files. You CANNOT run terminal commands or edit config files.

PROJECT: d:\Projects\dental-clinic (Next.js 15 + Tailwind CSS + shadcn/ui)
CONTEXT: Use Tailwind CSS + shadcn components. Import { Button } from "@/components/ui/button", { Card } from "@/components/ui/card", { Input } from "@/components/ui/input", etc.

TASK: Rebuild Services, CTA, and Contact sections with Tailwind + shadcn.

FILES TO CREATE/OVERWRITE:

1. src/app/_components/home-services.tsx
   - Section title: "Our Dental Services"
   - Import services from "@/constants/service"
   - Display in responsive grid using shadcn Card components
   - Each card: SVG icon, service title, description, "Learn More" link
   - Hover effects with Tailwind (hover:shadow-lg, hover:-translate-y-1, transition)
   - Use framer-motion stagger animations

2. src/app/_components/home-cta.tsx
   - Full-width banner with gradient bg (blue-600 to blue-800)
   - "Ready for a Healthier Smile?"
   - shadcn Button: "Book Now — It's Easy" (large, white/outline variant)
   - Framer-motion scale animation on scroll

3. src/app/_components/home-contact.tsx
   - Two-column: contact info left, form right
   - Left: clinic name, address, phone, email, hours (use lucide-react MapPin, Phone, Mail, Clock icons)
   - Right: shadcn Input fields (Name, Email, Phone) + Textarea (Reason for Visit) + Button (Send Message)
   - Tailwind grid, responsive stacking

Do NOT edit config files.
```

### Verification Prompt:

```
ORCHESTRATOR VERIFICATION for Task 1.2:

1. Run: cd d:\Projects\dental-clinic && npx tsc --noEmit 2>&1 | Select-Object -First 30
2. Verify no MUI imports remain in _components/
3. Run: yarn dev — check localhost:3000 renders all sections
4. If errors, deploy fix sub-agent.
```

---

## Task 1.3 — Rebuild AppBar + Footer with Tailwind

**Deploy:** 1 sub-agent | **Mode:** Sequential (after 1.2)

### Sub-Agent Prompt:

```
You are a coding sub-agent. You can ONLY create/write files. You CANNOT run terminal commands or edit config files.

PROJECT: d:\Projects\dental-clinic (Next.js 15 + Tailwind CSS + shadcn/ui)

TASK: Rebuild the navigation bar and footer using Tailwind + shadcn.

FILES TO CREATE/OVERWRITE:

1. src/components/appbar/app-bar.tsx
   - "use client"
   - Sticky top navbar with backdrop-blur-md bg-white/80 dark:bg-gray-900/80
   - Left: "🦷 SmileCare" logo text (font-bold text-xl text-blue-600)
   - Center: navigation links from src/constants/menus.tsx (companyMenus)
   - Right: shadcn Button "Book Now" (variant default, dental blue)
   - Mobile: hamburger menu using shadcn Sheet component for slide-out nav
   - Scroll effect: add shadow on scroll (use useState + useEffect for scroll detection)
   - Use lucide-react Menu icon for hamburger

2. src/components/footer/footer.tsx
   - Dark footer (bg-gray-900 text-white)
   - 4 columns grid: Brand + description, Quick Links, Services, Contact Info
   - Bottom bar: copyright "© 2026 SmileCare Dental"
   - Responsive: stack columns on mobile

3. src/components/footer-github-banner.tsx
   - Replace with emergency banner:
     "🚨 Dental Emergency? Call +1 (555) 123-SMILE — Available 24/7"
   - Sticky bottom, bg-red-600 text-white, can be dismissed

4. src/components/section-loader.tsx
   - Replace MUI loader with Tailwind skeleton:
     Simple div with animate-pulse bg-gray-200 rounded h-96 w-full

5. src/components/social-links.tsx
   - Rebuild with Tailwind + lucide-react icons
   - Links: Facebook, Instagram, LinkedIn, Google Maps
   - Simple flex row of icon buttons

6. src/app/page.tsx
   - Update imports: remove all dynamic() wrappers, import components directly
   - Remove MUI Stack, use plain div or fragment
   - Keep the same section order: Hero, About, Motivation, Services, CTA, Contact

Do NOT edit config files. Do NOT edit layout.tsx (that was handled in 1.1).
```

### Verification Prompt:

```
ORCHESTRATOR VERIFICATION for Task 1.3:

1. Run: cd d:\Projects\dental-clinic && npx tsc --noEmit
2. Run: yarn build
3. Verify ZERO MUI imports: Select-String -Path "src\**\*.tsx","src\**\*.ts" -Pattern "@mui|@emotion" -SimpleMatch
4. Run: yarn dev — full visual check at localhost:3000
5. Git commit: git add -A && git commit -m "feat: Phase 1.A — UI migration to Tailwind + shadcn"
```

---

## Task 1.4 — Supabase Schema + Types

**Deploy:** 1 sub-agent | **Mode:** Sequential (after 1.3)

### Sub-Agent Prompt:

```
You are a coding sub-agent. You can ONLY create/write files. You CANNOT run terminal commands or edit config files.

PROJECT: d:\Projects\dental-clinic
CONTEXT: Supabase has been initialized in the project (supabase/ directory exists). Write SQL migrations and TypeScript types.

TASK: Create the database schema migration and TypeScript type definitions.

FILES TO CREATE:

1. supabase/migrations/001_initial_schema.sql
   - Create all tables from the PRD schema:
     * clinic (id UUID PK, name, invite_code UNIQUE, owner_id, address fields, coordinates JSONB, phone, email, logo_url, timestamps)
     * app_user (id UUID PK references auth.users, email UNIQUE, role TEXT CHECK IN ('ADMIN','DOCTOR','RECEPTIONIST','PATIENT'), clinic_id FK, first_name, last_name, phone, avatar_url, status TEXT CHECK IN ('PENDING_APPROVAL','ACTIVE','SUSPENDED'), timestamps)
     * patient_profile (id UUID PK, user_id UNIQUE FK, clinic_id FK, dob, blood_group, height_cm, weight_kg, address, emergency_contact JSONB, previous_diseases JSONB, medical_notes)
     * patient_document (id UUID PK, patient_id FK, clinic_id FK, title, document_type, file_url, uploaded_at)
     * doctor_profile (id UUID PK, user_id UNIQUE FK, specialization, license_number, years_of_experience, qualifications JSONB, bio, languages_spoken JSONB, consultation_fee DECIMAL, working_hours JSONB, social_links JSONB)
     * service (id UUID PK, clinic_id FK, name, price DECIMAL(10,2), duration_minutes INT)
     * appointment (id UUID PK, clinic_id FK, patient_id FK, doctor_id FK, start_time TIMESTAMPTZ, end_time TIMESTAMPTZ, status, notes)
     * treatment_record (id UUID PK, appointment_id FK, service_id FK, tooth_number INT, doctor_notes, price_applied DECIMAL)
     * invoice (id UUID PK, clinic_id FK, patient_id FK, appointment_id UNIQUE FK, sub_total, tax_amount, total_amount, paid_amount, status, issued_at)
   - Add indexes on: appointment.start_time, appointment.clinic_id, app_user.clinic_id, clinic.invite_code
   - Enable RLS on all tables (ALTER TABLE ... ENABLE ROW LEVEL SECURITY)

2. src/types/database.ts
   - Export TypeScript interfaces matching every table:
     Clinic, AppUser, PatientProfile, PatientDocument, DoctorProfile, Service, Appointment, TreatmentRecord, Invoice
   - Export enums: UserRole, UserStatus, BloodGroup, DocumentType, AppointmentStatus, InvoiceStatus
   - Export Database type for Supabase client typing

3. src/lib/supabase/client.ts
   - Create browser Supabase client:
     import { createBrowserClient } from "@supabase/ssr"
     export const createClient = () => createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

4. src/lib/supabase/server.ts
   - Create server Supabase client using cookies:
     import { createServerClient } from "@supabase/ssr"
     import { cookies } from "next/headers"
     Export async function that creates server client with cookie handling

5. src/lib/supabase/middleware.ts
   - Create middleware client for auth session refresh

6. CREATE src/.env.local.example
   - NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   - NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   - SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

7. src/lib/validators/auth.ts
   - Zod schemas: loginSchema, registerSchema, staffRegisterSchema, joinClinicSchema, createClinicSchema

Do NOT edit any config files.
```

### Verification Prompt:

```
ORCHESTRATOR VERIFICATION for Task 1.4:

1. Run: cd d:\Projects\dental-clinic && npx tsc --noEmit 2>&1 | Select-Object -First 30
2. Verify migration SQL file exists and has all tables
3. Verify types/database.ts exports all required interfaces
4. Verify lib/supabase/ has client.ts, server.ts, middleware.ts
5. Git commit: git add -A && git commit -m "feat: Phase 1.B — Supabase schema + types + validators"
```

---

## Phase 1 — Final Verification

```
ORCHESTRATOR FINAL CHECK for Phase 1:

1. yarn build — must succeed with zero errors
2. Zero MUI/Emotion references in entire src/
3. Supabase migration file has 9 tables
4. All TypeScript types compile
5. Landing page renders correctly with Tailwind
6. Git commit: git add -A && git commit -m "feat: Phase 1 complete — Tailwind + Supabase foundation"
```
