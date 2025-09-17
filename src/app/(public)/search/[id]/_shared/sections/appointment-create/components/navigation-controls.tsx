/**
 * Navigation controls component for appointment form
 */

"use client";

import React from "react";
import {
  useAppointmentNavigation,
  useAppointmentSubmission,
} from "../hooks/context-hooks";
import { Button } from "@/components";

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
        <Button
          type="button"
          variant="outline"
          onClick={previous}
          disabled={isSubmitting}
        >
          Önceki
        </Button>
      )}

      <Button type="button" onClick={handleNext} disabled={isSubmitting}>
        {getButtonText()}
      </Button>
    </div>
  );
};
