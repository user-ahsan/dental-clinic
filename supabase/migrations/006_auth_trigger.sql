-- supabase/migrations/006_auth_trigger.sql
-- Auto-create app_user row on Supabase Auth signup (with cleanup on delete)
-- Date: 2026-05-04

-- =============================================================================
-- AUTO-PROVISIONING TRIGGERS FOR SUPABASE AUTH
-- =============================================================================
--
-- These triggers ensure that every auth.users entry has a corresponding
-- app_user row in the public schema. When a user signs up via Supabase Auth,
-- the handle_new_user() function fires and creates the app_user record
-- automatically. The handle_user_deleted() function cleans up when a user
-- is removed from auth.users.
--
-- Role normalization: auth metadata may contain lowercase role values
-- (e.g. 'patient'), but the DB enum uses UPPERCASE. We apply UPPER() to
-- ensure the cast succeeds regardless of input casing.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Function: Create app_user row when a new auth.user is inserted
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.app_user (id, email, role, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      (UPPER(NEW.raw_user_meta_data ->> 'role'))::public.user_role,
      'PATIENT'::public.user_role
    ),
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name'
  );
  RETURN NEW;
END;
$$;

-- -----------------------------------------------------------------------------
-- Trigger: Fire handle_new_user() on every INSERT into auth.users
-- -----------------------------------------------------------------------------
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- -----------------------------------------------------------------------------
-- Function: Delete app_user row when an auth.user is removed
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_user_deleted()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  DELETE FROM public.app_user WHERE id = OLD.id;
  RETURN OLD;
END;
$$;

-- -----------------------------------------------------------------------------
-- Trigger: Fire handle_user_deleted() on every DELETE from auth.users
-- -----------------------------------------------------------------------------
DROP TRIGGER IF EXISTS on_auth_user_deleted ON auth.users;
CREATE TRIGGER on_auth_user_deleted
  AFTER DELETE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_user_deleted();
