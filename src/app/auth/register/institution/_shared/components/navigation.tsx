"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRegister } from "../context";
import { TOTAL_STEPS } from "../constants";

/**
 * Step Navigation Component
 * İleri/Geri butonları
 */
export const StepNavigation: React.FC = () => {
  const {
    currentStep,
    previousStep,
    nextStep,
    canProceedToNextStep,
    isLoading,
    isSubmitting,
  } = useRegister();

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === TOTAL_STEPS;
  const canProceed = canProceedToNextStep();

  const handleNext = () => {
    if (!isLastStep) {
      nextStep();
    }
    // Son step'te form submit olacak (Form tag'inin onSubmit'i tetiklenecek)
  };

  return (
    <div className="step-navigation d-flex justify-content-between align-items-center mt-32 pt-24 border-top">
      <div>
        {!isFirstStep && (
          <Button
            type="button"
            variant="outline"
            onClick={previousStep}
            disabled={isLoading || isSubmitting}
            className="btn-lg"
          >
            <i className="ph-bold ph-arrow-left me-8" />
            Geri
          </Button>
        )}
      </div>

      <div className="text-center">
        <span className="text-neutral-600 text-sm">
          Adım {currentStep} / {TOTAL_STEPS}
        </span>
      </div>

      <div>
        {isLastStep ? (
          <Button
            type="submit"
            variant="success"
            disabled={!canProceed || isLoading || isSubmitting}
            className="btn-lg"
          >
            {isSubmitting ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-8"
                  role="status"
                  aria-hidden="true"
                />
                Kaydediliyor...
              </>
            ) : (
              <>
                Kaydı Tamamla
                <i className="ph-bold ph-check ms-8" />
              </>
            )}
          </Button>
        ) : (
          <Button
            type="button"
            variant="inline"
            onClick={handleNext}
            disabled={!canProceed || isLoading || isSubmitting}
            className="btn-lg"
          >
            İleri
            <i className="ph-bold ph-arrow-right ms-8" />
          </Button>
        )}
      </div>
    </div>
  );
};
