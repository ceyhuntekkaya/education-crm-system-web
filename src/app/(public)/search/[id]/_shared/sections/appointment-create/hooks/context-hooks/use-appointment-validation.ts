"use client";

import { useCallback } from "react";
import { useAppointment } from "../../contexts";

/**
 * Validation hook for appointment form
 */
export const useAppointmentValidation = () => {
  const {
    validateStep,
    validateForm,
    errors,
    isValid,
    getFieldError,
    setFieldError,
  } = useAppointment();

  // Check if form is ready for submission
  const isReadyForSubmission = useCallback((): boolean => {
    return isValid && !Object.values(errors).some((error) => !!error);
  }, [isValid, errors]);

  return {
    // Validation functions
    validateStep,
    validateForm,

    // Error handling
    getFieldError,
    setFieldError,

    // State
    errors,
    isValid,
    isReadyForSubmission,
  };
};
