"use client";

import React, { createContext, useContext, ReactNode, useMemo } from "react";
import { AppointmentCreateFormData } from "../types";
import {
  useAppointmentSteps,
  useStepValidation,
  useStepNavigation,
  useAppointmentSubmission,
  useAppointmentFormData,
} from "../hooks";
import { useFormHook } from "@/hooks/use-form-hook";
import { useInstitutionDetail } from "../../../contexts";

/**
 * Appointment Context Type - Register form mimarisini takip eder
 */
interface AppointmentContextType {
  // Form data
  formData: AppointmentCreateFormData;

  // Step management
  currentStep: number;
  totalSteps: number;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;

  // Validation
  isStepCompleted: (step: number) => boolean;
  isStepClickable: (step: number) => boolean;
  canProceedToNextStep: () => boolean;

  // Loading states
  isSubmitting: boolean;
  slotsLoading: boolean;

  // Errors
  submissionError: string | null;
  slotsError: string | null;

  // Actions
  submitForm: () => Promise<void>;
  handleStepClick: (step: number) => void;

  // Slot management - Hook'tan gelen tüm fonksiyonlar
  slots: any[];
  refetchSlots: () => void;

  // Current appointment info
  hasCurrentAppointment: boolean;
  hasFutureAppointment: boolean;
  currentAppointment: any;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(
  undefined
);

interface AppointmentProviderProps {
  children: ReactNode;
  schoolId: number;
  isOnline?: boolean;
}

/**
 * Appointment Provider - Register form mimarisini takip eder
 * Tüm hook'ları burada birleştirir
 */
export const AppointmentProvider: React.FC<AppointmentProviderProps> = ({
  children,
  schoolId,
  isOnline = false,
}) => {
  // Form values
  const { values } = useFormHook();

  // Initialize form data
  useAppointmentFormData(schoolId, isOnline);

  // Step management
  const {
    currentStep,
    setCurrentStep,
    nextStep,
    previousStep,
    goToStep,
    totalSteps,
  } = useAppointmentSteps();

  // Validation
  const { isStepCompleted, canProceedToNextStep } = useStepValidation();

  // Navigation
  const { handleStepClick, isStepClickable } = useStepNavigation(
    currentStep,
    isStepCompleted,
    goToStep
  );

  // Submission
  const { submitForm, isSubmitting, submissionResult } =
    useAppointmentSubmission();

  // InstitutionDetailContext'ten appointment verilerini al - TEK KAYNAK
  const {
    appointmentSlots: slots,
    appointmentSlotsLoading: slotsLoading,
    appointmentSlotsError: slotsError,
    refetchAppointmentSlots: refetchSlots,
    hasCurrentAppointment,
    hasFutureAppointment,
    currentAppointment,
  } = useInstitutionDetail();

  // Context value
  const contextValue: AppointmentContextType = useMemo(
    () => ({
      // Form data
      formData: values as AppointmentCreateFormData,

      // Step management
      currentStep,
      totalSteps,
      setCurrentStep,
      nextStep,
      previousStep,
      goToStep,

      // Validation
      isStepCompleted,
      isStepClickable,
      canProceedToNextStep: () => canProceedToNextStep(currentStep),

      // Loading states
      isSubmitting,
      slotsLoading,

      // Errors
      submissionError: submissionResult?.error || null,
      slotsError,

      // Actions
      submitForm,
      handleStepClick,

      // Slot data
      slots,
      refetchSlots,

      // Current appointment info
      hasCurrentAppointment,
      hasFutureAppointment,
      currentAppointment,
    }),
    [
      values,
      currentStep,
      totalSteps,
      setCurrentStep,
      nextStep,
      previousStep,
      goToStep,
      isStepCompleted,
      isStepClickable,
      canProceedToNextStep,
      isSubmitting,
      slotsLoading,
      submissionResult,
      slotsError,
      submitForm,
      handleStepClick,
      slots,
      refetchSlots,
      hasCurrentAppointment,
      hasFutureAppointment,
      currentAppointment,
    ]
  );

  return (
    <AppointmentContext.Provider value={contextValue}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointment = (): AppointmentContextType => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error(
      "useAppointment must be used within an AppointmentProvider"
    );
  }
  return context;
};
