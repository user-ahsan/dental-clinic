// src/types/database.ts
// Database type definitions for Supabase

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// =============================================================================
// ENUMS
// =============================================================================

export enum UserRole {
  ADMIN = 'ADMIN',
  DOCTOR = 'DOCTOR',
  RECEPTIONIST = 'RECEPTIONIST',
  PATIENT = 'PATIENT',
}

export enum UserStatus {
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
}

export enum BloodGroup {
  A_POSITIVE = 'A_POSITIVE',
  A_NEGATIVE = 'A_NEGATIVE',
  B_POSITIVE = 'B_POSITIVE',
  B_NEGATIVE = 'B_NEGATIVE',
  AB_POSITIVE = 'AB_POSITIVE',
  AB_NEGATIVE = 'AB_NEGATIVE',
  O_POSITIVE = 'O_POSITIVE',
  O_NEGATIVE = 'O_NEGATIVE',
  UNKNOWN = 'UNKNOWN',
}

export enum DocumentType {
  MEDICAL_HISTORY = 'MEDICAL_HISTORY',
  PRESCRIPTION = 'PRESCRIPTION',
  X_RAY = 'X_RAY',
  LAB_REPORT = 'LAB_REPORT',
  INSURANCE = 'INSURANCE',
  ID_DOCUMENT = 'ID_DOCUMENT',
  OTHER = 'OTHER',
}

export enum AppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
}

export enum InvoiceStatus {
  DRAFT = 'DRAFT',
  ISSUED = 'ISSUED',
  PAID = 'PAID',
  PARTIAL = 'PARTIAL',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED',
}

// =============================================================================
// TYPES
// =============================================================================

export interface Coordinates {
  lat: number | null;
  lng: number | null;
}

export interface EmergencyContact {
  name: string | null;
  phone: string | null;
  relationship: string | null;
}

export interface WorkingHours {
  start: string;
  end: string;
}

export interface DayWorkingHours {
  monday: WorkingHours | null;
  tuesday: WorkingHours | null;
  wednesday: WorkingHours | null;
  thursday: WorkingHours | null;
  friday: WorkingHours | null;
  saturday: WorkingHours | null;
  sunday: WorkingHours | null;
}

export interface SocialLinks {
  linkedin: string | null;
  twitter: string | null;
  website: string | null;
}

export interface Qualification {
  name: string;
  institution: string;
  year: string;
}

// =============================================================================
// TABLE TYPES
// =============================================================================

export interface Clinic {
  id: string;
  name: string;
  invite_code: string;
  owner_id: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
  coordinates: Coordinates;
  phone: string | null;
  email: string | null;
  logo_url: string | null;
  settings: Json;
  created_at: string;
  updated_at: string;
}

export interface AppUser {
  id: string;
  email: string;
  role: UserRole;
  clinic_id: string | null;
  first_name: string;
  last_name: string;
  phone: string | null;
  avatar_url: string | null;
  status: UserStatus;
  created_at: string;
  updated_at: string;
}

