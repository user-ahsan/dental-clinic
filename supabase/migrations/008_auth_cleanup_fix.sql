-- supabase/migrations/008_auth_cleanup_fix.sql
-- Auth Trigger Cleanup Enhancement
-- Date: 2026-05-04
-- Description: Two-way sync between auth.users and app_user on deletion,
--              ensuring cleanup works regardless of which side initiates the delete.

BEGIN;

-- =============================================================================
-- 1. Improve handle_user_deleted: defensive DELETE with existence check
-- =============================================================================
-- The FK app_user.id → auth.users(id) ON DELETE CASCADE already handles
-- automatic cleanup when a user is removed from auth.users. However, the
-- trigger serves as a belt-and-suspenders safety net. We make it defensive
-- so it never errors if the cascade already removed the row.
CREATE OR REPLACE FUNCTION public.handle_user_deleted()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  -- Only attempt delete if the row still exists (FK CASCADE may have removed it)
  IF EXISTS (SELECT 1 FROM public.app_user WHERE id = OLD.id) THEN
    DELETE FROM public.app_user WHERE id = OLD.id;
  END IF;
  RETURN OLD;
END;
$$;

-- Re-attach trigger to use the updated function
DROP TRIGGER IF EXISTS on_auth_user_deleted ON auth.users;
CREATE TRIGGER on_auth_user_deleted
  AFTER DELETE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_user_deleted();

-- =============================================================================
-- 2. Reverse sync: delete auth.users when app_user is deleted
-- =============================================================================
-- Migration 004 added an RLS policy allowing admins to delete app_user rows.
-- When that happens, the auth.users entry must also be cleaned up.
-- This trigger closes the loop for two-way deletion sync.
CREATE OR REPLACE FUNCTION public.handle_app_user_deleted()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  DELETE FROM auth.users WHERE id = OLD.id;
  RETURN OLD;
END;
$$;

DROP TRIGGER IF EXISTS on_app_user_deleted ON public.app_user;
CREATE TRIGGER on_app_user_deleted
  AFTER DELETE ON public.app_user
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_app_user_deleted();

-- =============================================================================
-- 3. Cleanup verification: ensure no orphaned app_user rows exist
-- =============================================================================
-- This is a one-time repair for any existing orphans (should be none, but safe)
DELETE FROM public.app_user
WHERE id NOT IN (SELECT id FROM auth.users);

COMMIT;
