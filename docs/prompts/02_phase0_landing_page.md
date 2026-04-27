# 🦷 DCMS — Part 2: Phase 0 — Landing Page Transformation

> **Goal:** Rebrand the existing MUI-based agency template into a dental clinic landing page. NO config files edited. NO new packages installed. Pure content + styling changes using existing MUI infrastructure.

---

## ORCHESTRATOR PRE-TASK: Install dental icon assets

```
ORCHESTRATOR ACTION (run directly, do NOT delegate):

cd d:\Projects\dental-clinic
# No new packages needed for Phase 0 — we reuse existing MUI + Framer Motion.
# Just ensure node_modules exist:
yarn install
```

---

## Task 0.1 — Rebrand AppConfig & Constants

**Deploy:** 1 sub-agent | **Mode:** Sequential (must complete before other tasks)

### Sub-Agent Prompt:

```
You are a coding sub-agent. You can ONLY create/write files. You CANNOT run terminal commands or edit config files (next.config.ts, tsconfig.json, package.json, eslint.config.mjs, .prettierrc.json).

PROJECT: d:\Projects\dental-clinic (Next.js 15 + MUI 7 + TypeScript)

TASK: Rebrand the app identity from "Digital Agency" to "SmileCare Dental Clinic".

FILES TO MODIFY:

1. src/configs/app.config.ts
   - Change appName to "SmileCare Dental"
   - Change appDescription to "Your trusted dental clinic for comprehensive oral care — from routine cleanings to advanced cosmetic dentistry."
   - Remove authorGithubUrl

2. src/constants/service.ts
   - Replace the 6 agency services with these dental services:
     { id:1, title:"General Dentistry", slug:"general", description:"Comprehensive exams, cleanings, fillings, and preventive care for the whole family.", image:"/icons/general-dentistry.svg" }
     { id:2, title:"Cosmetic Dentistry", slug:"cosmetic", description:"Teeth whitening, veneers, bonding, and smile makeover treatments.", image:"/icons/cosmetic-dentistry.svg" }
     { id:3, title:"Orthodontics", slug:"orthodontics", description:"Braces, Invisalign, and alignment correction for a perfect smile.", image:"/icons/orthodontics.svg" }
     { id:4, title:"Oral Surgery", slug:"oral-surgery", description:"Wisdom teeth extraction, dental implants, and surgical procedures.", image:"/icons/oral-surgery.svg" }
     { id:5, title:"Pediatric Dentistry", slug:"pediatric", description:"Gentle, fun dental care designed specifically for children.", image:"/icons/pediatric-dentistry.svg" }
     { id:6, title:"Emergency Care", slug:"emergency", description:"Same-day emergency appointments for dental pain, trauma, and urgent issues.", image:"/icons/emergency-care.svg" }

3. src/constants/menus.tsx
   - Replace companyMenus with:
     Home (/), Services (/services), Our Doctors (/doctors), Book Appointment (/booking), Contact (/contact)
   - Replace supportLinks with:
     Emergency Hotline (/emergency), Patient Portal (/login), FAQ (/faq), Privacy Policy (/privacy-policy)
   - Keep the same MUI icon pattern (Box component), use existing imported icons where suitable, remove unused icon imports.

4. src/constants/app.constant.ts
   - Update APP_NAME to "SmileCare Dental"

Ensure all TypeScript types are preserved. Do not modify any config files.
```

### Verification Prompt:

```
ORCHESTRATOR VERIFICATION for Task 0.1:

1. Run: cd d:\Projects\dental-clinic && npx tsc --noEmit 2>&1 | Select-Object -First 20
2. Verify src/configs/app.config.ts contains "SmileCare Dental"
3. Verify src/constants/service.ts has 6 dental services
4. Verify src/constants/menus.tsx has dental navigation items
5. If TypeScript errors exist, deploy a fix sub-agent with the error output.
```

---

## Task 0.2 — Hero Section Rebrand

**Deploy:** 1 sub-agent | **Mode:** Sequential (after 0.1)

### Sub-Agent Prompt:

```
You are a coding sub-agent. You can ONLY create/write files. You CANNOT run terminal commands or edit config files.

PROJECT: d:\Projects\dental-clinic (Next.js 15 + MUI 7 + TypeScript)

TASK: Rewrite the Hero section for a dental clinic landing page.

CONTEXT: The hero currently lives in src/app/_components/home-hero/ (two sub-files: home-hero-content and home-hero-decoration) and src/app/_components/home-hero.tsx as the wrapper.

FILES TO MODIFY:

1. src/app/_components/home-hero.tsx
   - Keep the structure but change background colors:
     Light mode: a soft dental blue gradient "linear-gradient(135deg, #e8f4fd 0%, #f0f7ff 50%, #e0f0e8 100%)"
     Dark mode: "linear-gradient(135deg, #0a1628 0%, #132238 50%, #0d2818 100%)"

2. src/app/_components/home-hero/home-hero-content.tsx
   - Replace all agency copy with dental clinic copy:
     Heading: "Your Smile, Our Passion"
     Subheading: "Trusted by 10,000+ patients for comprehensive dental care"
     Description: "From routine cleanings to advanced cosmetic procedures, SmileCare Dental provides compassionate, state-of-the-art dental care for the whole family."
     Primary CTA button: "Book Appointment" (keep existing MUI Button styling)
     Secondary CTA: "View Services"
   - Keep all existing MUI imports, framer-motion animations, and component structure.

3. src/app/_components/home-hero/home-hero-decoration.tsx
   - Keep existing decorative elements but adjust colors to dental theme:
     Replace any agency brand colors with dental palette: primary=#2196F3, accent=#4CAF50, warm=#FF9800
   - Add a subtle tooth/dental SVG decorative element if there's a pattern to follow.

Preserve all framer-motion animations. Preserve all MUI usage patterns. Do NOT edit config files.
```

