"use client";

import { useCallback } from "react";
import { useAppointment } from "../../contexts";
import { FormStep } from "../../types";

/**
 * Navigation hook for appointment creation steps
 */
export const useAppointmentNavigation = () => {
  const {
    currentStep,
    steps,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    goToStep,
    goToNextStep,
    goToPreviousStep,
  } = useAppointment();

  // Navigate to next step
  const handleNextStep = useCallback(async () => {
    return await goToNextStep();
  }, [goToNextStep]);

  // Navigate to previous step
  const handlePreviousStep = useCallback(() => {
    goToPreviousStep();
  }, [goToPreviousStep]);

  // Navigate to specific step
  const handleGoToStep = useCallback(
    (targetStep: FormStep) => {
      goToStep(targetStep);
    },
    [goToStep]
  );

  return {
    // Current state
    currentStep,
    steps,
    currentStepIndex,
    isFirstStep,
    isLastStep,

    // Navigation actions
    next: handleNextStep,
    previous: handlePreviousStep,
    goTo: handleGoToStep,
  };
};
