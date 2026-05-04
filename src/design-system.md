# SmileCare Dental Clinic — Design System

## Overview

Comprehensive design system for the dental clinic application, defining visual language for header, footer, and shared components.

---

## 1. Color Palette

### Brand Colors (Dental/Medical)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary-50` | `#eff6ff` | Lightest blue tint |
| `--color-primary-100` | `#dbeafe` | Light blue background |
| `--color-primary-200` | `#bfdbfe` | Blue hover states |
| `--color-primary-300` | `#93c5fd` | Active indicator |
| `--color-primary-400` | `#60a5fa` | Focus ring |
| `--color-primary-500` | `#3b82f6` | Secondary actions |
| `--color-primary-600` | `#2563eb` | Primary buttons (hover) |
| `--color-primary-700` | `#1d4ed8` | CTA background |
| `--color-primary-800` | `#1e40af` | Deep blue (CTA hover) |
| `--color-primary-900` | `#1e3a8a` | Darkest blue text |

### Header Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--header-bg` | `#ffffff` | Header background |
| `--header-bg-scrolled` | `rgba(255,255,255,0.95)` | Header on scroll (with blur) |
| `--header-text` | `#1f2937` | Primary navigation text |
| `--header-text-muted` | `#6b7280` | Secondary text |
| `--header-border` | `#e5e7eb` | Header border |
| `--header-hover-bg` | `#f3f4f6` | Nav link hover background |

### Navigation Link States

| State | Text Color | Background | Border |
|-------|------------|------------|--------|
| Default | `--header-text` | transparent | none |
| Hover | `--color-primary-700` | `--header-hover-bg` | none |
| Active | `--color-primary-700` | `--color-primary-50` | left-bottom accent |
| Focus | `--color-primary-700` | `--color-primary-50` | ring-2 ring-primary-400 |
| Disabled | `--color-gray-300` | transparent | none |

### Footer Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--footer-bg` | `#111827` | Footer background (gray-900) |
| `--footer-text` | `#ffffff` | Primary text |
| `--footer-text-secondary` | `#9ca3af` | Body text (gray-400) |
| `--footer-text-muted` | `#6b7280` | Tertiary text (gray-500) |
| `--footer-border` | `#1f2937` | Border color (gray-800) |
| `--footer-accent` | `#60a5fa` | Icon color (blue-400) |
| `--footer-gradient-start` | `#1e3a8a` | Gradient blue start |
| `--footer-gradient-end` | `#111827` | Gradient blue end |

### Neutral Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-gray-50` | `#f9fafb` | Subtle backgrounds |
| `--color-gray-100` | `#f3f4f6` | Hover backgrounds |
| `--color-gray-200` | `#e5e7eb` | Borders |
| `--color-gray-300` | `#d1d5db` | Disabled states |
| `--color-gray-400` | `#9ca3af` | Placeholder text |
| `--color-gray-500` | `#6b7280` | Secondary text |
| `--color-gray-600` | `#4b5563` | Body text |
| `--color-gray-700` | `#374151` | Primary text |
| `--color-gray-800` | `#1f2937` | Dark text |
| `--color-gray-900` | `#111827` | Darkest backgrounds |

### Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-success` | `#10b981` | Success states (emerald-500) |
| `--color-success-light` | `#d1fae5` | Success backgrounds |
| `--color-warning` | `#f59e0b` | Warning states (amber-500) |
| `--color-warning-light` | `#fef3c7` | Warning backgrounds |
| `--color-destructive` | `#ef4444` | Error states (red-500) |
| `--color-destructive-light` | `#fee2e2` | Error backgrounds |

---

## 2. Typography

### Font Family

- **Primary**: Plus Jakarta Sans (Google Fonts)
- **Fallback**: `ui-sans-serif, system-ui, sans-serif`
- **Variable**: `--font-plus-jakarta-sans`

### Type Scale

| Token | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| `--text-xs` | 12px / 0.75rem | 16px | 400 | Labels, captions |
| `--text-sm` | 14px / 0.875rem | 20px | 400 | Footer body, nav metadata |
| `--text-base` | 16px / 1rem | 24px | 400 | Body text |
| `--text-lg` | 18px / 1.125rem | 28px | 500 | Subheadings |
| `--text-xl` | 20px / 1.25rem | 28px | 600 | Card titles |
| `--text-2xl` | 24px / 1.5rem | 32px | 700 | Section headings |
| `--text-3xl` | 30px / 1.875rem | 36px | 700 | Hero headings |
| `--text-4xl` | 36px / 2.25rem | 40px | 800 | CTA headings |

### Header Navigation Typography

