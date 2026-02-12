"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type { TeacherRegisterContextType } from "../types/context-types";
import { useTeacherInstructorRegister, useStepValidation } from "../hooks";
import { getTotalSteps } from "../constants";
import { UserType } from "@/enums/UserType";

const TeacherRegisterContext = createContext<
  TeacherRegisterContextType | undefined
>(undefined);

interface TeacherRegisterProviderProps {
  children: React.ReactNode;
  registrationType: UserType.TEACHER | UserType.INSTRUCTOR;
}

export const TeacherRegisterProvider: React.FC<
  TeacherRegisterProviderProps
> = ({ children, registrationType }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const totalSteps = getTotalSteps(registrationType);
  const { isStepCompleted, canProceedToNextStep } = useStepValidation();
  const { handleSubmit: submitForm, isLoading } =
    useTeacherInstructorRegister(registrationType);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [totalSteps]);

  const previousStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  }, []);

  const handleStepClick = useCallback(
    (step: number) => {
      if (step < currentStep) setCurrentStep(step);
    },
    [currentStep],
  );

  const isStepClickable = useCallback(
    (step: number) => step < currentStep,
    [currentStep],
  );

  const handleSubmit = useCallback(async () => {
    await submitForm(currentStep, nextStep);
  }, [currentStep, nextStep, submitForm]);

  const contextValue: TeacherRegisterContextType = {
    currentStep,
    setCurrentStep,
    nextStep,
    previousStep,
    totalSteps,
    isStepCompleted,
    isStepClickable,
    canProceedToNextStep: (step?: number) =>
      canProceedToNextStep(step ?? currentStep),
    handleStepClick,
    handleSubmit,
    isLoading,
    registrationType,
    error,
  };

  return (
    <TeacherRegisterContext.Provider value={contextValue}>
      {children}
    </TeacherRegisterContext.Provider>
  );
};

export const useTeacherRegister = () => {
  const context = useContext(TeacherRegisterContext);
  if (context === undefined) {
    throw new Error(
      "useTeacherRegister must be used within TeacherRegisterProvider",
    );
  }
  return context;
};
