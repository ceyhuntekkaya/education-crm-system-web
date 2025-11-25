"use client";

import { useCallback, useState } from "react";
import { useSnackbar } from "@/contexts/snackbar-context";

/**
 * Email verification hook
 * Sadece Step 3'te kullanılacak
 * Backend'de GET /register/send endpoint'i var ama şu an kullanılmıyor
 * Doğrulama kodu kontrolü Step 3'te submitStep3() ile yapılacak
 */
export const useVerification = () => {
  const { showSnackbar } = useSnackbar();
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  /**
   * Doğrulama kodu gönderme
   * Backend'de GET /register/send endpoint'i var (email service test için)
   * Gerçek kullanımda email Step 2'de kaydediliyor, 
   * backend otomatik olarak kod gönderecek
   */
  const sendVerificationCode = useCallback(
    async (email: string): Promise<void> => {
      try {
        setIsVerifying(true);
        setVerificationError(null);
        
        // Mock delay - Backend otomatik olarak kod gönderecek
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        showSnackbar(
          "Doğrulama kodu e-posta adresinize gönderildi.",
          "success"
        );
      } catch (err: any) {
        const errorMessage = "Doğrulama kodu gönderilemedi";
        setVerificationError(errorMessage);
        showSnackbar(errorMessage, "error");
        throw err;
      } finally {
        setIsVerifying(false);
      }
    },
    [showSnackbar]
  );

  /**
   * Doğrulama kodunu kontrol etme
   * Gerçek kontrol Step 3'te submitStep3() ile yapılacak
   */
  const verifyCode = useCallback(
    async (email: string, code: string): Promise<boolean> => {
      // Bu fonksiyon Step 3'te kullanılmayacak
      // submitStep3() direkt API'ye istek atacak
      return true;
    },
    []
  );

  return {
    sendVerificationCode,
    verifyCode,
    isVerifying,
    verificationError,
  };
};