| Element | Token | Size | Weight |
|---------|-------|------|--------|
| Logo/Brand | `--text-xl` | 20px | 700 (bold) |
| Nav Links | `--text-sm` | 14px | 500 (medium) |
| Mobile Menu | `--text-base` | 16px | 500 (medium) |

### Footer Typography

| Element | Token | Size | Weight |
|---------|-------|------|--------|
| Section Title | `--text-base` | 16px | 600 (semibold) |
| Nav Links | `--text-sm` | 14px | 400 (normal) |
| Body Text | `--text-sm` | 14px | 400 (normal) |
| Copyright | `--text-sm` | 14px | 400 (normal) |

### Responsive Typography

| Breakpoint | Nav Font | CTA Heading | Footer Columns |
|------------|---------|-------------|----------------|
| Mobile (<640px) | `--text-base` | `--text-3xl` | 1 column |
| Tablet (640-1024px) | `--text-sm` | `--text-4xl` | 2 columns |
| Desktop (>1024px) | `--text-sm` | `--text-4xl` | 4 columns |

---

## 3. Spacing System

### Header Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--header-height` | 72px | Default header height |
| `--header-height-scrolled` | 64px | Header after scroll |
| `--header-padding-y` | `--spacing-4` (16px) | Vertical padding |
| `--header-padding-x` | `--spacing-6` (24px) | Desktop horizontal padding |
| `--header-gap-nav` | `--spacing-6` (24px) | Gap between nav items |
| `--header-gap-logo` | `--spacing-2` (8px) | Gap in logo area |

### Footer Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--footer-padding-y` | `--spacing-12` (48px) | Main content vertical padding |
| `--footer-padding-x` | `--spacing-6` (24px) | Horizontal padding |
| `--footer-section-gap` | `--spacing-8` (32px) | Gap between footer sections |
| `--footer-item-gap` | `--spacing-2` (8px) | Gap between nav items |
| `--footer-bottom-padding-y` | `--spacing-4` (16px) | Bottom bar padding |
| `--footer-icon-size` | 20px | Footer icon size |
| `--footer-icon-gap` | 12px | Gap between icon and text |

### Component Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--spacing-section` | `--spacing-16` (64px) | Section vertical spacing |
| `--spacing-container` | `--spacing-6` (24px) | Container padding |

---

## 4. Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 6px | Tags, small badges |
| `--radius-md` | 8px | Buttons, inputs |
| `--radius-lg` | 12px | Cards, panels |
| `--radius-xl` | 16px | Modals, large cards |
| `--radius-2xl` | 20px | Hero elements |
| `--radius-3xl` | 24px | Special callouts |
| `--radius-full` | 9999px | Pills, avatars |

### Radius by Component

| Component | Radius Token |
|-----------|--------------|
| Buttons | `--radius-md` (8px) |
| Input fields | `--radius-md` (8px) |
| Cards | `--radius-lg` (12px) |
| Navigation links | `--radius-md` (8px) |
| Mobile menu | `--radius-xl` (16px) |
| Footer icons | `--radius-full` (pill) |
| CTA button | `--radius-lg` (12px) |

---

## 5. Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgb(0 0 0 / 0.05)` | Subtle elevation |
| `--shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.08)` | Cards, dropdowns |
| `--shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.08)` | Modals, popovers |
| `--shadow-xl` | `0 20px 25px -5px rgb(0 0 0 / 0.10)` | Hero elements |
| `--shadow-2xl` | `0 25px 50px -12px rgb(0 0 0 / 0.15)` | Heavy elevation |
| `--shadow-button` | `0 4px 14px rgb(0 0 0 / 0.10)` | CTA buttons |
| `--shadow-card-hover` | `0 10px 30px -5px rgb(0 0 0 / 0.12)` | Hover state cards |

### Shadow Usage by Context

| Context | Shadow Token |
|---------|--------------|
| Header (scrolled) | `--shadow-sm` |
| Cards | `--shadow-md` |
| Card hover | `--shadow-card-hover` |
| Navigation dropdown | `--shadow-lg` |
| Modal | `--shadow-xl` |
| CTA Button | `--shadow-button` |

---

## 6. Component States

### Navigation Link States

```css
/* Default */
.nav-link {
  color: var(--header-text);
  background: transparent;
}

/* Hover */
.nav-link:hover {
  color: var(--color-primary-700);
  background: var(--header-hover-bg);
}

/* Active/Current */
.nav-link.active {
  color: var(--color-primary-700);
  background: var(--color-primary-50);
}

/* Focus */
.nav-link:focus-visible {
  outline: none;
  ring: 2px solid var(--color-primary-400);
  ring-offset: 2px;
}
```

### Button States

