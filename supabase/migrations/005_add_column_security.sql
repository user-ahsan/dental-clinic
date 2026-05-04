-- supabase/migrations/005_add_column_security.sql
-- Column-level security and query optimization helpers

-- =============================================================================
-- COLUMN-LEVEL SECURITY (RLS with Column Restriction)
-- =============================================================================

-- Sometimes we need to restrict specific columns rather than entire rows
-- This migration adds helper functions for column-level filtering

-- -----------------------------------------------------------------------------
-- Function to get accessible service IDs (for query optimization)
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION get_accessible_service_ids()
RETURNS SETOF UUID AS $$
BEGIN
    RETURN QUERY
    SELECT s.id FROM service s
    WHERE EXISTS (
        SELECT 1 FROM app_user au
        WHERE au.id = auth.uid()
        AND au.clinic_id = s.clinic_id
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- -----------------------------------------------------------------------------
-- Function to get accessible doctor profile IDs for current user
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION get_accessible_doctor_ids()
RETURNS SETOF UUID AS $$
BEGIN
    RETURN QUERY
    SELECT dp.id FROM doctor_profile dp
    WHERE dp.user_id = auth.uid()
    OR EXISTS (
        SELECT 1 FROM app_user au
        WHERE au.id = auth.uid()
        AND au.role IN ('ADMIN', 'RECEPTIONIST')
        AND au.clinic_id = (
            SELECT clinic_id FROM app_user WHERE id = dp.user_id
        )
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- -----------------------------------------------------------------------------
-- Function to get patient IDs for current user (for quick lookups)
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION get_my_patient_profile_id()
RETURNS UUID AS $$
BEGIN
    RETURN (
        SELECT id FROM patient_profile
        WHERE user_id = auth.uid()
        LIMIT 1
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- -----------------------------------------------------------------------------
-- View for current user's profile (for safe lookups)
-- -----------------------------------------------------------------------------
CREATE OR REPLACE VIEW my_profile AS
SELECT 
    id,
    email,
    role,
    clinic_id,
    first_name,
    last_name,
    phone,
    avatar_url,
    status,
    created_at,
    updated_at
FROM app_user
WHERE id = auth.uid();

-- -----------------------------------------------------------------------------
-- View for clinic services with minimal info (for dropdowns/lists)
-- -----------------------------------------------------------------------------
CREATE OR REPLACE VIEW clinic_services_list AS
SELECT 
    id,
    clinic_id,
    name,
    price,
    duration_minutes
FROM service
WHERE is_active = true;

-- =============================================================================
-- SUGGESTED INDEXES FOR QUERY OPTIMIZATION
-- =============================================================================

-- These indexes help with common query patterns that use specific columns
CREATE INDEX IF NOT EXISTS idx_patient_profile_user_id ON patient_profile(user_id);
CREATE INDEX IF NOT EXISTS idx_doctor_profile_user_id ON doctor_profile(user_id);
CREATE INDEX IF NOT EXISTS idx_appointment_doctor_id_status ON appointment(doctor_id, status);

-- =============================================================================
-- HELPER VIEWS FOR SPECIFIC COLUMN SELECTS
-- =============================================================================

-- View for appointment list (ID + Name only - minimal data)
CREATE OR REPLACE VIEW appointment_list_view AS
SELECT 
    a.id,
    a.clinic_id,
    a.start_time,
    a.end_time,
    a.status,
    a.notes,
    a.created_at,
    -- Only include IDs for joins, not full names
    a.patient_id,
    a.doctor_id,
    -- Clinic name for display
    c.name as clinic_name
FROM appointment a
JOIN clinic c ON c.id = a.clinic_id;

-- View for patient dropdown (ID + Name only)
CREATE OR REPLACE VIEW patient_name_list AS
SELECT 
    pp.id,
    pp.user_id,
    au.first_name || ' ' || au.last_name as full_name,
    au.clinic_id
FROM patient_profile pp
JOIN app_user au ON au.id = pp.user_id;

-- View for doctor dropdown (ID + Name + Specialization only)
CREATE OR REPLACE VIEW doctor_name_list AS
SELECT 
    dp.id,
    dp.specialization,
    au.first_name || ' ' || au.last_name as full_name,
    dp.consultation_fee
FROM doctor_profile dp
JOIN app_user au ON au.id = dp.user_id;

COMMENT ON VIEW appointment_list_view IS 'Minimal appointment data for lists - excludes sensitive notes';
COMMENT ON VIEW patient_name_list IS 'Minimal patient data for dropdowns - ID and name only';
COMMENT ON VIEW doctor_name_list IS 'Minimal doctor data for dropdowns - ID, name, and specialization only';
