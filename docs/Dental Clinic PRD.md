# **Product Requirements Document (PRD)**

**Product Name:** Dental Clinic Management System (DCMS)

**Platform:** Web Application (Next.js)

**Document Version:** 5.0 (User Flows, Stories & Scenarios Expansion)

**Status:** Architecture & Planning

## **1\. Executive Summary**

**Vision:** To build an all-in-one, modern web platform that streamlines dental clinic operations, enhances the patient booking experience, and provides clinical and administrative staff with frictionless, fast, and secure tools.

**Multi-Tenant Focus:** The system is designed to handle multiple clinics (organizations). Clinic Owners (Admins) can register a clinic, generate a unique secret invite code, and allow their staff (Doctors, Receptionists) to seamlessly join the correct digital workspace.

**Backend Strategy:** Built entirely on **Supabase** (PostgreSQL, Supabase Auth, and Supabase Storage) to ensure real-time capabilities, secure document storage (X-rays, records), and scalable relational data mapping.

## **2\. Target Audience & User Personas**

1. **The Patient (Sarah, 34):** Needs easy online booking, reminders, a secure vault for past medical documents/X-rays, and digital prescriptions.  
2. **The Receptionist (John, 28):** Needs a high-speed calendar, check-in queue, and POS/billing.  
3. **The Doctor / Dentist (Dr. Emily, 40):** Needs queue visibility, tooth charting, fast prescription tools, and a rich public profile to attract patients.  
4. **The Clinic Admin / Owner (Dr. Marcus, 55):** Needs multi-staff management, revenue analytics, detailed clinic branding/location management, and the ability to securely onboard staff using invite codes.

## **3\. Detailed Features by Role**

### **3.1 Organization Onboarding & Staff Invites**

* **Comprehensive Clinic Registration:** Admin creates a new clinic account. Includes adding high-resolution clinic logos, detailed multi-line addresses (Street, City, State, Zip, Geo-coordinates for map integration), and contact information.  
* **Secret Code Generation:** The system generates a unique Clinic Secret Code (e.g., DENT-X9Y2A).  
* **Staff Join Flow:**  
  * A user registers as "Staff" (Doctor/Receptionist).  
  * Prompt: "Do you already work somewhere?" \-\> Select "Yes, Join a Clinic".  
  * User enters the Clinic Secret Code.  
  * User is instantly routed to the clinic's workspace with the appropriate role (or placed in a "Pending Approval" state for the Admin to verify).  
* **Manual Staff Creation:** Admin can manually create accounts from the dashboard and email temporary passwords to staff.

### **3.2 Public Website & Patient Portal**

* **Marketing Pages:** Home, Services, "Meet the Doctors" (showcasing rich doctor profiles), Contact, and interactive Clinic Location map.  
* **Online Booking Engine:** Multi-step form (Service \-\> Doctor \-\> Date/Time) with real-time conflict prevention.  
* **Patient Dashboard (The "Health Vault"):**  
  * View upcoming and past appointments.  
  * **Document Management:** Patients can securely upload previous medical records, X-rays (images), and lab reports into their profile using Supabase Storage.  
  * **Health Profile:** Manage address, height, weight, blood group, and emergency contacts.  
  * Download PDFs of prescriptions/invoices.

### **3.3 Receptionist Dashboard**

* **Global Calendar View:** Daily/Weekly views with color-coded statuses. Drag-and-drop rescheduling.  
* **Queue Management & Check-in:** One-click check-in moves the patient to the Doctor's screen.  
* **Billing & POS:** Generate invoices, record payments, print receipts, and manage partial payments or insurance claims.

### **3.4 Doctor's Clinical Dashboard**

* **Rich Public & Internal Profile:** Doctors can manage their bio, list qualifications (e.g., BDS, MDS), license numbers, consultation fees, and spoken languages.  
* **Active Queue & Consultation View:** \* Real-time access to the patient's comprehensive profile (height, weight, blood group).  
  * Access to the patient's "Health Vault" (viewing uploaded X-rays and past medical history documents).  
  * Treatment Logging (dropdowns linked to pricing) and visual tooth charting.  
