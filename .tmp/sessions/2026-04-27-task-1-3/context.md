# Task Context: Task 1.3 — Rebuild AppBar + Footer with Tailwind

Session ID: 2026-04-27-task-1-3
Created: 2026-04-27
Status: in_progress

## Current Request
Rebuild navigation bar and footer using Tailwind + shadcn. Remove MUI components.

## Context Files (Standards to Follow)
- /c/Users/ahsan/.config/opencode/context/core/standards/code-quality.md

## Reference Files (Source Material)
- src/constants/menus.tsx — companyMenus array with nav links
- src/components/appbar/app-bar.tsx — existing MUI app bar (to replace)
- src/components/footer/footer.tsx — existing footer (to replace)
- src/app/page.tsx — current page with dynamic() wrappers

## Components to Build

1. **src/components/appbar/app-bar.tsx**
   - "use client"
   - Sticky top navbar with backdrop-blur-md bg-white/80 dark:bg-gray-900/80
   - Left: "🦷 SmileCare" logo text (font-bold text-xl text-blue-600)
   - Center: navigation links from src/constants/menus.tsx (companyMenus)
   - Right: shadcn Button "Book Now" (variant default, dental blue)
   - Mobile: hamburger menu using shadcn Sheet component for slide-out nav
   - Scroll effect: add shadow on scroll (use useState + useEffect for scroll detection)
   - Use lucide-react Menu icon for hamburger

2. **src/components/footer/footer.tsx**
   - Dark footer (bg-gray-900 text-white)
   - 4 columns grid: Brand + description, Quick Links, Services, Contact Info
   - Bottom bar: copyright "© 2026 SmileCare Dental"
   - Responsive: stack columns on mobile

3. **src/components/footer-github-banner.tsx**
   - Replace with emergency banner:
     "🚨 Dental Emergency? Call +1 (555) 123-SMILE — Available 24/7"
   - Sticky bottom, bg-red-600 text-white, can be dismissed

4. **src/components/section-loader.tsx**
   - Replace MUI loader with Tailwind skeleton:
     Simple div with animate-pulse bg-gray-200 rounded h-96 w-full

5. **src/components/social-links.tsx**
   - Rebuild with Tailwind + lucide-react icons
   - Links: Facebook, Instagram, LinkedIn, Google Maps
   - Simple flex row of icon buttons

6. **src/app/page.tsx**
   - Update imports: remove all dynamic() wrappers, import components directly
   - Remove MUI Stack, use plain div or fragment
   - Keep the same section order: Hero, About, Motivation, Services, CTA, Contact

## Constraints
- No MUI imports (@mui, @emotion)
- Use existing shadcn Button, Sheet components
- Use lucide-react for icons
- Keep companyMenus navigation logic
- Do NOT edit layout.tsx (handled in 1.1)

## Exit Criteria
- [ ] app-bar.tsx rebuilt with Tailwind + shadcn
- [ ] footer.tsx rebuilt with Tailwind
- [ ] footer-github-banner.tsx replaced with emergency banner
- [ ] section-loader.tsx replaced with Tailwind skeleton
- [ ] social-links.tsx rebuilt with Tailwind + lucide
- [ ] page.tsx updated (no dynamic() wrappers, no MUI Stack)
- [ ] Zero MUI imports in codebase
