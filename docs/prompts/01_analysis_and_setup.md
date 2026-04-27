# 🦷 DCMS — Part 1: Current State Analysis & Directory Setup

## Current State Analysis

> [!WARNING]
> The current codebase is a **generic digital agency template** (by hiriski), NOT a dental clinic app.

| Aspect | Current State |
|---|---|
| **Identity** | `nextjs-digital-agency-template` — logo, copy, services are all generic agency content |
| **Framework** | Next.js 15.3.2, React 19, TypeScript |
| **UI Library** | MUI 7.1 + Emotion + Framer Motion |
| **PRD Target** | Tailwind CSS + shadcn/ui + Radix UI |
| **Auth** | None |
| **Database** | None |
| **Routing** | Single page (`/`) with no route groups |
| **Content** | Hero, About, Motivation, Services (Web Dev, Marketing, etc.), CTA, Contact |
| **Components** | AppBar, Footer, FooterGithubBanner, SocialLinks, SectionLoader |
| **Theme** | MUI custom theme with Plus Jakarta Sans font |
| **State** | Simple AppContext (dark mode toggle only) |

### Key Decision: MUI → Tailwind + shadcn Migration

The PRD specifies **Tailwind CSS + shadcn/ui + Radix UI**. The current codebase uses **MUI + Emotion**. The landing page phase will keep MUI (rewrite content only). Full migration happens in Phase 2.

---

## PowerShell Setup Commands

> [!IMPORTANT]
> Run these commands ONCE before any agent work begins. They create the final directory skeleton without touching any config files.

```powershell
# ============================================================
# STEP 1: Create the full target directory structure
# ============================================================
$root = "d:\Projects\dental-clinic"

# --- src/app route groups ---
$dirs = @(
  "$root\src\app\(marketing)",
  "$root\src\app\(marketing)\services",
  "$root\src\app\(marketing)\doctors",
  "$root\src\app\(marketing)\doctors\[id]",
  "$root\src\app\(marketing)\contact",
  "$root\src\app\(marketing)\booking",
  "$root\src\app\(marketing)\booking\slot",
  "$root\src\app\(marketing)\booking\confirm",
  "$root\src\app\(auth)\login",
  "$root\src\app\(auth)\register",
  "$root\src\app\(auth)\register-staff",
  "$root\src\app\(auth)\join-clinic",
  "$root\src\app\(auth)\create-clinic",
  "$root\src\app\(auth)\forgot-password",
  "$root\src\app\(dashboards)\patient",
  "$root\src\app\(dashboards)\patient\vault",
  "$root\src\app\(dashboards)\patient\profile",
  "$root\src\app\(dashboards)\patient\appointments",
  "$root\src\app\(dashboards)\patient\billing",
  "$root\src\app\(dashboards)\receptionist",
  "$root\src\app\(dashboards)\receptionist\queue",
  "$root\src\app\(dashboards)\receptionist\patients\new",
  "$root\src\app\(dashboards)\receptionist\billing",
  "$root\src\app\(dashboards)\receptionist\staff",
  "$root\src\app\(dashboards)\doctor",
  "$root\src\app\(dashboards)\doctor\consultation\[appointmentId]",
  "$root\src\app\(dashboards)\doctor\prescription\new",
  "$root\src\app\(dashboards)\doctor\schedule",
  "$root\src\app\(dashboards)\doctor\profile",
  "$root\src\app\(dashboards)\admin",
  "$root\src\app\(dashboards)\admin\staff",
  "$root\src\app\(dashboards)\admin\services",
  "$root\src\app\(dashboards)\admin\settings",
  "$root\src\app\(dashboards)\admin\reports",
  "$root\src\app\api\appointments",
  "$root\src\app\api\auth",
  "$root\src\app\api\billing",
  "$root\src\app\api\clinics",
  "$root\src\app\api\patients",
  "$root\src\app\api\doctors",
  "$root\src\app\api\services",
  # --- src/components ---
  "$root\src\components\ui",
  "$root\src\components\forms",
  "$root\src\components\layouts",
  "$root\src\components\marketing",
  "$root\src\components\dashboard",
  "$root\src\components\booking",
  "$root\src\components\clinical",
  # --- src/lib ---
  "$root\src\lib\supabase",
  "$root\src\lib\validators",
  # --- src/server ---
  "$root\src\server\actions",
  "$root\src\server\queries",
  # --- docs ---
  "$root\docs\prompts"
)

foreach ($d in $dirs) {
  New-Item -ItemType Directory -Path $d -Force | Out-Null
  Write-Host "Created: $d"
}

Write-Host "`n✅ Directory structure created successfully!" -ForegroundColor Green
```

```powershell
# ============================================================
# STEP 2: Create placeholder .gitkeep files so git tracks empties
# ============================================================
$root = "d:\Projects\dental-clinic"

$keeps = @(
  "$root\src\lib\supabase\.gitkeep",
  "$root\src\lib\validators\.gitkeep",
  "$root\src\server\actions\.gitkeep",
  "$root\src\server\queries\.gitkeep",
  "$root\src\components\ui\.gitkeep",
  "$root\src\components\forms\.gitkeep",
  "$root\src\components\layouts\.gitkeep",
  "$root\src\components\marketing\.gitkeep",
  "$root\src\components\dashboard\.gitkeep",
  "$root\src\components\booking\.gitkeep",
  "$root\src\components\clinical\.gitkeep"
)

foreach ($k in $keeps) {
  New-Item -ItemType File -Path $k -Force | Out-Null
}

Write-Host "✅ .gitkeep files created!" -ForegroundColor Green
```

---

## Phase Overview (Quick Reference)

| Phase | Focus | Depends On |
|---|---|---|
| **Phase 0** | Landing Page (dental rebrand, MUI) | Setup commands above |
| **Phase 1** | UI Migration (MUI → Tailwind + shadcn) + Supabase init | Phase 0 |
| **Phase 2** | Auth + Multi-tenant core | Phase 1 |
| **Phase 3** | Patient Portal + Receptionist Engine | Phase 2 |
| **Phase 4** | Doctor Clinical Dashboard | Phase 3 |
| **Phase 5** | Admin Dashboard + Billing + Public Booking | Phase 4 |

> Detailed prompts for each phase are in the subsequent artifact files.
