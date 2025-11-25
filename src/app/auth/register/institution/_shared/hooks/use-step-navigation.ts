import { useCallback } from "react";

/**
 * Step navigation ve tıklama kontrolü
 * Sadece tamamlanmış veya geçmiş step'lere geçiş yapılabilir
 */
export const useStepNavigation = (
  currentStep: number,
  isStepCompleted: (step: number) => boolean,
  goToStep: (step: number) => void
) => {
  /**
   * Step'e tıklama handler'ı
   * Sadece tamamlanmış veya geçmiş step'lere gidilebilir
   * Step 7 (Success) asla tıklanamaz
   */
  const handleStepClick = useCallback(
    (step: number) => {
      // Step 7'ye direkt geçiş yasak
      if (step === 7) return;
      
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
   * Step 7 (Success) asla tıklanamaz
   */
  const isStepClickable = useCallback(
    (step: number): boolean => {
      // Step 7'ye direkt geçiş yasak
      if (step === 7) return false;
      
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