* **Clinical Notes & Prescriptions:** Rich text editor and PDF generation for drugs/dosages.

### **3.5 Admin / Owner Dashboard**

* **Analytics:** Revenue, appointment trends, popular services, patient acquisition sources.  
* **Staff & Service Management:** Manage working hours, service pricing, and approve joined staff.  
* **Clinic Management:** Update primary clinic details, addresses, and billing information.

## **4\. User Flows, Stories & Scenarios**

### **4.1 Core User Flows**

* **The Patient Booking Flow:** Landing Page \-\> Click "Book Now" \-\> Select Procedure (e.g., Cleaning) \-\> Select Preferred Doctor \-\> View Available Calendar Slots \-\> Select Slot \-\> Authenticate (Login/Register) \-\> Confirm Appointment \-\> Redirected to Patient Portal.  
* **The Staff Onboarding Flow:** Sign Up as Staff \-\> Prompted: "Have an invite code?" \-\> Enter DENT-X9Y2A \-\> System identifies "Smile Clinic" \-\> Account placed in "Pending" \-\> Admin Approves \-\> Staff gains access to their specific dashboard.  
* **The End-to-End Clinic Visit Flow:** 1\. Patient arrives at clinic.  
  2\. Receptionist finds them on the daily calendar and clicks "Check-In".  
  3\. Patient automatically appears on the Doctor's "Active Queue" screen.  
  4\. Doctor calls patient, performs checkup, logs "Cavity Filling" on Tooth \#4, generates prescription, and clicks "Complete Consultation".  
  5\. Receptionist dashboard immediately flashes with a pending invoice for the "Cavity Filling".  
  6\. Receptionist collects payment and closes the loop.

### **4.2 Agile User Stories**

* **As a Patient**, I want to upload my old X-rays before my visit so that the doctor has all my history beforehand.  
* **As a Receptionist**, I want to drag and drop appointments on the calendar so I can easily adjust the schedule without re-typing details.  
* **As a Doctor**, I want a visual tooth chart interface so I can accurately log which specific teeth I am treating.  
* **As an Admin**, I want to generate a unique secret code for my clinic so I can securely onboard my staff without manual data entry.

### **4.3 Detailed Scenarios by Role**

#### **The Patient (5 Scenarios)**

1. **First-Time Booking:** Sarah lands on the clinic's website, browses doctor profiles, selects Dr. Emily for a "Root Canal Consultation", chooses a 2 PM slot next Tuesday, creates an account, and successfully books.  
2. **Uploading Medical History:** A day before her appointment, Sarah logs into her Patient Portal, navigates to the "Health Vault", and uploads a PDF of her previous dental records and a JPEG of her panoramic X-ray.  
3. **Rescheduling an Appointment:** Sarah realizes she has a work conflict. She logs in, clicks "Reschedule" on her upcoming 2 PM appointment, and moves it to 4 PM the following day. The system ensures Dr. Emily is available.  
4. **Post-Visit Document Retrieval:** After her treatment, Sarah needs to submit an insurance claim. She logs into her portal, goes to "Billing", and downloads the PDF invoice from her visit yesterday.  
5. **Updating Emergency Info:** Sarah moves to a new house. She logs in, updates her residential address, and adds her husband as her new emergency contact.

#### **The Receptionist (5 Scenarios)**

1. **Walk-In Registration:** A new patient walks into the clinic in pain. John (Receptionist) quickly opens the "New Patient" modal, enters basic details, and instantly slots them into an "Emergency" gap on the calendar.  
2. **Patient Check-In:** Sarah arrives for her 4 PM appointment. John finds her name on the daily calendar, verifies her phone number, and clicks the "Check-In" button, changing her status to orange and moving her to Dr. Emily's queue.  
3. **Handling Phone Reschedules:** A patient calls to cancel. John quickly searches their name in the master calendar, cancels the appointment (which frees up the slot publicly online), and books them for next week.  
4. **Processing Payment (POS):** Sarah finishes her treatment. John sees her pending invoice generated by the Doctor. The total is $200. Sarah pays $100 in cash and $100 via card. John splits the payment in the POS system and prints the receipt.  
5. **End-of-Day Review:** At 6 PM, John filters the calendar to "No-Shows", tags two patients who never arrived, and sends them a templated "Missed Appointment" SMS directly from the dashboard.

