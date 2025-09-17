"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  ReactNode,
} from "react";
import { FormStep, AppointmentCreationResult } from "../types";
import {
  AppointmentContextValue,
  AppointmentProviderProps,
} from "../types/context-types";
import {
  useAppointmentSteps,
  useAppointmentSubmission,
  useAppointmentFormData,
} from "../hooks";

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
  // Use custom hooks for different responsibilities
  const formData = useAppointmentFormData(schoolId, isOnline);
  const steps = useAppointmentSteps();
  const submission = useAppointmentSubmission();

  // Reset all appointment data
  const resetAppointment = useCallback(() => {
    formData.resetToInitialState(schoolId, isOnline);
    steps.resetToFirstStep();
    submission.resetSubmission();
  }, [formData, steps, submission, schoolId, isOnline]);

  // Context value combining all hooks
  const contextValue: AppointmentContextValue = {
    // Basic state
    schoolId,
    isOnline,

    // Steps management
    currentStep: steps.currentStep,
    steps: steps.steps,
    currentStepIndex: steps.currentStepIndex,
    isFirstStep: steps.isFirstStep,
    isLastStep: steps.isLastStep,
    goToStep: steps.goToStep,
    goToNextStep: steps.goToNextStep,
    goToPreviousStep: steps.goToPreviousStep,

    // Submission management
    isSubmitting: submission.isSubmitting,
    submissionResult: submission.submissionResult,
    submitForm: submission.submitForm,
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
