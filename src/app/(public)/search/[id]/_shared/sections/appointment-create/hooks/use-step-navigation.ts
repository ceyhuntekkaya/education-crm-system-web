import { useCallback } from "react";

/**
 * Step navigation ve tıklama kontrolü
 * Sadece tamamlanmış veya geçmiş step'lere geçiş yapılabilir
 * Register form mimarisini takip eder
 */
export const useStepNavigation = (
  currentStep: number,
  isStepCompleted: (step: number) => boolean,
  goToStep: (step: number) => void
) => {
  /**
   * Step'e tıklama handler'ı
   * Sadece tamamlanmış veya geçmiş step'lere gidilebilir
   */
  const handleStepClick = useCallback(
    (step: number) => {
      const isPast = currentStep > step;
      const isCompleted = isStepCompleted(step);

      // Sadece tamamlanmış veya geçmiş step'lere izin ver
      if (isPast || isCompleted) {
        goToStep(step);
      }
    },
    [currentStep, isStepCompleted, goToStep]
  );

  /**
   * Step'in tıklanabilir olup olmadığını kontrol eder
   */
  const isStepClickable = useCallback(
    (step: number): boolean => {
      const isPast = currentStep > step;
      const isCompleted = isStepCompleted(step);
      return isPast || isCompleted;
    },
    [currentStep, isStepCompleted]
  );

  return {
    handleStepClick,
    isStepClickable,
  };
};
