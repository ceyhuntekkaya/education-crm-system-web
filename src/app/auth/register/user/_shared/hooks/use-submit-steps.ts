"use client";

import { useSubmitStep1 } from "./use-submit-step-1";
import { useSubmitStep2 } from "./use-submit-step-2";
import { useSubmitStep3 } from "./use-submit-step-3";

/**
 * Submit Steps Handler Hook
 * Tüm step submit handler'larını toplar
 */
export const useSubmitSteps = (
  userId: number | null,
  setUserId: (id: number) => void,
  nextStep: () => void,
  fullCode: string
) => {
  const { handleSubmitStep1 } = useSubmitStep1(setUserId, nextStep);
  const { handleSubmitStep2 } = useSubmitStep2(userId, setUserId, nextStep);
  const { handleSubmitStep3 } = useSubmitStep3(
    userId,
    setUserId,
    nextStep,
    fullCode
  );

  const handleSubmitStep4 = async () => {
    // Success step - no action needed
  };

  return {
    handleSubmitStep1,
    handleSubmitStep2,
    handleSubmitStep3,
    handleSubmitStep4,
  };
};
