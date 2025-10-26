"use client";

import React, { createContext, useContext } from "react";
import type { RegisterContextType } from "../types/context-types";
import {
  useRegisterSteps,
  useStepValidation,
  useStepNavigation,
  useRegistrationSubmit,
  useVerificationFlow,
  useRegister as useRegisterApi,
  useLocationData,
  useBrandData,
} from "../hooks";
import { useForm } from "@/contexts/form-context";

const RegisterContext = createContext<RegisterContextType | undefined>(
  undefined
);

interface RegisterProviderProps {
  children: React.ReactNode;
}

export const RegisterProvider: React.FC<RegisterProviderProps> = ({
  children,
}) => {
  // Form values
  const { values } = useForm();

  // Location data hook
  const locationData = useLocationData(values);

  // Brand data hook
  const brandData = useBrandData();

  // Custom hooks - her biri tek bir sorumluluktan sorumlu
  const { currentStep, setCurrentStep, nextStep, previousStep, goToStep } =
    useRegisterSteps();

  const { isStepCompleted, canProceedToNextStep } = useStepValidation();

  const { handleStepClick, isStepClickable } = useStepNavigation(
    currentStep,
    isStepCompleted,
    goToStep
  );

  const { submitRegistration, isSubmitting, submitError } =
    useRegistrationSubmit();

  const {
    sendVerificationCode,
    verifyCode,
    isVerifying,
    verificationError,
    codeSent,
    resendTimer,
    inputRefs,
    fullCode,
    handleInputChange,
    handleKeyDown,
    handlePaste,
    getCodeValue,
  } = useVerificationFlow();

  const { isLoading: registerLoading, error: registerError } = useRegisterApi();

  // Context value
  const contextValue: RegisterContextType = {
    // Form data
    formData: values as any,

    // Step management
    currentStep,
    setCurrentStep,
    nextStep,
    previousStep,
    goToStep,

    // Validation
    isStepCompleted,
    isStepClickable,
    canProceedToNextStep: () => canProceedToNextStep(currentStep),

    // Loading states
    isLoading: registerLoading,
    isVerifying,
    isSubmitting,

    // Errors
    error: registerError || submitError || verificationError,
    verificationError,

    // Verification UI State
    codeSent,
    resendTimer,
    inputRefs,
    fullCode,

    // Location data
    locationData,

    // Brand data
    brandData,

    // Actions
    updateFormData: () => {}, // FormProvider handles this
    sendVerificationCode,
    verifyCode,
    submitRegistration,
    handleStepClick,

    // Verification UI Handlers
    handleInputChange,
    handleKeyDown,
    handlePaste,
    getCodeValue,
  };

  return (
    <RegisterContext.Provider value={contextValue}>
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegister = (): RegisterContextType => {
  const context = useContext(RegisterContext);
  if (context === undefined) {
    throw new Error("useRegister must be used within a RegisterProvider");
  }
  return context;
};
