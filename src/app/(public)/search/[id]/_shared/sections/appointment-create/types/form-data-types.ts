/**
 * Form data interface definitions for appointment creation
 * Bu dosya form data types'larını içerir
 */

// =============================================================================
// FORM DATA TYPES - Form verisi için interfaces
// =============================================================================

/**
 * Form data interface - Appointment create için gerekli tüm alanlar
 */
export interface AppointmentCreateFormData {
  // Required fields
  schoolId?: number;
  appointmentType?:
    | "INFORMATION_MEETING"
    | "SCHOOL_TOUR"
    | "ENROLLMENT_INTERVIEW"
    | "PARENT_MEETING"
    | "CONSULTATION"
    | "ASSESSMENT"
    | "ORIENTATION"
    | "ONLINE_MEETING"
    | "PHONE_CALL"
    | "GROUP_MEETING"
    | "OTHER";
  selectedSlotId?: number;
  studentName?: string;

  // Optional fields
  parentUserId?: number;
  isOnline?: boolean;
  studentAge?: number;
  studentBirthDate?: string; // Format: "YYYY-MM-DD"
  studentGender?: "MALE" | "FEMALE" | "OTHER" | "PREFER_NOT_TO_SAY";
  currentSchool?: string;
  gradeInterested?: string;
  specialRequests?: string;
  notes?: string;

  // Form-specific fields
  appointmentDate?: string;
  agreedToTerms?: boolean;
  communicationPreference?: "EMAIL" | "SMS" | "PHONE";
}

/**
 * Form step enum
 */
export enum FormStep {
  APPOINTMENT_TYPE = "appointment-type",
  DATE_TIME = "date-time",
  PERSONAL_INFO = "personal-info",
  STUDENT_INFO = "student-info",
  CONFIRMATION = "confirmation",
}