### Verification Prompt:

```
ORCHESTRATOR VERIFICATION for Task 0.2:

1. Run: cd d:\Projects\dental-clinic && npx tsc --noEmit 2>&1 | Select-Object -First 20
2. Read src/app/_components/home-hero/home-hero-content.tsx and verify dental copy exists
3. Run: yarn dev (start the dev server briefly to check for runtime errors)
4. If errors, deploy a fix sub-agent.
```

---

## Task 0.3 — About Section Rebrand

**Deploy:** 1 sub-agent | **Mode:** Sequential (after 0.2)

### Sub-Agent Prompt:

```
You are a coding sub-agent. You can ONLY create/write files. You CANNOT run terminal commands or edit config files.

PROJECT: d:\Projects\dental-clinic (Next.js 15 + MUI 7 + TypeScript)

TASK: Rewrite the About section for a dental clinic.

FILE TO MODIFY: src/app/_components/home-about.tsx

REQUIREMENTS:
- Replace all agency copy with dental clinic About content:
  Section title: "Why Choose SmileCare?"
  Content should highlight:
    1. "20+ Years of Excellence" — Two decades of trusted dental care
    2. "Board-Certified Dentists" — Our team holds the highest qualifications
    3. "Patient-First Approach" — Gentle care with your comfort as priority
    4. "Advanced Technology" — Digital X-rays, 3D scanning, laser dentistry
- Keep the existing MUI component structure (Box, Typography, Grid, etc.)
- Keep all framer-motion animation patterns
- Adjust any color references to match the dental palette (blues, greens, whites)
- Replace any generic agency images/icons references with dental-themed descriptions
- Add stats if the current design supports it: "10,000+ Happy Patients", "15+ Dentists", "98% Satisfaction Rate"

Do NOT edit config files.
```

### Verification Prompt:

```
ORCHESTRATOR VERIFICATION for Task 0.3:

1. Run: cd d:\Projects\dental-clinic && npx tsc --noEmit 2>&1 | Select-Object -First 20
2. Verify src/app/_components/home-about.tsx contains "SmileCare" or dental keywords
3. If errors, deploy a fix sub-agent.
```

---

## Task 0.4 — Services Section Rebrand

**Deploy:** 1 sub-agent | **Mode:** Can run PARALLEL with Task 0.3 (different file)

### Sub-Agent Prompt:

```
You are a coding sub-agent. You can ONLY create/write files. You CANNOT run terminal commands or edit config files.

PROJECT: d:\Projects\dental-clinic (Next.js 15 + MUI 7 + TypeScript)

TASK: Rewrite the Services section to display dental services.

FILE TO MODIFY: src/app/_components/home-services.tsx

REQUIREMENTS:
- The section already maps over a services array from src/constants/service.ts (which was updated in Task 0.1 to contain dental services)
- Update the section title to "Our Dental Services"
- Update the section subtitle to "Comprehensive care for every smile"
- Adjust card styling colors to dental palette:
  - Card hover colors: soft blue (#2196F3) accents
  - Icon background tints: light dental blue (#e3f2fd)
- Keep all existing MUI component patterns (Card, Typography, Grid, Box)
- Keep all framer-motion animations
- If the services use image paths like /icons/general-dentistry.svg, create simple SVG placeholder files:

CREATE these SVG files in public/icons/:
- general-dentistry.svg (tooth icon, simple outline, color #2196F3)
- cosmetic-dentistry.svg (sparkle/star icon, color #9C27B0)
- orthodontics.svg (braces icon, color #FF9800)
- oral-surgery.svg (scalpel/tooth icon, color #F44336)
- pediatric-dentistry.svg (happy tooth icon, color #4CAF50)
- emergency-care.svg (cross/emergency icon, color #E91E63)

Each SVG should be 64x64 viewBox, simple flat design, single color + white.

Do NOT edit config files.
```

### Verification Prompt:

```
ORCHESTRATOR VERIFICATION for Task 0.4:

1. Run: cd d:\Projects\dental-clinic && npx tsc --noEmit 2>&1 | Select-Object -First 20
2. Verify all 6 SVG files exist in public/icons/
3. Verify home-services.tsx has dental section titles
4. If errors, deploy a fix sub-agent.
```

---

## Task 0.5 — Motivation + CTA + Contact Sections

