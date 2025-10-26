"use client";

import { useState, useCallback } from "react";
import { useSnackbar } from "@/contexts/snackbar-context";

/**
 * Email verification hook
 */
export const useVerification = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );
  const { showSnackbar } = useSnackbar();

  /**
   * Doğrulama kodu gönderme
   */
  const sendVerificationCode = useCallback(
    async (email: string): Promise<void> => {
      setIsVerifying(true);
      setVerificationError(null);

      try {
        // TODO: API entegrasyonu
        // await apiClient.post("/auth/send-verification-code", { email });

        // Mock delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        showSnackbar(
          "Doğrulama kodu e-posta adresinize gönderildi.",
          "success"
        );
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "Doğrulama kodu gönderilemedi";
        setVerificationError(errorMessage);

        showSnackbar(errorMessage, "error");
      } finally {
        setIsVerifying(false);
      }
    },
    [showSnackbar]
  );

  /**
   * Doğrulama kodunu kontrol etme
   */
  const verifyCode = useCallback(
    async (email: string, code: string): Promise<boolean> => {
      setIsVerifying(true);
      setVerificationError(null);

      try {
        // TODO: API entegrasyonu
        // const response = await apiClient.post("/auth/verify-code", { email, code });

        // Mock delay & validation
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock: 1234 kabul ediliyor
        if (code === "1234") {
          showSnackbar("E-posta adresiniz başarıyla doğrulandı.", "success");
          return true;
        } else {
          throw new Error("Geçersiz doğrulama kodu");
        }
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "Geçersiz doğrulama kodu";
        setVerificationError(errorMessage);

        showSnackbar(errorMessage, "error");

        return false;
      } finally {
        setIsVerifying(false);
      }
    },
    [showSnackbar]
  );

  return {
    sendVerificationCode,
    verifyCode,
    isVerifying,
    verificationError,
  };
};
