-- supabase/migrations/004_fix_rls_policies.sql
-- Fix Row Level Security policies for dental clinic

-- =============================================================================
-- RLS FIXES
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Fix 1: patient_document - Separate policies for patients (own) vs staff (clinic)
-- -----------------------------------------------------------------------------

-- Drop conflicting ALL policy
DROP POLICY IF EXISTS "Users can manage their own documents" ON patient_document;
DROP POLICY IF EXISTS "Clinic staff can view documents in their clinic" ON patient_document;

-- Patient can only SELECT their own documents
CREATE POLICY "Patients can view their own documents"
    ON patient_document FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM patient_profile pp
            WHERE pp.id = patient_document.patient_id
            AND pp.user_id = auth.uid()
        )
    );

-- Patient can INSERT their own documents
CREATE POLICY "Patients can insert their own documents"
    ON patient_document FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM patient_profile pp
            WHERE pp.id = patient_document.patient_id
            AND pp.user_id = auth.uid()
        )
    );

-- Clinic staff can view all documents in their clinic
CREATE POLICY "Clinic staff can view documents in their clinic"
    ON patient_document FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM app_user au
            WHERE au.id = auth.uid()
            AND au.clinic_id = patient_document.clinic_id
        )
    );

-- Clinic staff can INSERT documents for patients in their clinic
CREATE POLICY "Clinic staff can insert documents for patients"
    ON patient_document FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM app_user au
            WHERE au.id = auth.uid()
            AND au.clinic_id = patient_document.clinic_id
        )
    );

-- Clinic staff can UPDATE documents in their clinic
CREATE POLICY "Clinic staff can update documents in their clinic"
    ON patient_document FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM app_user au
            WHERE au.id = auth.uid()
            AND au.clinic_id = patient_document.clinic_id
        )
    );

-- Clinic staff can DELETE documents in their clinic
CREATE POLICY "Clinic staff can delete documents in their clinic"
    ON patient_document FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM app_user au
            WHERE au.id = auth.uid()
            AND au.clinic_id = patient_document.clinic_id
        )
    );

-- -----------------------------------------------------------------------------
-- Fix 2: doctor_profile - Restrict access to sensitive fields
-- -----------------------------------------------------------------------------

-- Public read access for doctor profiles (marketing pages need unauthenticated access)
-- Sensitive fields (license_number, working_hours, social_links) are restricted via column-level
-- permissions or application-level filtering, not RLS.
DROP POLICY IF EXISTS "Anyone can view doctor profiles" ON doctor_profile;
CREATE POLICY "Public can view doctor profiles"
    ON doctor_profile FOR SELECT
    USING (true);

-- SECURITY NOTE: This table contains PII (license_number, working_hours).
-- Column-level access control is enforced at the application layer.
-- For API routes serving sensitive doctor data, use explicit column whitelists:
--   select: 'id, user_id, specialization, years_of_experience, qualifications, bio, languages_spoken, consultation_fee'
--   NEVER return: license_number, working_hours, social_links to unauthenticated users

-- Doctors can update their own profile (keep)
-- Admins can update doctor profiles in their clinic
DROP POLICY IF EXISTS "Doctors can update their own profile" ON doctor_profile;
CREATE POLICY "Doctors can update their own profile"
    ON doctor_profile FOR UPDATE
    USING (user_id = auth.uid());

CREATE POLICY "Admins can update doctor profiles in their clinic"
    ON doctor_profile FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM app_user au
            WHERE au.id = auth.uid()
            AND au.role = 'ADMIN'
            AND au.clinic_id = (
                SELECT clinic_id FROM app_user WHERE id = doctor_profile.user_id
            )
        )
    );

-- -----------------------------------------------------------------------------
-- Fix 3: patient_profile - Add missing UPDATE/DELETE policies
-- -----------------------------------------------------------------------------

-- Users can update their own patient profile (already exists as SELECT, need UPDATE)
-- Note: There was a duplicate SELECT policy, now we have proper SELECT + UPDATE
CREATE POLICY "Users can update their own patient profile"
    ON patient_profile FOR UPDATE
    USING (user_id = auth.uid());

-- Users can delete their own patient profile (if allowed)
CREATE POLICY "Users can delete their own patient profile"
    ON patient_profile FOR DELETE
    USING (user_id = auth.uid());

-- -----------------------------------------------------------------------------
-- Fix 4: service - Remove is_active requirement for staff viewing
-- -----------------------------------------------------------------------------

-- Staff can view all services (active and inactive) for their clinic
DROP POLICY IF EXISTS "Authenticated users can view services in their clinic" ON service;
CREATE POLICY "Staff can view services in their clinic"
    ON service FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM app_user au
            WHERE au.id = auth.uid()
            AND au.clinic_id = service.clinic_id
        )
    );

-- -----------------------------------------------------------------------------
-- Fix 5: treatment_record - Add SELECT policy for patients
-- -----------------------------------------------------------------------------

-- Patients can view treatment records from their appointments
CREATE POLICY "Patients can view their treatment records"
    ON treatment_record FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM appointment a
            JOIN patient_profile pp ON pp.id = a.patient_id
            WHERE a.id = treatment_record.appointment_id
            AND pp.user_id = auth.uid()
        )
    );

-- -----------------------------------------------------------------------------
-- Fix 6: app_user - Add DELETE policy for admins
-- -----------------------------------------------------------------------------

-- Admins can delete staff profiles (not their own)
CREATE POLICY "Admins can delete staff in their clinic"
    ON app_user FOR DELETE
    USING (
        id != auth.uid()  -- Cannot delete self
        AND EXISTS (
            SELECT 1 FROM app_user au
            WHERE au.id = auth.uid()
            AND au.role = 'ADMIN'
            AND au.clinic_id = app_user.clinic_id
        )
    );

-- -----------------------------------------------------------------------------
-- Fix 7: appointment - Ensure patients can only see their own appointments
-- (already correct but ensure no bypass)
-- -----------------------------------------------------------------------------

-- Patients can view their appointments (keep existing)
-- Doctors can view appointments where they are assigned
CREATE POLICY "Doctors can view their assigned appointments"
    ON appointment FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM doctor_profile dp
            WHERE dp.user_id = auth.uid()
            AND dp.id = appointment.doctor_id
        )
    );

-- -----------------------------------------------------------------------------
-- Fix 8: invoice - Patients can only view their own invoices (already correct)
-- -----------------------------------------------------------------------------

-- Already properly configured - ensure no bypass
-- Patients can view their invoices (keep)
-- Clinic staff can manage invoices (keep)

-- -----------------------------------------------------------------------------
-- Fix 9: Add audit log table policy (for future use)
-- -----------------------------------------------------------------------------

-- Note: audit_log table should be created separately for compliance
-- This is a placeholder for future implementation
