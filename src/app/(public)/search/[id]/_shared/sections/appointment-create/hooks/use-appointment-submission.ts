import { useState, useCallback, useMemo } from "react";
import { useFormHook } from "@/hooks/use-form-hook";
import { AppointmentCreateFormData, AppointmentCreationResult } from "../types";
import {
  mapFormDataToDto,
  isFormDataReadyForDto,
} from "../schemas/dto-mapping-schema";
import { useCreateAppointment } from "./use-create-appointment";
import { useInstitutionDetail } from "../../../contexts";

export interface UseAppointmentSubmissionReturn {
  // State
  isSubmitting: boolean;
  submissionResult: AppointmentCreationResult | null;

  // Actions
  submitForm: () => Promise<void>;
  resetSubmission: () => void;
}

export const useAppointmentSubmission = (): UseAppointmentSubmissionReturn => {
  const [submissionResult, setSubmissionResult] =
    useState<AppointmentCreationResult | null>(null);

  // Get form data and validation directly from useFormHook
  const { values, validateForm } = useFormHook();

  // InstitutionDetailContext'ten refetch fonksiyonlarını al
  const { refetchCurrentAppointment, refetchAppointmentSlots } = useInstitutionDetail();

  // API hook for creating appointment
  const { createAppointment, isCreating } = useCreateAppointment(
    (appointment) => {
      // Success callback
      setSubmissionResult({
        success: true,
        appointmentNumber: appointment.id?.toString() || "RND-" + Date.now(),
        message: "Randevu başarıyla oluşturuldu!",
        appointment,
      });

      // Randevu oluşturulduktan sonra mevcut randevu ve slot verilerini yenile
      refetchCurrentAppointment();
      refetchAppointmentSlots();
    },
    (error) => {
      // Error callback
      setSubmissionResult({
        success: false,
        error: error || "Randevu oluşturulurken bir hata oluştu",
      });
    }
  );

  const submitForm = useCallback(async () => {
    try {
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

      // console.log("Submitting appointment:", appointmentDto);

      // Call API
      createAppointment(appointmentDto);
    } catch (error) {
      console.error("Appointment submission failed:", error);
      setSubmissionResult({
        success: false,
        error:
          error instanceof Error ? error.message : "Bilinmeyen bir hata oluştu",
      });
    }
  }, [values, validateForm, createAppointment]);

  const resetSubmission = useCallback(() => {
    setSubmissionResult(null);
  }, []);

  // Memoize the return object to prevent unnecessary re-renders
  return useMemo(
    () => ({
      // State
      isSubmitting: isCreating,
      submissionResult,

      // Actions
      submitForm,
      resetSubmission,
    }),
    [isCreating, submissionResult, submitForm, resetSubmission]
  );
};
