import { useState } from "react";

/**
 * Mock verification hook - gerçek implementation institution'dan alınacak
 */
export const useVerification = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );

  const sendVerificationCode = async (email: string) => {
    setIsVerifying(true);
    setVerificationError(null);
    try {
      // Mock implementation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return true;
    } catch (error) {
      setVerificationError("Kod gönderilirken hata oluştu");
      return false;
    } finally {
      setIsVerifying(false);
    }
  };

  const verifyCode = async (email: string, code: string) => {
    setIsVerifying(true);
    setVerificationError(null);
    try {
      // Mock implementation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return true;
    } catch (error) {
      setVerificationError("Doğrulama başarısız");
      return false;
    } finally {
      setIsVerifying(false);
    }
  };

  return {
    sendVerificationCode,
    verifyCode,
    isVerifying,
    verificationError,
  };
};
