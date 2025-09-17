"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { useFormHook } from "@/hooks/use-form-hook";
import {
  FormStep,
  AppointmentCreateFormData,
  AppointmentCreationResult,
} from "../types";
import {
  AppointmentContextValue,
  AppointmentProviderProps,
} from "../types/context-types";
import { CONTEXT_STEP_CONFIG } from "../constants/step-config-constants";
import {
  mapFormDataToDto,
  isFormDataReadyForDto,
} from "../schemas/dto-mapping-schema";
import { createContextInitialFormData } from "../schemas/form-initialization-schema";

// Context
const AppointmentContext = createContext<AppointmentContextValue | undefined>(
  undefined
);

// Provider Component
export const AppointmentProvider: React.FC<AppointmentProviderProps> = ({
  children,
  schoolId,
  isOnline = false,
}) => {
  // Form hook integration
  const {
    values,
    validateForm: validateFormData,
    resetForm: resetFormData,
    updateFields,
  } = useFormHook();

  // Steps state
  const [currentStep, setCurrentStep] = useState<FormStep>(
    FormStep.APPOINTMENT_TYPE
  );

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] =
    useState<AppointmentCreationResult | null>(null);

  // Initialize form with default values
  React.useEffect(() => {
    const initialFormData = createContextInitialFormData(schoolId, isOnline);
    updateFields(initialFormData);
  }, [schoolId, isOnline, updateFields]);

  // Computed values
  const currentStepIndex = useMemo(() => {
    return CONTEXT_STEP_CONFIG.findIndex((step) => step.key === currentStep);
  }, [currentStep]);

  const isFirstStep = useMemo(() => {
    return currentStepIndex === 0;
  }, [currentStepIndex]);

  const isLastStep = useMemo(() => {
    return currentStepIndex === CONTEXT_STEP_CONFIG.length - 1;
  }, [currentStepIndex]);

  // Step navigation
  const goToStep = useCallback((step: FormStep) => {
    setCurrentStep(step);
  }, []);

  const goToNextStep = useCallback(async (): Promise<boolean> => {
    if (!isLastStep) {
      const nextStep = CONTEXT_STEP_CONFIG[currentStepIndex + 1].key;
      goToStep(nextStep);
      return true;
    }

    return true;
  }, [currentStepIndex, isLastStep, goToStep]);

  const goToPreviousStep = useCallback(() => {
    if (!isFirstStep) {
      const previousStep = CONTEXT_STEP_CONFIG[currentStepIndex - 1].key;
      goToStep(previousStep);
    }
  }, [currentStepIndex, isFirstStep, goToStep]);

  // Form submission
  const submitForm = useCallback(async () => {
    try {
      setIsSubmitting(true);

      // Final validation
      const isFormValid = await validateFormData();
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
  }, [values, validateFormData]);

  // Reset appointment
  const resetAppointment = useCallback(() => {
    resetFormData();
    setCurrentStep(FormStep.APPOINTMENT_TYPE);
    setSubmissionResult(null);
  }, [resetFormData]);

  // Context value
  const contextValue: AppointmentContextValue = {
    // State
    schoolId,
    isOnline,

    // Steps
    currentStep,
    steps: CONTEXT_STEP_CONFIG,
    currentStepIndex,
    isFirstStep,
    isLastStep,

    // Submission
    isSubmitting,
    submissionResult,

    // Actions
    goToStep,
    goToNextStep,
    goToPreviousStep,
    submitForm,
    resetAppointment,
  };

  return (
    <AppointmentContext.Provider value={contextValue}>
      {children}
    </AppointmentContext.Provider>
  );
};

// Hook
export const useAppointment = () => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error(
      "useAppointment must be used within an AppointmentProvider"
    );
  }
  return context;
};