**Deploy:** 1 sub-agent | **Mode:** Sequential (after 0.3/0.4)

### Sub-Agent Prompt:

```
You are a coding sub-agent. You can ONLY create/write files. You CANNOT run terminal commands or edit config files.

PROJECT: d:\Projects\dental-clinic (Next.js 15 + MUI 7 + TypeScript)

TASK: Rebrand the Motivation, CTA, and Contact sections for a dental clinic.

FILES TO MODIFY:

1. src/app/_components/home-our-motivation.tsx
   - Replace "Our Motivation" with "Our Commitment to Your Smile"
   - Content: Talk about the clinic's mission — pain-free dentistry, modern techniques, building lasting patient relationships
   - Keep all MUI components and framer-motion animations
   - Adjust colors to dental blue/green palette

2. src/app/_components/home-cta.tsx
   - Replace agency CTA with dental CTA:
     Heading: "Ready for a Healthier Smile?"
     Subtext: "Book your appointment today and experience dental care that puts you first."
     Button: "Book Now — It's Easy"
   - Background: gradient with dental blue (#1976D2 → #2196F3)
   - Keep existing MUI pattern

3. src/app/_components/home-contact.tsx
   - Replace agency contact with dental clinic contact:
     Clinic name: "SmileCare Dental Clinic"
     Address: "123 Dental Avenue, Suite 200, Healthcare City, HC 10001"
     Phone: "+1 (555) 123-SMILE"
     Email: "hello@smilecare.dental"
     Hours: "Mon-Fri: 8AM-6PM | Sat: 9AM-2PM | Sun: Closed"
   - Keep form fields but relabel: Name, Email, Phone, "Reason for Visit" (dropdown or textarea)
   - Keep all MUI components and animations

Do NOT edit config files.
```

### Verification Prompt:

```
ORCHESTRATOR VERIFICATION for Task 0.5:

1. Run: cd d:\Projects\dental-clinic && npx tsc --noEmit 2>&1 | Select-Object -First 20
2. Grep for "SmileCare" across all modified files
3. If errors, deploy a fix sub-agent.
```

---

## Task 0.6 — AppBar + Footer Rebrand

**Deploy:** 1 sub-agent | **Mode:** Sequential (after 0.1, can parallel with 0.5)

### Sub-Agent Prompt:

```
You are a coding sub-agent. You can ONLY create/write files. You CANNOT run terminal commands or edit config files.

PROJECT: d:\Projects\dental-clinic (Next.js 15 + MUI 7 + TypeScript)

TASK: Rebrand the AppBar (navigation) and Footer for a dental clinic.

FILES TO MODIFY (explore the directories first):

1. src/components/appbar/ (all files inside)
   - Replace logo/brand text with "SmileCare Dental" + a tooth emoji or the text "🦷"
   - Navigation links should match the updated menus from src/constants/menus.tsx (Home, Services, Our Doctors, Book Appointment, Contact)
   - Add a prominent "Book Now" CTA button in the navbar (MUI Button, variant="contained", color dental blue)
   - Keep the dark mode toggle if it exists
   - Adjust any hardcoded agency colors to dental palette

2. src/components/footer/footer.tsx (and any sub-files)
   - Replace agency branding with "SmileCare Dental"
   - Footer columns: Quick Links, Our Services, Contact Info, Working Hours
   - Remove any "GitHub" references
   - Copyright: "© 2026 SmileCare Dental. All rights reserved."

3. src/components/footer-github-banner.tsx
   - Either empty this component (return null) or replace with a simple "Emergency? Call +1 (555) 123-SMILE" banner
   - Keep it as a valid React component

4. src/components/social-links.tsx
   - Update social links to dental clinic placeholders (Facebook, Instagram, LinkedIn, Google Maps)
   - Remove any irrelevant platform links

Do NOT edit config files. Do NOT edit layout.tsx.
```

### Verification Prompt:

```
ORCHESTRATOR VERIFICATION for Task 0.6:

1. Run: cd d:\Projects\dental-clinic && npx tsc --noEmit 2>&1 | Select-Object -First 20
2. Start dev server: yarn dev — check browser at localhost:3000
3. Verify the page shows dental clinic branding end-to-end
4. Take a screenshot or describe the visual state
5. If errors, deploy a fix sub-agent.
```

---

## Phase 0 — Final Verification

```
ORCHESTRATOR FINAL CHECK for Phase 0:

1. Run full type check: cd d:\Projects\dental-clinic && npx tsc --noEmit
2. Run lint: yarn lint
3. Run build: yarn build
4. Start dev server and verify landing page visually:
   - Hero says "Your Smile, Our Passion"
   - Services show 6 dental services
   - Footer shows SmileCare Dental
   - No "Digital Agency" text anywhere
5. Run: Select-String -Path "src\**\*.tsx","src\**\*.ts" -Pattern "digital agency|hiriski|portfolio|career" -SimpleMatch (should return 0 results)
6. Git commit: git add -A && git commit -m "feat: Phase 0 — dental clinic landing page rebrand"
```
