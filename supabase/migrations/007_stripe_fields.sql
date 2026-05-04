-- supabase/migrations/007_stripe_fields.sql
-- Stripe Integration Fields
-- Date: 2026-05-04
-- Description: Add Stripe reference columns to invoice table and FAILED status

BEGIN;

-- =============================================================================
-- 1. Add FAILED to invoice_status enum
-- =============================================================================
-- Existing enum values: DRAFT, ISSUED, PAID, PARTIAL, OVERDUE, CANCELLED
-- We use pg_enum catalog to check before adding since ALTER TYPE lacks IF NOT EXISTS
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum
    WHERE enumtypid = 'invoice_status'::regtype
    AND enumlabel = 'FAILED'
  ) THEN
    ALTER TYPE invoice_status ADD VALUE 'FAILED';
  END IF;
END $$;

-- =============================================================================
-- 2. Add Stripe reference columns to invoice table
-- =============================================================================
ALTER TABLE invoice
  ADD COLUMN IF NOT EXISTS stripe_invoice_id TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT;

-- =============================================================================
-- 3. Indexes for Stripe lookups
-- =============================================================================
-- Partial index: only indexes non-null stripe_invoice_id values (saves space)
CREATE INDEX IF NOT EXISTS idx_invoice_stripe_invoice_id
  ON invoice(stripe_invoice_id)
  WHERE stripe_invoice_id IS NOT NULL;

-- Index for finding all invoices linked to a Stripe subscription
CREATE INDEX IF NOT EXISTS idx_invoice_stripe_subscription_id
  ON invoice(stripe_subscription_id)
  WHERE stripe_subscription_id IS NOT NULL;

-- =============================================================================
-- 4. RLS: New columns inherit existing invoice table policies
-- =============================================================================
-- No new policies needed - the two Stripe columns are covered by:
--   "Patients can view their invoices" (SELECT)
--   "Clinic staff can manage invoices in their clinic" (ALL)
-- Stripe webhook handler uses service_role (bypasses RLS)

COMMIT;
