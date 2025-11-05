/**
 * DTO mapping schema for appointment creation
 * Bu dosya form data'sını DTO'ya dönüştürme logic'ini içerir
 */

import { AppointmentCreateFormData } from "../types/form-data-types";
import { AppointmentCreateRequestDto } from "../hooks/use-create-appointment";

// =============================================================================
// DTO MAPPING FUNCTIONS
// =============================================================================

/**
 * Convert form data to DTO for API submission
 * @param formData - Form data from context
 * @returns DTO object ready for API call
 */
export const mapFormDataToDto = (
  formData: AppointmentCreateFormData
): AppointmentCreateRequestDto => {
  return {
    // Required fields
    schoolId: formData.schoolId!,
    appointmentType: formData.appointmentType!,
    appointmentSlotId: formData.selectedSlotId!,
    studentName: formData.studentName!,

    // Optional fields
    parentUserId: formData.parentUserId,
    isOnline: formData.isOnline,
    studentAge: formData.studentAge,
    studentBirthDate: formData.studentBirthDate,
    studentGender: formData.studentGender,
    currentSchool: formData.currentSchool,
    gradeInterested: formData.gradeInterested,
    specialRequests: formData.specialRequests,
    notes: formData.notes,
  };
};

/**
 * Validate required fields before DTO conversion
 * @param formData - Form data to validate
 * @returns Array of missing required fields
 */
export const validateRequiredFieldsForDto = (
  formData: AppointmentCreateFormData
): string[] => {
  const missingFields: string[] = [];

  const requiredFields = {
    schoolId: formData.schoolId,
    appointmentType: formData.appointmentType,
    selectedSlotId: formData.selectedSlotId,
    studentName: formData.studentName,
  };

  Object.entries(requiredFields).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      missingFields.push(key);
    }
  });

  return missingFields;
};

/**
 * Check if form data is ready for DTO conversion
 * @param formData - Form data to check
 * @returns Boolean indicating if data is ready
 */
export const isFormDataReadyForDto = (
  formData: AppointmentCreateFormData
): boolean => {
  return validateRequiredFieldsForDto(formData).length === 0;
};
