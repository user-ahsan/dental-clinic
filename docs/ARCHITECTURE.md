# Architecture

## Overview

This is a multi-tenant SaaS application for dental clinic management.

## Authentication Flow

1. User signs up/in via Supabase Auth
2. Auth cookies stored in browser
3. Middleware validates session on protected routes
4. RLS policies enforce data isolation at database level

## Data Model

See supabase/migrations/001_initial_schema.sql for full schema.

## Key Entities

- **clinic** - Tenant/organization
- **app_user** - Authenticated users
- **patient** - Clinic patients
- **appointment** - Scheduled visits
- **service** - Clinic services/pricing