#### **The Doctor (5 Scenarios)**

1. **Managing the Active Queue:** Dr. Emily finishes with a patient and looks at her dashboard. She sees Sarah is "Checked-In" and waiting in the lobby. She clicks "Start Consultation" to pull up Sarah's file.  
2. **Reviewing Health Vault:** During the consultation, Dr. Emily opens Sarah's Health Vault tab and reviews the panoramic X-ray Sarah uploaded yesterday, saving time on taking new X-rays.  
3. **Visual Treatment Logging:** Dr. Emily finds a cavity. On the digital tooth chart, she clicks Tooth \#14, selects "Composite Filling" from the service dropdown, and adds a quick clinical note: "Patient reported sensitivity to cold."  
4. **Generating Prescriptions:** Dr. Emily needs to prescribe Amoxicillin. She opens the Prescription Pad, selects the drug from a pre-filled database, sets "500mg, 3x daily for 5 days", and clicks "Sign & Send". A PDF is generated and saved to Sarah's portal.  
5. **Updating Professional Profile:** Dr. Emily recently completed an "Advanced Invisalign" certification. She goes to her profile settings, adds the certification, and updates her bio so it immediately reflects on the public booking website.

#### **The Admin / Owner (5 Scenarios)**

1. **Clinic Setup & Code Generation:** Dr. Marcus buys the software, creates "Sunrise Dental", uploads the clinic logo, and sets the address. He then generates the SUNRISE-2026 invite code to give to his new hires.  
2. **Staff Approval:** Dr. Marcus receives an email that "John (Receptionist)" has tried to join the clinic using the secret code. He logs into the Admin panel, verifies John is his actual employee, and clicks "Approve".  
3. **Service & Price Management:** The cost of composite materials has gone up. Dr. Marcus goes to the Service Catalog and updates the base price of a "Composite Filling" from $100 to $120. This instantly updates the public booking page and future POS invoices.  
4. **Revenue Analytics Review:** At the end of the month, Dr. Marcus opens the Analytics tab to view a bar chart of monthly revenue. He exports the data to calculate the percentage commission owed to Dr. Emily for the treatments she performed.  
5. **Offboarding Staff:** A receptionist resigns. Dr. Marcus goes to the Staff Directory, locates their profile, and clicks "Revoke Access", immediately logging them out and preventing them from seeing patient data or the calendar.

## **5\. Low-Level Technical Architecture**

### **5.1 Tech Stack**

* **Framework:** Next.js 14+ (App Router)  
* **Language:** TypeScript  
* **Styling & UI:** Tailwind CSS, shadcn/ui, Radix UI (Headless components)  
* **Authentication:** Supabase Auth (Configured for multi-tenant RBAC via custom claims or junction tables).  
* **Database & API:** Supabase (PostgreSQL) leveraging Row Level Security (RLS) to ensure clinics cannot see each other's data.  
* **File Storage:** Supabase Storage (Buckets: patient-documents, avatars, clinic-assets).  
* **State Management:** React Query (for client-side fetching/caching).  
* **Forms & Validation:** React Hook Form \+ Zod validation schemas.

### **5.2 Application Folder Structure**

src/  
├── app/                          
│   ├── (marketing)/            \# Public-facing pages (Home, Doctors, Map)  
│   ├── (auth)/                 \# Supabase Auth routes (Login, Register, Join-Clinic)  
│   ├── (dashboards)/             
│   │   ├── admin/                
│   │   ├── doctor/               
│   │   ├── receptionist/         
│   │   └── patient/            \# Patient vault and profile management  
│   ├── api/                      
├── components/  
│   ├── ui/                       
│   ├── forms/                    
│   └── layouts/                  
├── lib/  
│   ├── supabase/               \# Supabase clients (browser, server, middleware)  
│   └── utils.ts                  
├── server/  
│   ├── actions/                \# Next.js Server Actions  
│   └── queries/                \# Reusable Supabase queries  
├── types/                      \# Database type definitions (generated via Supabase CLI)

