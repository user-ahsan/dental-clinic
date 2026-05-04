-- supabase/migrations/003_add_appointment_status_index.sql
-- Add missing index on appointment.status for query performance

CREATE INDEX idx_appointment_status ON appointment(status);

-- Down migration
-- DROP INDEX idx_appointment_status;