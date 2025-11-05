/**
 * Initial values schema for appointment creation form
 * Bu dosya form initial values'larını içerir
 */

import { AppointmentCreateFormData } from "../types/form-data-types";

// =============================================================================
// FORM INITIAL VALUES SCHEMA
// =============================================================================

/**
 * Create initial values for appointment form
 * @param schoolId - School ID from props
 * @param isOnline - Whether appointment is online
 * @param parentUserId - Parent user ID from auth context
 * @returns Initial form values
 */
export const createInitialValues = (
  schoolId: number,
  isOnline: boolean = false,
  parentUserId?: number
): AppointmentCreateFormData => ({
  // Required/essential fields from props
  schoolId,
  isOnline,
  parentUserId, // Add parentUserId from auth

  // Form fields with default values
  appointmentType: undefined,
  selectedSlotId: undefined,
  studentName: undefined,
  studentAge: undefined,
  studentBirthDate: undefined,
  studentGender: undefined,
  currentSchool: undefined,
  gradeInterested: undefined,
  specialRequests: undefined,
  notes: undefined,

  // Form-specific fields (not in DTO)
  appointmentDate: undefined,
  agreedToTerms: false,
  communicationPreference: "EMAIL" as const,
});

/**
 * Default initial values - boş form için
 */
export const DEFAULT_INITIAL_VALUES: Partial<AppointmentCreateFormData> = {
  // Form-specific defaults
  agreedToTerms: false,
  communicationPreference: "EMAIL",
  isOnline: false,

  // Common defaults
  appointmentType: undefined,
  studentGender: undefined,
  gradeInterested: undefined,
};

/**
 * Empty form values - test ve development için
 */
export const EMPTY_FORM_VALUES: AppointmentCreateFormData = {
  schoolId: 0,
  isOnline: false,
  appointmentType: undefined,
  selectedSlotId: undefined,
  studentName: undefined,
  parentUserId: undefined,
  studentAge: undefined,
  studentBirthDate: undefined,
  studentGender: undefined,
  currentSchool: undefined,
  gradeInterested: undefined,
  specialRequests: undefined,
  notes: undefined,
  appointmentDate: undefined,
  agreedToTerms: false,
  communicationPreference: "EMAIL",
};