## **6\. Security & Access Control (Supabase RLS & Storage)**

### **6.1 Storage Buckets Requirements**

All file uploads are handled via Supabase Storage. Strict bucket policies are required to ensure patient privacy.

|

| **Bucket Name** | **Content** | **Access Rules & RLS** |

| patient-documents | X-Rays, Lab Reports, Old Prescriptions | **Private Bucket**. \- **Patient**: Can upload and read ONLY their own documents (auth.uid() \= patient\_id). \- **Doctor/Receptionist**: Can read/upload documents for patients linked to their clinicId. \- **Admin**: Same as Staff. |

| avatars | Profile pictures of Patients and Staff | **Public Bucket** (Read). \- **Any User**: Can view. \- **Owner**: Can upload/update their own avatar (auth.uid() \= owner\_id). |

| clinic-assets | Clinic Logos, Public gallery images | **Public Bucket** (Read). \- **Any User**: Can view. \- **Admin**: Can upload/update for their assigned clinicId. |

### **6.2 Row Level Security (RLS) Access Matrix**

Database access is heavily restricted based on the role and clinicId stored in the User table.

| **Table** | **Patient Access** | **Receptionist Access** | **Doctor Access** | **Admin Access** |

| Clinic | Read-only | Read-only | Read-only | **Full CRUD** (for their clinicId) |

| User | Read-only (Own profile) | Read-only (Clinic staff/patients) | Read-only (Clinic staff/patients) | **Full CRUD** (Clinic staff) |

| PatientProfile | **Full CRUD** (Own profile) | Read/Update (Clinic patients) | Read/Update (Clinic patients) | Read/Update (Clinic patients) |

| Service | Read-only (Pricing) | Read-only | Read-only | **Full CRUD** (Add/Edit pricing) |

| Appointment | Read/Create (Own appts) | **Full CRUD** (Clinic appts) | Read/Update (Clinic appts) | Read/Delete (Clinic appts) |

| TreatmentRecord | Read-only (Own records) | Read-only (Clinic records) | **Full CRUD** (Clinic records) | Read-only (Clinic records) |

| Invoice | Read-only (Own invoices) | **Full CRUD** (Clinic invoices) | Read-only (Clinic invoices) | Read-only (Clinic invoices) |

## **7\. Screen & Page Inventory**

Below is the exhaustive list of all distinct views/pages required for the Next.js application, organized by the route groupings.

### **7.1 Public / Marketing Screens (/app/(marketing))**

1. **Landing Page (/)**: Hero section, value proposition, quick booking CTA.  
2. **Services Catalog (/services)**: List of procedures offered with estimated pricing.  
3. **Meet the Team (/doctors)**: Directory of doctors with their rich profiles, qualifications, and specialties.  
4. **Doctor Profile Details (/doctors/\[id\])**: Deep dive into a specific doctor, showing their bio, languages, and specific available booking slots.  
5. **Contact & Location (/contact)**: Interactive map, clinic address, and contact form.  
6. **Booking Flow Step 1: Select Service (/booking)**  
7. **Booking Flow Step 2: Select Doctor & Slot (/booking/slot)**  
8. **Booking Flow Step 3: Patient Details & Confirm (/booking/confirm)**

### **7.2 Authentication & Onboarding Screens (/app/(auth))**

9. **Login (/login)**: Universal login for all roles.  
10. **Patient Registration (/register)**: Standard sign-up for patients.  
11. **Staff Registration (/register-staff)**: Sign-up flow specifically for Doctors/Receptionists.  
12. **Join Clinic (/join-clinic)**: The "Enter Secret Code" screen for staff mapping.  
13. **Create Clinic (/create-clinic)**: Admin screen to register a new clinic, generate the code, and set up the organization profile.  
14. **Forgot / Reset Password (/forgot-password)**

### **7.3 Patient Portal Screens (/app/(dashboards)/patient)**

15. **Patient Dashboard (/patient)**: Overview of upcoming appointments and quick actions.  
16. **Health Vault (/patient/vault)**: File manager to upload/view X-rays, lab reports, and past prescriptions.  
17. **My Profile (/patient/profile)**: Manage height, weight, blood group, emergency contacts, and allergies.  
18. **Appointment History (/patient/appointments)**: Log of past visits with downloadable summaries.  
19. **Billing & Invoices (/patient/billing)**: List of invoices, payment statuses, and PDF downloads.