export interface PatientProfile {
  id: string;
  user_id: string;
  clinic_id: string | null;
  dob: string | null;
  blood_group: BloodGroup;
  height_cm: number | null;
  weight_kg: number | null;
  address: string | null;
  emergency_contact: EmergencyContact;
  previous_diseases: Json;
  medical_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface PatientDocument {
  id: string;
  patient_id: string;
  clinic_id: string | null;
  title: string;
  document_type: DocumentType;
  file_url: string;
  uploaded_at: string;
  created_at: string;
}

export interface DoctorProfile {
  id: string;
  user_id: string;
  specialization: string;
  license_number: string | null;
  years_of_experience: number;
  qualifications: Qualification[];
  bio: string | null;
  languages_spoken: string[];
  consultation_fee: number;
  working_hours: DayWorkingHours;
  social_links: SocialLinks;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  clinic_id: string;
  name: string;
  description: string | null;
  price: number;
  duration_minutes: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  clinic_id: string;
  patient_id: string;
  doctor_id: string | null;
  start_time: string;
  end_time: string;
  status: AppointmentStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface TreatmentRecord {
  id: string;
  appointment_id: string;
  service_id: string | null;
  tooth_number: number | null;
  doctor_notes: string | null;
  price_applied: number | null;
  created_at: string;
  updated_at: string;
}

export interface Invoice {
  id: string;
  clinic_id: string;
  patient_id: string | null;
  appointment_id: string | null;
  sub_total: number;
  tax_amount: number;
  total_amount: number;
  paid_amount: number;
  status: InvoiceStatus;
  issued_at: string;
  due_date: string | null;
  paid_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

// =============================================================================
// DATABASE TYPE FOR SUPABASE CLIENT
// =============================================================================

export interface Database {
  public: {
    Tables: {
      clinic: {
        Row: Clinic;
        Insert: Omit<Clinic, 'id' | 'created_at' | 'updated_at'> & { id?: string };
        Update: Partial<Omit<Clinic, 'id' | 'created_at'>>;
      };
      app_user: {
        Row: AppUser;
        Insert: Omit<AppUser, 'created_at' | 'updated_at'> & { id?: string };
        Update: Partial<Omit<AppUser, 'id' | 'created_at'>>;
      };
      patient_profile: {
        Row: PatientProfile;
        Insert: Omit<PatientProfile, 'id' | 'created_at' | 'updated_at'> & { id?: string };
        Update: Partial<Omit<PatientProfile, 'id' | 'created_at'>>;
      };
      patient_document: {
        Row: PatientDocument;
        Insert: Omit<PatientDocument, 'id' | 'uploaded_at' | 'created_at'> & { id?: string };
        Update: Partial<Omit<PatientDocument, 'id' | 'created_at'>>;
      };
      doctor_profile: {
        Row: DoctorProfile;
        Insert: Omit<DoctorProfile, 'id' | 'created_at' | 'updated_at'> & { id?: string };
        Update: Partial<Omit<DoctorProfile, 'id' | 'created_at'>>;
      };
      service: {
        Row: Service;
        Insert: Omit<Service, 'id' | 'created_at' | 'updated_at'> & { id?: string };
        Update: Partial<Omit<Service, 'id' | 'created_at'>>;
      };
      appointment: {
        Row: Appointment;
        Insert: Omit<Appointment, 'id' | 'created_at' | 'updated_at'> & { id?: string };
        Update: Partial<Omit<Appointment, 'id' | 'created_at'>>;
      };
      treatment_record: {
        Row: TreatmentRecord;
        Insert: Omit<TreatmentRecord, 'id' | 'created_at' | 'updated_at'> & { id?: string };
        Update: Partial<Omit<TreatmentRecord, 'id' | 'created_at'>>;
      };
      invoice: {
        Row: Invoice;
        Insert: Omit<Invoice, 'id' | 'created_at' | 'updated_at'> & { id?: string };
        Update: Partial<Omit<Invoice, 'id' | 'created_at'>>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      check_appointment_conflict: {
        Args: {
          p_clinic_id: string;
          p_doctor_id: string;
          p_start_time: string;
          p_end_time: string;
          p_exclude_id?: string;
        };
        Returns: boolean;
      };
      generate_invite_code: {
        Args: never;
        Returns: string;
      };
    };
    Enums: {
      user_role: UserRole;
      user_status: UserStatus;
      blood_group: BloodGroup;
      document_type: DocumentType;
      appointment_status: AppointmentStatus;
      invoice_status: InvoiceStatus;
    };
  };
}

// =============================================================================
// CONVENIENCE TYPES
// =============================================================================

export type ClinicInsert = Database['public']['Tables']['clinic']['Insert'];
export type ClinicUpdate = Database['public']['Tables']['clinic']['Update'];

export type AppUserInsert = Database['public']['Tables']['app_user']['Insert'];
export type AppUserUpdate = Database['public']['Tables']['app_user']['Update'];

export type PatientProfileInsert = Database['public']['Tables']['patient_profile']['Insert'];
export type PatientProfileUpdate = Database['public']['Tables']['patient_profile']['Update'];

export type PatientDocumentInsert = Database['public']['Tables']['patient_document']['Insert'];
export type PatientDocumentUpdate = Database['public']['Tables']['patient_document']['Update'];

export type DoctorProfileInsert = Database['public']['Tables']['doctor_profile']['Insert'];
export type DoctorProfileUpdate = Database['public']['Tables']['doctor_profile']['Update'];

export type ServiceInsert = Database['public']['Tables']['service']['Insert'];
export type ServiceUpdate = Database['public']['Tables']['service']['Update'];

export type AppointmentInsert = Database['public']['Tables']['appointment']['Insert'];
export type AppointmentUpdate = Database['public']['Tables']['appointment']['Update'];

export type TreatmentRecordInsert = Database['public']['Tables']['treatment_record']['Insert'];
export type TreatmentRecordUpdate = Database['public']['Tables']['treatment_record']['Update'];

export type InvoiceInsert = Database['public']['Tables']['invoice']['Insert'];
export type InvoiceUpdate = Database['public']['Tables']['invoice']['Update'];