| State | Property |
|-------|----------|
| Default | Base styles |
| Hover | `brightness-110` or custom hover color |
| Active | `scale-98` transform |
| Focus | Ring highlight |
| Disabled | `opacity-50`, `pointer-events-none` |

### Mobile Menu States

| State | Behavior |
|-------|----------|
| Closed | `data-closed` - opacity 0, hidden |
| Opening | Slide-in animation |
| Open | `data-open` - full opacity, visible |
| Closing | Slide-out animation |

---

## 7. Icon Standards

### Lucide Icons Used

| Icon | Size | Usage |
|------|------|-------|
| `Phone` | 20px | Contact links |
| `Mail` | 20px | Email links |
| `MapPin` | 20px | Address |
| `Clock` | 20px | Hours |
| `ChevronDown` | 12px | Dropdown indicator |
| `Menu` | 24px | Mobile menu toggle |
| `X` | 24px | Mobile menu close |

### Icon Sizing in Components

| Component | Icon Size |
|-----------|-----------|
| Navigation | 16px (sm), 18px (default) |
| Footer | 20px |
| Buttons (icon-only) | 20px |
| Cards | 20px |
| Input | 16px |

---

## 8. Header Specifications

### Desktop Header (≥1024px)

```
┌─────────────────────────────────────────────────────────────┐
│  🦷 SmileCare    Services  Our Doctors  Book  Contact   [CTA] │
│      Logo           Navigation Links                    Button│
└─────────────────────────────────────────────────────────────┘
Height: 72px
Padding: 0 24px (horizontal)
Nav Gap: 24px between items
CTA: Book Appointment button (blue-600)
```

### Scrolled Header

- Height shrinks to 64px
- Background becomes `rgba(255,255,255,0.95)` with `backdrop-blur`
- Shadow appears: `--shadow-sm`

### Mobile Header (<1024px)

```
┌─────────────────────────────┐
│  🦷 SmileCare         ☰ Menu │
└─────────────────────────────┘
Height: 64px
Mobile menu: Slide-down sheet with --radius-xl
```

---

## 9. Footer Specifications

### Footer Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Brand    Quick Links  Services      Contact Info             │
│  Column   Column       Column        Column                   │
│                                                              │
│  [🦷 Logo + Description]  [Services]  [Contact + Map]       │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│  © 2026 SmileCare Dental    Privacy Policy | Terms           │
└─────────────────────────────────────────────────────────────┘
```

### Footer Color Usage

- Background: `--footer-bg` (gray-900)
- Text: `--footer-text-secondary` (gray-400)
- Headings: `--footer-text` (white)
- Icons: `--footer-accent` (blue-400)
- Border: `--footer-border` (gray-800)

---

## 10. Usage Examples

### Primary Button (CTA)

```tsx
<Button
  variant="default"
  size="lg"
  className="bg-primary-700 hover:bg-primary-800 text-white shadow-button"
>
  Book Appointment
</Button>
```

### Navigation Link

```tsx
<Link
  href="/services"
  className="text-sm font-medium text-gray-700 hover:text-primary-700 hover:bg-gray-100 rounded-md px-3 py-2 transition-colors"
>
  Services
</Link>
```

### Footer Nav Link

```tsx
<Link
  href="/services"
  className="text-gray-400 hover:text-white text-sm transition-colors"
>
  Teeth Cleaning
</Link>
```

### Card Component

```tsx
<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-card-hover transition-shadow">
  {/* Card content */}
</div>
```

---

## 11. CSS Variables Reference

### Colors

```css
--color-primary-50 through --color-primary-900
--header-bg, --header-bg-scrolled
--header-text, --header-text-muted
--header-border, --header-hover-bg
--footer-bg, --footer-text, --footer-text-secondary
--footer-border, --footer-accent
--color-gray-50 through --color-gray-900
--color-success, --color-warning, --color-destructive
```

### Spacing

```css
--spacing-0.5: 0.125rem
--spacing-1: 0.25rem
--spacing-2: 0.5rem
--spacing-3: 0.75rem
--spacing-4: 1rem
--spacing-5: 1.25rem
--spacing-6: 1.5rem
--spacing-8: 2rem
--header-height: 72px
--header-padding-x: 1.5rem
--footer-padding-y: 3rem
```

### Border Radius

```css
--radius-sm: 0.375rem
--radius-md: 0.5rem
--radius-lg: 0.75rem
--radius-xl: 1rem
--radius-2xl: 1.25rem
--radius-3xl: 1.5rem
```

### Typography

```css
--text-xs: 0.75rem
--text-sm: 0.875rem
--text-base: 1rem
--text-lg: 1.125rem
--text-xl: 1.25rem
--text-2xl: 1.5rem
--font-medium: 500
--font-semibold: 600
--font-bold: 700
```
