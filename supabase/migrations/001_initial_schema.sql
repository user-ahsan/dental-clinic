-- supabase/migrations/001_initial_schema.sql
-- Dental Clinic Database Schema

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- ENUMS
-- =============================================================================

CREATE TYPE user_role AS ENUM ('ADMIN', 'DOCTOR', 'RECEPTIONIST', 'PATIENT');
CREATE TYPE user_status AS ENUM ('PENDING_APPROVAL', 'ACTIVE', 'SUSPENDED');
CREATE TYPE blood_group AS ENUM ('A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE', 'AB_POSITIVE', 'AB_NEGATIVE', 'O_POSITIVE', 'O_NEGATIVE', 'UNKNOWN');
CREATE TYPE document_type AS ENUM ('MEDICAL_HISTORY', 'PRESCRIPTION', 'X_RAY', 'LAB_REPORT', 'INSURANCE', 'ID_DOCUMENT', 'OTHER');
CREATE TYPE appointment_status AS ENUM ('SCHEDULED', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW');
CREATE TYPE invoice_status AS ENUM ('DRAFT', 'ISSUED', 'PAID', 'PARTIAL', 'OVERDUE', 'CANCELLED');

-- =============================================================================
-- TABLES
-- =============================================================================

-- Clinic table
CREATE TABLE clinic (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    invite_code TEXT UNIQUE NOT NULL,
    owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    address_line1 TEXT,
    address_line2 TEXT,
    city TEXT,
    state TEXT,
    postal_code TEXT,
    country TEXT,
    coordinates JSONB DEFAULT '{"lat": null, "lng": null}',
    phone TEXT,
    email TEXT,
    logo_url TEXT,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- App User table
CREATE TABLE app_user (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    role user_role NOT NULL DEFAULT 'PATIENT',
    clinic_id UUID REFERENCES clinic(id) ON DELETE SET NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT,
    avatar_url TEXT,
    status user_status NOT NULL DEFAULT 'PENDING_APPROVAL',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Patient Profile table
CREATE TABLE patient_profile (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES app_user(id) ON DELETE CASCADE,
    clinic_id UUID REFERENCES clinic(id) ON DELETE SET NULL,
    dob DATE,
    blood_group blood_group DEFAULT 'UNKNOWN',
    height_cm DECIMAL(5,2),
    weight_kg DECIMAL(5,2),
    address TEXT,
    emergency_contact JSONB DEFAULT '{"name": null, "phone": null, "relationship": null}',
    previous_diseases JSONB DEFAULT '[]',
    medical_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Patient Document table
CREATE TABLE patient_document (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patient_profile(id) ON DELETE CASCADE,
    clinic_id UUID REFERENCES clinic(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    document_type document_type DEFAULT 'OTHER',
    file_url TEXT NOT NULL,
    uploaded_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Doctor Profile table
CREATE TABLE doctor_profile (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES app_user(id) ON DELETE CASCADE,
    specialization TEXT NOT NULL,
    license_number TEXT,
    years_of_experience INTEGER DEFAULT 0,
    qualifications JSONB DEFAULT '[]',
    bio TEXT,
    languages_spoken JSONB DEFAULT '["English"]',
    consultation_fee DECIMAL(10,2) DEFAULT 0.00,
    working_hours JSONB DEFAULT '{"monday": {"start": "09:00", "end": "17:00"}, "tuesday": {"start": "09:00", "end": "17:00"}, "wednesday": {"start": "09:00", "end": "17:00"}, "thursday": {"start": "09:00", "end": "17:00"}, "friday": {"start": "09:00", "end": "17:00"}, "saturday": {"start": "10:00", "end": "14:00"}, "sunday": null}',
    social_links JSONB DEFAULT '{"linkedin": null, "twitter": null, "website": null}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Service table
CREATE TABLE service (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clinic_id UUID REFERENCES clinic(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    duration_minutes INTEGER NOT NULL DEFAULT 30,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Appointment table
CREATE TABLE appointment (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clinic_id UUID REFERENCES clinic(id) ON DELETE CASCADE,
    patient_id UUID REFERENCES patient_profile(id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES doctor_profile(id) ON DELETE SET NULL,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    status appointment_status NOT NULL DEFAULT 'SCHEDULED',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Treatment Record table
CREATE TABLE treatment_record (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    appointment_id UUID REFERENCES appointment(id) ON DELETE CASCADE,
    service_id UUID REFERENCES service(id) ON DELETE SET NULL,
    tooth_number INTEGER,
    doctor_notes TEXT,
    price_applied DECIMAL(10,2),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Invoice table
CREATE TABLE invoice (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clinic_id UUID REFERENCES clinic(id) ON DELETE CASCADE,
    patient_id UUID REFERENCES patient_profile(id) ON DELETE SET NULL,
    appointment_id UUID UNIQUE REFERENCES appointment(id) ON DELETE SET NULL,
    sub_total DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    tax_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    total_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    paid_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    status invoice_status NOT NULL DEFAULT 'DRAFT',
    issued_at TIMESTAMPTZ DEFAULT NOW(),
    due_date TIMESTAMPTZ,
    paid_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- INDEXES
-- =============================================================================

CREATE INDEX idx_appointment_start_time ON appointment(start_time);
CREATE INDEX idx_appointment_clinic_id ON appointment(clinic_id);
CREATE INDEX idx_appointment_patient_id ON appointment(patient_id);
CREATE INDEX idx_appointment_doctor_id ON appointment(doctor_id);
CREATE INDEX idx_app_user_clinic_id ON app_user(clinic_id);
CREATE INDEX idx_clinic_invite_code ON clinic(invite_code);
CREATE INDEX idx_clinic_owner_id ON clinic(owner_id);
CREATE INDEX idx_patient_document_patient_id ON patient_document(patient_id);
CREATE INDEX idx_treatment_record_appointment_id ON treatment_record(appointment_id);
CREATE INDEX idx_service_clinic_id ON service(clinic_id);
CREATE INDEX idx_invoice_clinic_id ON invoice(clinic_id);
CREATE INDEX idx_invoice_patient_id ON invoice(patient_id);

-- =============================================================================
-- TRIGGERS FOR UPDATED_AT
-- =============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_clinic_updated_at
    BEFORE UPDATE ON clinic
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_app_user_updated_at
    BEFORE UPDATE ON app_user
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_patient_profile_updated_at
    BEFORE UPDATE ON patient_profile
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_patient_document_updated_at
    BEFORE UPDATE ON patient_document
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_doctor_profile_updated_at
    BEFORE UPDATE ON doctor_profile
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_updated_at
    BEFORE UPDATE ON service
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointment_updated_at
    BEFORE UPDATE ON appointment
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_treatment_record_updated_at
    BEFORE UPDATE ON treatment_record
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_invoice_updated_at
    BEFORE UPDATE ON invoice
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- ROW LEVEL SECURITY
-- =============================================================================

ALTER TABLE clinic ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_user ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_document ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE service ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointment ENABLE ROW LEVEL SECURITY;
ALTER TABLE treatment_record ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice ENABLE ROW LEVEL SECURITY;

-- Clinic policies
CREATE POLICY "Users can view clinics they belong to"
    ON clinic FOR SELECT
    USING (
        id IN (SELECT clinic_id FROM app_user WHERE id = auth.uid())
        OR owner_id = auth.uid()
    );

CREATE POLICY "Clinic owners can manage their clinic"
    ON clinic FOR ALL
    USING (owner_id = auth.uid());

-- App User policies
CREATE POLICY "Users can view app users in their clinic"
    ON app_user FOR SELECT
    USING (
        clinic_id IN (SELECT clinic_id FROM app_user WHERE id = auth.uid())
    );

-- Security Fix: Add INSERT policy for app_user (users create their own profile)
CREATE POLICY "Users can create their own profile"
    ON app_user FOR INSERT
    WITH CHECK (id = auth.uid());

CREATE POLICY "Users can update their own profile"
    ON app_user FOR UPDATE
    USING (id = auth.uid());

CREATE POLICY "Admins can manage staff in their clinic"
    ON app_user FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM app_user au
            WHERE au.id = auth.uid()
            AND au.role = 'ADMIN'
            AND au.clinic_id = app_user.clinic_id
        )
    );

-- Patient Profile policies
CREATE POLICY "Users can view their own patient profile"
    ON patient_profile FOR SELECT
    USING (user_id = auth.uid());

-- Security Fix: Add INSERT policy for patient_profile (users create their own patient profile)
CREATE POLICY "Users can create their own patient profile"
    ON patient_profile FOR INSERT
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own patient profile"
    ON patient_profile FOR UPDATE
    USING (user_id = auth.uid());

CREATE POLICY "Clinic staff can view patient profiles in their clinic"
    ON patient_profile FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM app_user au
            WHERE au.id = auth.uid()
            AND au.clinic_id = patient_profile.clinic_id
        )
    );

-- Patient Document policies
CREATE POLICY "Users can manage their own documents"
    ON patient_document FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM patient_profile pp
            WHERE pp.id = patient_document.patient_id
            AND pp.user_id = auth.uid()
        )
    );

CREATE POLICY "Clinic staff can view documents in their clinic"
    ON patient_document FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM app_user au
            WHERE au.id = auth.uid()
            AND au.clinic_id = patient_document.clinic_id
        )
    );

-- Doctor Profile policies
CREATE POLICY "Anyone can view doctor profiles"
    ON doctor_profile FOR SELECT
    USING (true);

CREATE POLICY "Doctors can update their own profile"
    ON doctor_profile FOR UPDATE
    USING (user_id = auth.uid());

-- Service policies
-- Security Fix: Only authenticated users can view services, and only for their own clinic
CREATE POLICY "Authenticated users can view services in their clinic"
    ON service FOR SELECT
    USING (
        is_active = true
        AND EXISTS (
            SELECT 1 FROM app_user au
            WHERE au.id = auth.uid()
            AND au.clinic_id = service.clinic_id
        )
    );

CREATE POLICY "Clinic staff can manage services in their clinic"
    ON service FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM app_user au
            WHERE au.id = auth.uid()
            AND au.clinic_id = service.clinic_id
            AND au.role IN ('ADMIN', 'DOCTOR')
        )
    );

-- Appointment policies
CREATE POLICY "Patients can view their appointments"
    ON appointment FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM patient_profile pp
            WHERE pp.id = appointment.patient_id
            AND pp.user_id = auth.uid()
        )
    );

CREATE POLICY "Clinic staff can view appointments in their clinic"
    ON appointment FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM app_user au
            WHERE au.id = auth.uid()
            AND au.clinic_id = appointment.clinic_id
        )
    );

