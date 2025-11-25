"use client";

import { useSubmitStep1 } from "./use-submit-step-1";
import { useSubmitStep2 } from "./use-submit-step-2";
import { useSubmitStep3 } from "./use-submit-step-3";
import { useSubmitStep4 } from "./use-submit-step-4";
import { useSubmitStep5 } from "./use-submit-step-5";
import { useSubmitStep6 } from "./use-submit-step-6";
import { useSubmitStep7 } from "./use-submit-step-7";

/**
 * Submit Steps Hook
 * Tüm step submit handler'larını tek bir hook'ta toplar
 */
export const useSubmitSteps = (
  userId: number | null,
  setUserId: (id: number) => void,
  nextStep: () => void,
  fullCode: string
) => {
  // Submit handler hooks - Her step için ayrı submit logic
  const { handleSubmitStep1 } = useSubmitStep1(setUserId, nextStep);
  const { handleSubmitStep2 } = useSubmitStep2(userId, setUserId, nextStep);
  const { handleSubmitStep3 } = useSubmitStep3(
    userId,
    setUserId,
    nextStep,
    fullCode
  );
  const { handleSubmitStep4 } = useSubmitStep4(userId, setUserId, nextStep);
  const { handleSubmitStep5 } = useSubmitStep5(userId, setUserId, nextStep);
  const { handleSubmitStep6 } = useSubmitStep6(userId, setUserId, nextStep);
  const { handleSubmitStep7, handleSubmitStep7WithResponse } =
    useSubmitStep7(userId);

  return {
    handleSubmitStep1,
    handleSubmitStep2,
    handleSubmitStep3,
    handleSubmitStep4,
    handleSubmitStep5,
    handleSubmitStep6,
    handleSubmitStep7,
    handleSubmitStep7WithResponse,
  };
};
