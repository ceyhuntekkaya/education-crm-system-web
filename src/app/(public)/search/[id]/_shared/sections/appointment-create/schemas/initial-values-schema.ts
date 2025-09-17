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
 * @returns Initial form values
 */
export const createInitialValues = (
  schoolId: number,
  isOnline: boolean = false
): AppointmentCreateFormData => ({
  // Required/essential fields from props
  schoolId,
  isOnline,

  // DTO fields with default values
  appointmentSlotId: undefined,
  parentUserId: undefined,
  appointmentDate: undefined,
  startTime: undefined,
  endTime: undefined,
  appointmentType: undefined,
  title: undefined,
  description: undefined,
  location: undefined,
  parentName: undefined,
  parentEmail: undefined,
  parentPhone: undefined,
  studentName: undefined,
  studentAge: undefined,
  studentBirthDate: undefined,
  studentGender: undefined,
  currentSchool: undefined,
  gradeInterested: undefined,
  specialRequests: undefined,
  notes: undefined,
  participants: undefined,

  // Form-specific fields (not in DTO)
  agreedToTerms: false,
  communicationPreference: "EMAIL" as const,
  selectedSlotId: undefined,
  timeSlotData: undefined,
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
  appointmentSlotId: undefined,
  parentUserId: undefined,
  appointmentDate: undefined,
  startTime: undefined,
  endTime: undefined,
  appointmentType: undefined,
  title: undefined,
  description: undefined,
  location: undefined,
  parentName: undefined,
  parentEmail: undefined,
  parentPhone: undefined,
  studentName: undefined,
  studentAge: undefined,
  studentBirthDate: undefined,
  studentGender: undefined,
  currentSchool: undefined,
  gradeInterested: undefined,
  specialRequests: undefined,
  notes: undefined,
  participants: undefined,
  agreedToTerms: false,
  communicationPreference: "EMAIL",
  selectedSlotId: undefined,
  timeSlotData: undefined,
};
