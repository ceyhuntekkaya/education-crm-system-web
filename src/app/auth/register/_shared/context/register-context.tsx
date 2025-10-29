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
  useFormPrefill,
} from "../hooks";
import { useSubscriptionPlans } from "@/app/(public)/memberships/_shared/hooks";
import { useForm } from "@/contexts/form-context";
import type { RegistrationType } from "../register-form";
import { UserType } from "@/enums/UserType";

const RegisterContext = createContext<RegisterContextType | undefined>(
  undefined
);

interface RegisterProviderProps {
  children: React.ReactNode;
  registrationType?: RegistrationType;
}

export const RegisterProvider: React.FC<RegisterProviderProps> = ({
  children,
  registrationType = UserType.INSTITUTION_USER,
}) => {
  // Form values
  const { values } = useForm();

  // Location data hook
  const locationData = useLocationData(values);

  // Brand data hook
  const brandData = useBrandData();

  // Subscription plans hook
  const { subscriptionPlans, loading: plansLoading } = useSubscriptionPlans();

  // Form prefill hook - URL'den stepId geldiğinde user bilgileriyle formu doldurur
  useFormPrefill(subscriptionPlans, plansLoading);

  // Custom hooks - her biri tek bir sorumluluktan sorumlu
  const { currentStep, setCurrentStep, nextStep, previousStep, goToStep } =
    useRegisterSteps(registrationType);

  const { isStepCompleted, canProceedToNextStep } = useStepValidation();

  const { handleStepClick, isStepClickable } = useStepNavigation(
    currentStep,
    isStepCompleted,
    goToStep
  );

  const { submitRegistration, isSubmitting, submitError } =
    useRegistrationSubmit(registrationType);

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

    // Registration type
    registrationType,

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

    // Subscription plans data
    subscriptionPlans,
    plansLoading,

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