### **7.4 Receptionist Screens (/app/(dashboards)/receptionist)**

20. **Reception Dashboard / Master Calendar (/receptionist)**: The main calendar view (Day/Week/Month) with drag-and-drop.  
21. **Queue Management (/receptionist/queue)**: Kanban or List view of today's arrivals (Scheduled \-\> Checked In \-\> In Chair).  
22. **Add / Edit Patient (/receptionist/patients/new)**: Form to manually onboard walk-in patients.  
23. **Point of Sale / Billing (/receptionist/billing)**: Generate invoices based on Doctor's treatment logs, apply discounts, and record payments.  
24. **Staff Directory (/receptionist/staff)**: View which doctors are on shift today.

### **7.5 Doctor Screens (/app/(dashboards)/doctor)**

25. **Doctor Active Queue (/doctor)**: Specialized view showing *only* checked-in patients waiting for this specific doctor.  
26. **Consultation Room (/doctor/consultation/\[appointmentId\])**: The core medical screen containing:  
    * Patient vitals/health vault summary sidebar.  
    * Interactive visual tooth charting.  
    * Treatment selection dropdowns.  
27. **Prescription Pad (/doctor/prescription/new)**: Tool to select drugs, dosages, generate PDF, and sign off.  
28. **My Schedule (/doctor/schedule)**: Personal calendar view.  
29. **Edit Professional Profile (/doctor/profile)**: Update bio, qualifications, and consultation fee for the public page.

### **7.6 Admin / Owner Screens (/app/(dashboards)/admin)**

30. **Admin Overview (/admin)**: High-level charts (Revenue, Patient Acquisition, Attendance).  
31. **Staff Management (/admin/staff)**: Table of all staff, approve "Pending" staff who used the invite code, and revoke access.  
32. **Service Catalog Settings (/admin/services)**: CRUD interface for adding/editing dental services, durations, and base prices.  
33. **Clinic Settings (/admin/settings)**: Update clinic logo, address, contact info, and view the Clinic Secret Code.  
34. **Financial Reports (/admin/reports)**: Detailed breakdown of daily/monthly revenue, unpaid invoices, and tax calculations.

## **8\. Low-Level Database Schema (Relational Model for Supabase)**

*Note: This schema utilizes a Multi-Tenant architecture where most tables relate back to a Clinic. Row Level Security (RLS) policies in Supabase will strictly enforce tenant isolation based on clinicId.*

### **Clinic (Organization)**

* id: UUID (Primary Key)  
* name: String  
* inviteCode: String (Unique, Indexed)  
* ownerId: UUID (Foreign Key \-\> User.id)  
* addressStreet, addressCity, addressState, addressZip: String  
* coordinates: JSONB (e.g., { "lat": 31.5204, "lng": 74.3587 })  
* phone, email: String  
* logoUrl: String (Supabase Storage URL)  
* createdAt, updatedAt: DateTime

### **User (Shared Identity Table linked to Supabase Auth)**

* id: UUID (PK, matches auth.users.id in Supabase)  
* email: String (Unique)  
* role: Enum (ADMIN, DOCTOR, RECEPTIONIST, PATIENT)  
* clinicId: UUID (FK \-\> Clinic.id, Nullable for floating patients)  
* firstName, lastName, phone: String  
* avatarUrl: String (Supabase Storage URL)  
* status: Enum (PENDING\_APPROVAL, ACTIVE, SUSPENDED)  
* createdAt, updatedAt: DateTime

### **PatientProfile (In-Depth Medical Details)**

* id: UUID (PK)  
* userId: UUID (Unique FK \-\> User.id)  
* clinicId: UUID (FK \-\> Clinic.id)  
* dob: Date  
* bloodGroup: Enum (A\_POS, A\_NEG, B\_POS, B\_NEG, O\_POS, O\_NEG, AB\_POS, AB\_NEG)  
* heightCm: Float  
* weightKg: Float  
* address: Text  
* emergencyContact: JSONB (e.g., { "name": "John Doe", "relation": "Spouse", "phone": "1234567890" })  
* previousDiseases: JSONB (Array of strings, e.g., \["Diabetes", "Hypertension"\])  
* medicalNotes: Text (General observations)

