/**
 * Navigation controls component for appointment form
 */

"use client";

import React from "react";
import {
  useAppointmentNavigation,
  useAppointmentSubmission,
} from "../hooks/context-hooks";

export const NavigationControls: React.FC = () => {
  const { next, previous, isFirstStep, isLastStep } =
    useAppointmentNavigation();
  const { submit, isSubmitting } = useAppointmentSubmission();

  const handleNext = async () => {
    if (isLastStep) {
      await submit();
    } else {
      await next();
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
    <div className="navigation-controls">
      {!isFirstStep && (
        <button
          type="button"
          onClick={previous}
          className="btn btn-outline"
          disabled={isSubmitting}
        >
          Önceki
        </button>
      )}

      <button
        type="button"
        onClick={handleNext}
        className="btn btn-primary"
        disabled={isSubmitting}
      >
        {getButtonText()}
      </button>
    </div>
  );
};