CREATE POLICY "Patients can create appointments"
    ON appointment FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM patient_profile pp
            WHERE pp.id = appointment.patient_id
            AND pp.user_id = auth.uid()
        )
    );

CREATE POLICY "Clinic staff can manage appointments in their clinic"
    ON appointment FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM app_user au
            WHERE au.id = auth.uid()
            AND au.clinic_id = appointment.clinic_id
        )
    );

-- Treatment Record policies
CREATE POLICY "Clinic staff can manage treatment records in their clinic"
    ON treatment_record FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM appointment a
            JOIN app_user au ON au.id = auth.uid()
            WHERE a.id = treatment_record.appointment_id
            AND a.clinic_id = au.clinic_id
        )
    );

-- Invoice policies
CREATE POLICY "Patients can view their invoices"
    ON invoice FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM patient_profile pp
            WHERE pp.id = invoice.patient_id
            AND pp.user_id = auth.uid()
        )
    );

CREATE POLICY "Clinic staff can manage invoices in their clinic"
    ON invoice FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM app_user au
            WHERE au.id = auth.uid()
            AND au.clinic_id = invoice.clinic_id
        )
    );

-- =============================================================================
-- FUNCTIONS
-- =============================================================================

-- Function to generate invite code
CREATE OR REPLACE FUNCTION generate_invite_code()
RETURNS TEXT AS $$
DECLARE
    chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    result TEXT := '';
    i INTEGER;
BEGIN
    FOR i IN 1..6 LOOP
        result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
    END LOOP;
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to check appointment conflicts
CREATE OR REPLACE FUNCTION check_appointment_conflict(
    p_clinic_id UUID,
    p_doctor_id UUID,
    p_start_time TIMESTAMPTZ,
    p_end_time TIMESTAMPTZ,
    p_exclude_id UUID DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    conflict_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO conflict_count
    FROM appointment
    WHERE clinic_id = p_clinic_id
        AND doctor_id = p_doctor_id
        AND status NOT IN ('CANCELLED', 'NO_SHOW')
        AND (start_time, end_time) OVERLAPS (p_start_time, p_end_time)
        AND (p_exclude_id IS NULL OR id != p_exclude_id);
    
    RETURN conflict_count > 0;
END;
$$ LANGUAGE plpgsql;
