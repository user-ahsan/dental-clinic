# Dental Clinic Management System

A multi-tenant dental clinic management application built with Next.js 15, Supabase, and Material UI.

## Tech Stack

- **Frontend**: Next.js 15.5.15, React 18.3.1, TypeScript
- **Backend**: Supabase (PostgreSQL, Auth, RLS)
- **UI**: MUI v9, Radix UI, Tailwind CSS, shadcn/ui
- **State**: React Query (@tanstack/react-query)

## Features

- Multi-tenancy (Admin, Doctor, Receptionist, Patient roles)
- Appointment scheduling
- Patient management
- Service catalog with pricing
- Role-based access control (RBAC)

## Prerequisites

- Node.js 20+
- npm or pnpm
- Supabase CLI (for local development)
- Docker (optional, for containerized deployment)

## Getting Started

### 1. Clone and Install

```bash
git clone <repository-url>
cd dental-clinic
npm install
```

### 2. Environment Variables

Create `.env.local` with:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

See `.env.example` for all variables.

### 3. Database Setup

```bash
# Apply migrations
npx supabase db push

# Or run migrations manually
psql -h localhost -U postgres -d postgres -f supabase/migrations/001_initial_schema.sql
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # React components
│   ├── ui/             # Base UI components (shadcn/ui)
│   ├── forms/          # Form components
│   └── layouts/        # Layout components
├── contexts/           # React contexts
├── hooks/              # Custom React hooks
├── lib/                # Utilities
│   └── supabase/       # Supabase client setup
└── types/              # TypeScript type definitions
```

## User Roles

| Role | Permissions |
|------|-------------|
| Admin | Full access, manage clinic settings |
| Doctor | View/manage appointments, patient records |
| Receptionist | Schedule appointments, manage patients |
| Patient | View own appointments, update profile |

## Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript checks |

### Code Quality

- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js + TypeScript rules
- **Prettier**: Code formatting
- **Testing**: Jest + React Testing Library

## Security

- Row Level Security (RLS) enforced at database level
- Role-based access control (RBAC) for all operations
- Environment variables for sensitive credentials
- Security headers configured in next.config.ts
- npm audit runs on pre-commit to catch vulnerabilities

### Dependency Security

| Package | Version | Status | Notes |
|---------|---------|--------|-------|
| next | 15.5.15 | ✅ Patched | Fixed RCE vulnerability (GHSA-9qr9-h5gf-34mp) |
| react | 18.3.1 | ✅ Patched | Downgraded from 19.x to avoid RCE (GHSA-fmh4-wr37-44fp) |

### Security Monitoring

- GitHub Advisories: [Next.js](https://github.com/advisories?query=ecosystem%3Anpm+affected%3ANext.js) | [React](https://github.com/advisories?query=ecosystem%3Anpm+affected%3Areact)
- Deep dependency analysis: [socket.dev](https://socket.dev)
- Run `npm run security:audit` to check for vulnerabilities
- Run `npm run security:fix` to auto-fix vulnerabilities

### Known Historical Vulnerabilities (RESOLVED)

- ~~Next.js 15.3.2 RCE (GHSA-9qr9-h5gf-34mp)~~ - Resolved by upgrading to 15.5.15
- ~~React 19.0.0 RCE (GHSA-fmh4-wr37-44fp)~~ - Resolved by downgrading to 18.3.1

## Deployment

### Docker

```bash
docker build -t dental-clinic .
docker run -p 3000:3000 dental-clinic
```

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

## License

MIT