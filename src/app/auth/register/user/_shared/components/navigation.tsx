"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useUserRegister } from "../context";

interface NavigationProps {
  onSubmit?: () => void;
  isLoading?: boolean;
}

/**
 * User Register Navigation Component
 * Kurum kaydı stilinde - üç bölümlü layout
 */
export const Navigation: React.FC<NavigationProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const { currentStep, previousStep, canProceedToNextStep } = useUserRegister();

  const isFirstStep = currentStep === 1;
  const isSuccessStep = currentStep === 4;
  const isLastFormStep = currentStep === 3; // Verification step
  const totalSteps = 3; // Login, Personal, Verification (Success sayılmıyor)
  const canProceed = canProceedToNextStep(currentStep);

  // Success step'te navigation gösterme
  if (isSuccessStep) {
    return null;
  }

  return (
    <div className="step-navigation d-flex justify-content-between align-items-center mt-32 pt-24 border-top">
      <div>
        {!isFirstStep && (
          <Button
            type="button"
            variant="outline"
            onClick={previousStep}
            disabled={isLoading}
            className="btn-lg"
          >
            <i className="ph-bold ph-arrow-left me-8" />
            Geri
          </Button>
        )}
      </div>

      <div className="text-center">
        <span className="text-neutral-600 text-sm">
          Adım {currentStep} / {totalSteps}
        </span>
      </div>

      <div>
        {isLastFormStep ? (
          <Button
            type="button"
            variant="success"
            onClick={onSubmit}
            disabled={!canProceed || isLoading}
            className="btn-lg"
          >
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-8"
                  role="status"
                  aria-hidden="true"
                />
                Doğrulanıyor...
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
            onClick={onSubmit}
            disabled={!canProceed || isLoading}
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
