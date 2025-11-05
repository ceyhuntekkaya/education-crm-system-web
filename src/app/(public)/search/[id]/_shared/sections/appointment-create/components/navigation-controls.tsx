/**
 * Navigation controls component for appointment form
 * Register form mimarisini takip eder
 */

"use client";

import React from "react";
import { useAppointment } from "../contexts";
import { Button } from "@/components";

export const NavigationControls: React.FC = () => {
  const {
    currentStep,
    totalSteps,
    nextStep,
    previousStep,
    submitForm,
    isSubmitting,
    canProceedToNextStep,
  } = useAppointment();

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  const handleNext = async () => {
    if (isLastStep) {
      await submitForm();
    } else {
      nextStep();
    }
  };

  const getButtonText = () => {
    if (isSubmitting) {
      return "İşleniyor...";
    }

    if (isLastStep) {
      return "Randevu Oluştur";
    }

    return "Sonraki";
  };

  // Sonraki butonu disabled olmalı mı?
  const isNextDisabled = isSubmitting || !canProceedToNextStep();

  return (
    <div className="d-flex justify-content-between align-items-center pt-24 mt-24 border-top border-neutral-30">
      {!isFirstStep && (
        <Button
          type="button"
          variant="outline"
          onClick={previousStep}
          disabled={isSubmitting}
        >
          <i className="ph ph-arrow-left me-2" />
          Önceki
        </Button>
      )}

      {isFirstStep && <div></div>}

      <Button type="button" onClick={handleNext} disabled={isNextDisabled}>
        {getButtonText()}
        {!isLastStep && <i className="ph ph-arrow-right ms-2" />}
        {isLastStep && <i className="ph ph-check ms-2" />}
      </Button>
    </div>
  );
};
