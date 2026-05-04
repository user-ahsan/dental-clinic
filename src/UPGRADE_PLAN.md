# Next.js Upgrade Plan: 15.3.2 → 16.2.4

**Document Purpose:** Safe upgrade assessment only — no actual upgrade performed.  
**File Assessed:** `src/app/_components/home-services.tsx`  
**Current Version:** 15.3.2 → **Target Version:** 16.2.4  
**Risk Level:** 🔴 **HIGH**

---

## 1. Breaking Changes (15 → 16)

### 1.1 Async Request APIs (Critical)

Next.js 16 **fully removes** synchronous access to Request-time APIs introduced in v15 as a breaking change:

| API | Change | Migration |
|-----|--------|-----------|
| `cookies()` | Must now be `await`ed | `const store = await cookies()` |
| `headers()` | Must now be `await`ed | `const hdr = await headers()` |
| `draftMode()` | Must now be `await`ed | `const { isEnabled } = await draftMode()` |
| `params` in layouts/pages | Must now be `await`ed | `const { slug } = await params` |
| `searchParams` in pages | Must now be `await`ed | `const { q } = await searchParams` |

### 1.2 Codemods Available

Vercel provides automated codemods for migration:

```bash
# Async cookies migration
npx @next/codemod@latest async-cookies

# Async headers migration
npx @next/codemod@latest async-headers

# Full async API migration
npx @next/codemod@latest async-apis
```

### 1.3 Other Breaking Changes in v16

- **React 20** requirement (bundled with Next.js 16)
- **TurboPack** improvements may have edge case behavior changes
- **Server Components** stricter streaming semantics

---

## 2. Required Testing After Upgrade

### 2.1 Component-Specific Testing (`home-services.tsx`)

This file **does not directly use** the async APIs (cookies, headers, draftMode, params, searchParams), but requires testing due to:

- [ ] Page navigation works correctly
- [ ] `framer-motion` animations trigger on scroll (`whileInView`)
- [ ] `Link` navigation to `/services/{slug}` routes functions
- [ ] `services` data import from `@/constants/service` resolves correctly
- [ ] CSS transitions on hover states work

### 2.2 Full Application Testing

- [ ] **Auth flows** — any `cookies()` usage for session tokens
- [ ] **API routes** — any `headers()` usage for request metadata
- [ ] **Dynamic routes** — any `params` usage in `[slug]` routes
- [ ] **Search pages** — any `searchParams` usage in page components
- [ ] **Draft mode** — any `draftMode()` usage for preview
- [ ] **Middleware** — any synchronous header/cookie access

### 2.3 Build & Runtime Verification

```bash
# Type checking
npm run lint
npm run typecheck

# Build verification
npm run build

# Start production build and smoke test key routes
```

---

## 3. Risk Assessment

### 3.1 CVE Context

Next.js 16.2.x releases have addressed **multiple CVEs**. The jump from 15.3.2 to 16.2.4 crosses several security patches:

| Concern | Mitigation |
|---------|------------|
| Multiple CVEs addressed in 16.x releases | ✅ Upgrade required for security |
| Breaking async API changes | ✅ Codemods available |
| Potential runtime errors if async APIs missed | ⚠️ Manual code review needed |
| React 20 bundled dependency changes | ⚠️ Test React-specific behavior |

### 3.2 Risk Factors

| Factor | Level | Notes |
|--------|-------|-------|
| Security fixes | ✅ **Positive** | CVE patches justify upgrade |
| Breaking async API changes | ⚠️ **Medium** | Codemods reduce effort |
| Indirect dependency impact | ⚠️ **Medium** | framer-motion, UI libs may need updates |
| Testing scope | 🔴 **High** | Full regression testing required |
| Rollback complexity | 🔴 **High** | Requires version pin + cache clear |

### 3.3 Recommendation

**DO NOT upgrade without:**
1. Running `npm run typecheck` and `npm run lint` — fix all errors first
2. Searching codebase for all `cookies()`, `headers()`, `draftMode()` usages
3. Applying codemods before upgrade
4. Full smoke test of authenticated routes
5. Rollback plan documented (version pin in `package.json`, `npm ci` cache clear)

---

## 4. Upgrade Steps (When Ready)

```bash
# 1. Lock current versions
npm ls next react react-dom > current-versions.txt

# 2. Apply async codemods PRE-upgrade
npx @next/codemod@latest async-apis .

# 3. Update package.json to 16.2.4
npm install next@16.2.4 react@20 react-dom@20 --save

# 4. Clear all caches
rm -rf node_modules/.cache .next
npm ci

# 5. Type check and fix
npm run typecheck
npm run lint

# 6. Build
npm run build

# 7. Smoke test critical routes
```

---

## 5. File Assessment Summary

**`src/app/_components/home-services.tsx`** — Status: ⚠️ **INDIRECT IMPACT**

- File is a client component using `framer-motion`, `Link`, and UI cards
- **No direct async API usage** — safe from immediate breaking changes
- **However:** imports from `@/constants/service` and uses Next.js `<Link>` — full app testing required to verify routing works post-upgrade

---

*Document created for risk assessment only. No `npm install` executed.*