### **PatientDocument (Supabase Storage Linkage)**

* id: UUID (PK)  
* patientId: UUID (FK \-\> User.id)  
* clinicId: UUID (FK \-\> Clinic.id)  
* title: String (e.g., "Molar X-Ray \- 2023")  
* documentType: Enum (XRAY, LAB\_REPORT, PREVIOUS\_PRESCRIPTION, OTHER)  
* fileUrl: String (Path in Supabase Storage patient-documents bucket)  
* uploadedAt: DateTime

### **DoctorProfile (In-Depth Professional Details)**

* id: UUID (PK)  
* userId: UUID (Unique FK \-\> User.id)  
* specialization: String (e.g., "Orthodontist", "Endodontist")  
* licenseNumber: String (Unique professional registration number)  
* yearsOfExperience: Int  
* qualifications: JSONB (Array of strings, e.g., \["BDS", "MDS \- Orthodontics"\])  
* bio: Text (For the public website "Meet the Doctors" page)  
* languagesSpoken: JSONB (e.g., \["English", "Spanish"\])  
* consultationFee: Decimal  
* workingHours: JSONB (e.g., { "monday": \["09:00", "17:00"\] })  
* socialLinks: JSONB (e.g., { "linkedin": "...", "twitter": "..." })

### **Service (Catalog of Procedures)**

* id: UUID (PK)  
* clinicId: UUID (FK \-\> Clinic.id)  
* name: String  
* price: Decimal (Precision: 10, Scale: 2\)  
* durationMinutes: Int

### **Appointment**

* id: UUID (PK)  
* clinicId: UUID (FK \-\> Clinic.id)  
* patientId: UUID (FK \-\> User.id)  
* doctorId: UUID (FK \-\> User.id)  
* startTime: DateTime (Indexed for fast calendar queries)  
* endTime: DateTime  
* status: Enum (SCHEDULED, CHECKED\_IN, IN\_CHAIR, COMPLETED, CANCELLED, NO\_SHOW)  
* notes: Text (Optional patient reason for visit)

### **TreatmentRecord**

* id: UUID (PK)  
* appointmentId: UUID (FK \-\> Appointment.id)  
* serviceId: UUID (FK \-\> Service.id)  
* toothNumber: Int (Nullable \- specific to dental charting, standard 1-32 notation)  
* doctorNotes: Text  
* priceApplied: Decimal (Snapshot of price at the time of treatment)

### **Invoice**

* id: UUID (PK)  
* clinicId: UUID (FK \-\> Clinic.id)  
* patientId: UUID (FK \-\> User.id)  
* appointmentId: UUID (Unique FK \-\> Appointment.id)  
* subTotal: Decimal  
* taxAmount: Decimal  
* totalAmount: Decimal  
* paidAmount: Decimal  
* status: Enum (PENDING, PARTIAL, PAID, VOID)  
* issuedAt: DateTime

## **9\. Phased Implementation Strategy**

1. **Phase 1: Supabase Initialization & Multi-Tenant Core**  
   * Set up Supabase project, Auth config, and Storage Buckets.  
   * Write database migrations and establish Row Level Security (RLS) policies.  
   * Build the "Create Clinic" and "Join via Secret Code" onboarding flow.  
2. **Phase 2: Patient Health Vault & Receptionist Engine**  
   * Build Patient Profile forms (Height, Weight, Blood Group).  
   * Implement file uploading to Supabase Storage for PatientDocuments.  
   * Build the shared Calendar UI for Receptionists.  
3. **Phase 3: Clinical Doctor Operations**  
   * Build the rich Doctor Profile management page.  
   * Build the "Active Queue" and Consultation screen.  
4. **Phase 4: Billing & Public Portal**  
   * Implement Invoicing logic.  
   * Open the public booking portal connected to the actual schedule, dynamically showcasing Doctor Profiles and Clinic Locations.