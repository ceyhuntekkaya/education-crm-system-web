"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRegister } from "../context";
import { getTotalSteps } from "../constants";

/**
 * Step Navigation Component
 * İleri/Geri butonları
 * Her step'te ileri basıldığında API isteği atar
 */
export const StepNavigation: React.FC = () => {
  const {
    currentStep,
    previousStep,
    nextStep,
    canProceedToNextStep,
    isLoading,
    isSubmitting,
    registrationType,
    submitStep1,
    submitStep2,
    submitStep3,
    submitStep4,
    submitStep5,
    submitStep6,
    submitStep7,
  } = useRegister();

  const totalSteps = getTotalSteps(registrationType);
  const isFirstStep = currentStep === 1;
  const isSuccessStep = currentStep === 7; // Step 7 success page
  const isLastFormStep = currentStep === 6; // Step 6 son form adımı
  const canProceed = canProceedToNextStep();

  const handleNext = async () => {
    // Her step'te ilgili API isteğini at
    switch (currentStep) {
      case 1:
        await submitStep1();
        break;
      case 2:
        await submitStep2();
        break;
      case 3:
        await submitStep3();
        break;
      case 4:
        await submitStep4();
        break;
      case 5:
        await submitStep5();
        break;
      case 6:
        await submitStep6();
        break;
      case 7:
        await submitStep7();
        break;
      default:
        break;
    }
  };

  // Step 7 (success page) için navigation'ı gizle
  if (isSuccessStep) {
    return null;
  }

  return (
    <div className="step-navigation d-flex justify-content-between align-items-center mt-32 pt-24 border-top">
      <div>
        {/* {!isFirstStep && (
          <Button
            type="button"
            variant="outline"
            onClick={previousStep}
            // disabled={isLoading || isSubmitting}
            disabled={true}
            className="btn-lg"
          >
            <i className="ph-bold ph-arrow-left me-8" />
            Geri
          </Button>
        )} */}
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
            onClick={handleNext}
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
