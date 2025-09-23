import { useState, useCallback, useMemo } from "react";
import { useFormHook } from "@/hooks/use-form-hook";
import { AppointmentCreateFormData, AppointmentCreationResult } from "../types";
import {
  mapFormDataToDto,
  isFormDataReadyForDto,
} from "../schemas/dto-mapping-schema";

export interface UseAppointmentSubmissionReturn {
  // State
  isSubmitting: boolean;
  submissionResult: AppointmentCreationResult | null;

  // Actions
  submitForm: () => Promise<void>;
  resetSubmission: () => void;
}

export const useAppointmentSubmission = (): UseAppointmentSubmissionReturn => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] =
    useState<AppointmentCreationResult | null>(null);

  // Get form data and validation directly from useFormHook
  const { values, validateForm } = useFormHook();

  const submitForm = useCallback(async () => {
    try {
      setIsSubmitting(true);

      // Final validation
      const isFormValid = await validateForm();
      if (!isFormValid) {
        throw new Error("Form validation failed");
      }

      // Validate required fields for DTO
      const formData = values as AppointmentCreateFormData;
      if (!isFormDataReadyForDto(formData)) {
        throw new Error("Required fields are missing");
      }

      // Create DTO using schema
      const appointmentDto = mapFormDataToDto(formData);

      // TODO: Implement actual API call here
      console.log("Submitting appointment:", appointmentDto);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmissionResult({
        success: true,
        appointmentNumber: "RND-" + Date.now(), // Mock appointment number
        message: "Randevu başarıyla oluşturuldu!",
      });
    } catch (error) {
      console.error("Appointment submission failed:", error);
      setSubmissionResult({
        success: false,
        error:
          error instanceof Error ? error.message : "Bilinmeyen bir hata oluştu",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validateForm]);

  const resetSubmission = useCallback(() => {
    setSubmissionResult(null);
    setIsSubmitting(false);
  }, []);

  // Memoize the return object to prevent unnecessary re-renders
  return useMemo(
    () => ({
      // State
      isSubmitting,
      submissionResult,

      // Actions
      submitForm,
      resetSubmission,
    }),
    [isSubmitting, submissionResult, submitForm, resetSubmission]
  );
};
