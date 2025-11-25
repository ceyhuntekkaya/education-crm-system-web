import { useCallback } from "react";

/**
 * Step navigation için click handler'ları
 * Şu an disabled - stepper'da step'lere tıklanamaz
 */
export const useStepNavigation = (
  currentStep: number,
  isStepCompleted: (step: number) => boolean,
  goToStep: (step: number) => void
) => {
  const handleStepClick = useCallback(() => {
    // Disabled
  }, []);

  const isStepClickable = useCallback(() => {
    return false; // Always disabled
  }, []);

  return {
    handleStepClick,
    isStepClickable,
  };
};
