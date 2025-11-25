"use client";

import { useRegisterStep1 } from "./use-register-step-1";
import { useRegisterStep2 } from "./use-register-step-2";
import { useRegisterStep3 } from "./use-register-step-3";
import { useRegisterStep4 } from "./use-register-step-4";
import { useRegisterStep5 } from "./use-register-step-5";
import { useRegisterStep6 } from "./use-register-step-6";
import { useRegisterStep7 } from "./use-register-step-7";

/**
 * Register API Steps Hook
 * Tüm step API hook'larını tek bir hook'ta toplar ve loading state'lerini döner
 */
export const useRegisterApiSteps = () => {
  // Step API hooks - Her step için ayrı API hook
  const { isLoading: step1Loading } = useRegisterStep1();
  const { isLoading: step2Loading } = useRegisterStep2();
  const { isLoading: step3Loading } = useRegisterStep3();
  const { isLoading: step4Loading } = useRegisterStep4();
  const { isLoading: step5Loading } = useRegisterStep5();
  const { isLoading: step6Loading } = useRegisterStep6();
  const { isLoading: step7Loading } = useRegisterStep7();

  // Genel loading state
  const isLoading =
    step1Loading ||
    step2Loading ||
    step3Loading ||
    step4Loading ||
    step5Loading ||
    step6Loading ||
    step7Loading;

  return {
    step1Loading,
    step2Loading,
    step3Loading,
    step4Loading,
    step5Loading,
    step6Loading,
    step7Loading,
    isLoading,
  };
};
