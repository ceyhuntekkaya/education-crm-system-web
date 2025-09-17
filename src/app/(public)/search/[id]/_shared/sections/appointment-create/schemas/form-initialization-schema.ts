/**
 * Form initialization schema for appointment creation context
 * Bu dosya context'te kullanılan form başlatma logic'ini içerir
 */

import { AppointmentCreateFormData } from "../types/form-data-types";

// =============================================================================
// FORM INITIALIZATION FUNCTIONS
// =============================================================================

/**
 * Create initial form data for context
 * @param schoolId - School ID from props
 * @param isOnline - Whether appointment is online
 * @returns Partial form data for context initialization
 */
export const createContextInitialFormData = (
  schoolId: number,
  isOnline: boolean = false
): Partial<AppointmentCreateFormData> => {
  return {
    // Props from parent component
    schoolId,
    isOnline,

    // Form-specific fields with defaults
    communicationPreference: "EMAIL",
    agreedToTerms: false,
  };
};

/**
 * Create form defaults for context updates
 * @returns Default values for form fields
 */
export const getFormDefaults = (): Partial<AppointmentCreateFormData> => {
  return {
    communicationPreference: "EMAIL",
    agreedToTerms: false,
    isOnline: false,
  };
};

/**
 * Merge user data with form defaults
 * @param userData - User provided data
 * @param defaults - Default form values
 * @returns Merged form data
 */
export const mergeWithDefaults = (
  userData: Partial<AppointmentCreateFormData>,
  defaults: Partial<AppointmentCreateFormData> = getFormDefaults()
): Partial<AppointmentCreateFormData> => {
  return {
    ...defaults,
    ...userData,
  };
};

/**
 * Reset form to initial state
 * @param schoolId - School ID to preserve
 * @param isOnline - Online status to preserve
 * @returns Clean form data
 */
export const resetToInitialState = (
  schoolId: number,
  isOnline: boolean = false
): Partial<AppointmentCreateFormData> => {
  return createContextInitialFormData(schoolId, isOnline);
};
