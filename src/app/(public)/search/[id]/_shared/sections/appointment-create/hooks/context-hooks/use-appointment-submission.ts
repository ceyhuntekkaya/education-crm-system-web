"use client";

import { useCallback } from "react";
import { useAppointment } from "../../contexts";

/**
 * Submission hook for appointment form
 */
export const useAppointmentSubmission = () => {
  const { isSubmitting, submissionResult, submitForm, resetAppointment } =
    useAppointment();

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    await submitForm();
  }, [submitForm]);

  // Reset entire appointment process
  const handleReset = useCallback(() => {
    resetAppointment();
  }, [resetAppointment]);

  // Check if submission was successful
  const isSubmissionSuccessful = useCallback((): boolean => {
    return submissionResult?.success === true;
  }, [submissionResult]);

  // Check if submission failed
  const isSubmissionFailed = useCallback((): boolean => {
    return submissionResult?.success === false;
  }, [submissionResult]);

  // Get submission error message
  const getSubmissionError = useCallback((): string | undefined => {
    return submissionResult?.error;
  }, [submissionResult]);

  // Get submission success data
  const getSubmissionData = useCallback(() => {
    if (submissionResult?.success) {
      return {
        appointmentNumber: submissionResult.appointmentNumber,
        message: submissionResult.message,
      };
    }
    return null;
  }, [submissionResult]);

  return {
    // Submission state
    isSubmitting,
    submissionResult,

    // Status checks
    isSubmissionSuccessful: isSubmissionSuccessful(),
    isSubmissionFailed: isSubmissionFailed(),

    // Data getters
    getSubmissionError,
    getSubmissionData,

    // Actions
    submit: handleSubmit,
    reset: handleReset,
  };
};
