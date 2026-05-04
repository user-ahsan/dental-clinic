-- supabase/migrations/002_add_appointment_time_constraint.sql
-- Add CHECK constraint to ensure appointment start_time is before end_time

ALTER TABLE appointment ADD CONSTRAINT valid_time CHECK (start_time < end_time);

-- Down migration
-- ALTER TABLE appointment DROP CONSTRAINT valid_time;