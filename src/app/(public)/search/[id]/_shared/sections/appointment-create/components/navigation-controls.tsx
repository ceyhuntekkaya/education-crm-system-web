/**
 * Navigation controls component for appointment form
 */

"use client";

import React from "react";
import { useAppointment } from "../contexts";
import { Button } from "@/components";

export const NavigationControls: React.FC = () => {
  const {
    goToNextStep,
    goToPreviousStep,
    isFirstStep,
    isLastStep,
    submitForm,
    isSubmitting,
  } = useAppointment();

  const handleNext = async () => {
    if (isLastStep) {
      await submitForm();
    } else {
      await goToNextStep();
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

  return (
    <div className="d-flex justify-content-between align-items-center pt-24 mt-24 border-top border-neutral-30">
      {!isFirstStep && (
        <Button
          type="button"
          variant="outline"
          onClick={goToPreviousStep}
          disabled={isSubmitting}
        >
          Önceki
        </Button>
      )}

      {isFirstStep && <div></div>}

      <Button type="button" onClick={handleNext} disabled={isSubmitting}>
        {getButtonText()}
      </Button>
    </div>
  );
};
