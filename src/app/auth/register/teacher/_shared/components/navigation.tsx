"use client";

import React from "react";
import { useTeacherRegister } from "../context";
import { Button } from "@/components/ui";

interface NavigationProps {
  onSubmit: () => void;
  isLoading?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const {
    currentStep,
    previousStep,
    totalSteps,
    canProceedToNextStep,
  } = useTeacherRegister();

  // Success step'te navigation gösterme (Eğitim Kurumu ile aynı)
  if (currentStep === 3) {
    return null;
  }

  const canProceed = canProceedToNextStep();
  const getButtonText = () => {
    if (currentStep === 1) return "Devam Et";
    if (currentStep === 2) return "Kaydı Tamamla";
    return "Devam Et";
  };

  return (
    <div className="register-navigation mt-32 pt-24 border-top">
      <div className="d-flex justify-content-between align-items-center">
        {/* Back Button */}
        {currentStep > 1 ? (
          <Button
            type="button"
            variant="outline"
            onClick={previousStep}
            leftIcon="ph-arrow-left"
            disabled={isLoading}
          >
            Geri
          </Button>
        ) : (
          <div />
        )}

        {/* Adım göstergesi (Eğitim Kurumu kaydındaki gibi) */}
        <span className="text-neutral-600 text-sm">
          Adım {currentStep} / {totalSteps}
        </span>

        {/* Next/Submit Button - Geçerli adım tamamlanmadan devam devre dışı */}
        <Button
          type="button"
          variant="inline"
          onClick={onSubmit}
          rightIcon="ph-arrow-right"
          loading={isLoading}
          disabled={isLoading || !canProceed}
        >
          {getButtonText()}
        </Button>
      </div>
    </div>
  );
};
