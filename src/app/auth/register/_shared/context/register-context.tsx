"use client";

import React, { createContext, useContext, useState } from "react";
import type { RegisterContextType } from "../types/context-types";
import {
  useRegisterSteps,
  useStepValidation,
  useStepNavigation,
  useVerificationFlow,
  useLocationData,
  useBrandData,
  useFormPrefill,
  useRegisterApiSteps,
  useSubmitSteps,
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
  // User ID state (backend'den dönen)
  const [userId, setUserId] = useState<number | null>(null);

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

  // TODO: Step navigation temporarily disabled - stepper steps are not clickable
  // const { handleStepClick, isStepClickable } = useStepNavigation(
  //   currentStep,
  //   isStepCompleted,
  //   goToStep
  // );

  // Temporary disabled step navigation handlers
  const handleStepClick = () => {}; // Disabled
  const isStepClickable = () => false; // Always return false

  // Verification flow hook
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

  // Step API loading states hook
  const { isLoading } = useRegisterApiSteps();

  // Submit handler hooks - Tüm step submit logic'leri
  const {
    handleSubmitStep1,
    handleSubmitStep2,
    handleSubmitStep3,
    handleSubmitStep4,
    handleSubmitStep5,
    handleSubmitStep6,
    handleSubmitStep7,
    handleSubmitStep7WithResponse,
  } = useSubmitSteps(userId, setUserId, nextStep, fullCode);

  // Context value
  const contextValue: RegisterContextType = {
    // Form data
    formData: values as any,

    // Registration type
    registrationType,

    // User ID
    userId,
    setUserId,

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
    isLoading,
    isVerifying,
    isSubmitting: isLoading,

    // Errors
    error: verificationError,
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

    // Step Actions
    submitStep1: handleSubmitStep1,
    submitStep2: handleSubmitStep2,
    submitStep3: handleSubmitStep3,
    submitStep4: handleSubmitStep4,
    submitStep5: handleSubmitStep5,
    submitStep6: handleSubmitStep6,
    submitStep7: handleSubmitStep7,

    // Actions
    updateFormData: () => {}, // FormProvider handles this
    sendVerificationCode,
    verifyCode,
    submitRegistration: handleSubmitStep7WithResponse, // Son adımda çağrılacak (legacy uyumluluk için)
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
