"use client";

import React, { createContext, useContext, useState } from "react";
import type { UserRegisterContextType } from "../types/context-types";
import {
  useRegisterSteps,
  useStepValidation,
  useVerificationFlow,
  useRegisterApiSteps,
} from "../hooks";
import { useSubmitStep3 } from "../hooks/use-submit-step-3";
import { useForm } from "@/contexts/form-context";
import { UserType } from "@/enums/UserType";

type RegistrationType = UserType;

const UserRegisterContext = createContext<UserRegisterContextType | undefined>(
  undefined
);

interface UserRegisterProviderProps {
  children: React.ReactNode;
  registrationType?: RegistrationType;
}

export const UserRegisterProvider: React.FC<UserRegisterProviderProps> = ({
  children,
  registrationType = UserType.PARENT,
}) => {
  const [userId, setUserId] = useState<number | null>(null);

  const { values } = useForm();

  const { currentStep, setCurrentStep, nextStep, previousStep, goToStep } =
    useRegisterSteps(registrationType);

  const { isStepCompleted, canProceedToNextStep } = useStepValidation();

  const handleStepClick = () => {};
  const isStepClickable = () => false;

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

  const { isLoading } = useRegisterApiSteps();

  // Sadece step 3 submit handler - tüm verileri tek seferde gönderir
  const { handleSubmitStep3 } = useSubmitStep3(
    userId,
    setUserId,
    nextStep,
    fullCode
  );

  const contextValue: UserRegisterContextType = {
    currentStep,
    setCurrentStep,
    nextStep,
    previousStep,
    goToStep,
    isStepCompleted,
    canProceedToNextStep,
    handleStepClick,
    isStepClickable,
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
    isLoading,
    handleSubmitStep3,
    userId,
    setUserId,
  };

  return (
    <UserRegisterContext.Provider value={contextValue}>
      {children}
    </UserRegisterContext.Provider>
  );
};

export const useUserRegister = () => {
  const context = useContext(UserRegisterContext);
  if (context === undefined) {
    throw new Error("useUserRegister must be used within UserRegisterProvider");
  }
  return context;
};
