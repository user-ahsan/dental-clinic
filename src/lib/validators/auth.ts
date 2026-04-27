// src/lib/validators/auth.ts
// Zod validation schemas for authentication

import { z } from 'zod';
import { UserRole } from '@/types/database';

// Login schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

// Staff registration schema
export const registerSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name must be less than 50 characters'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be less than 50 characters'),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number')
    .optional()
    .nullable(),
  role: z.nativeEnum(UserRole).default(UserRole.PATIENT),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

// Staff registration without role (clinic admin registers staff)
export const staffRegisterSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .optional()
    .or(z.string().length(0)),
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name must be less than 50 characters'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be less than 50 characters'),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number')
    .optional()
    .nullable(),
  role: z.nativeEnum(UserRole).default(UserRole.RECEPTIONIST),
  inviteCode: z
    .string()
    .min(1, 'Invite code is required')
    .length(6, 'Invite code must be 6 characters'),
});

// Join clinic schema (user joins existing clinic with invite code)
export const joinClinicSchema = z.object({
  inviteCode: z
    .string()
    .min(1, 'Invite code is required')
    .length(6, 'Invite code must be 6 characters'),
});

// Create clinic schema (admin creates a new clinic)
export const createClinicSchema = z.object({
  clinicName: z
    .string()
    .min(1, 'Clinic name is required')
    .max(100, 'Clinic name must be less than 100 characters'),
  addressLine1: z
    .string()
    .max(200, 'Address must be less than 200 characters')
    .optional()
    .nullable(),
  addressLine2: z
    .string()
    .max(200, 'Address must be less than 200 characters')
    .optional()
    .nullable(),
  city: z
    .string()
    .max(100, 'City must be less than 100 characters')
    .optional()
    .nullable(),
  state: z
    .string()
    .max(100, 'State must be less than 100 characters')
    .optional()
    .nullable(),
  postalCode: z
    .string()
    .max(20, 'Postal code must be less than 20 characters')
    .optional()
    .nullable(),
  country: z
    .string()
    .max(100, 'Country must be less than 100 characters')
    .optional()
    .nullable(),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number')
    .optional()
    .nullable(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .optional()
    .nullable(),
  latitude: z
    .number()
    .min(-90, 'Latitude must be between -90 and 90')
    .max(90, 'Latitude must be between -90 and 90')
    .optional()
    .nullable(),
  longitude: z
    .number()
    .min(-180, 'Longitude must be between -180 and 180')
    .max(180, 'Longitude must be between -180 and 180')
    .optional()
    .nullable(),
});

// Type exports
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type StaffRegisterInput = z.infer<typeof staffRegisterSchema>;
export type JoinClinicInput = z.infer<typeof joinClinicSchema>;
export type CreateClinicInput = z.infer<typeof createClinicSchema>;
