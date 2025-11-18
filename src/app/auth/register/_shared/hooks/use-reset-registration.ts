"use client";

import { useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useForm } from "@/contexts/form-context";

/**
 * Reset Registration Hook
 * Tüm kayıt state'ini sıfırlar ve pathname değişikliklerini dinler
 */
export const useResetRegistration = (
  setCurrentStep: (step: number) => void,
  setUserId: (userId: number | null) => void
) => {
  const { reset: resetForm } = useForm();
  const pathname = usePathname();

  const resetRegistration = useCallback(() => {
    // Form values'ları sıfırla
    resetForm();

    // Step'i 1'e resetle
    setCurrentStep(1);

    // User ID'yi temizle
    setUserId(null);

    console.log("🔄 Kayıt formu sıfırlandı");
  }, [resetForm, setCurrentStep, setUserId]);

  // Pathname değişikliklerini dinle - /auth/login'e gidildiğinde sıfırla
  useEffect(() => {
    // Eğer /auth/login sayfasına gidildiyse tüm register state'ini sıfırla
    if (pathname === "/auth/login") {
      resetRegistration();
    }
  }, [pathname, resetRegistration]);

  return { resetRegistration };
};
