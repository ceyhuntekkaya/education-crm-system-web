import { useCallback } from "react";
import { useForm } from "@/contexts/form-context";
import { useVerification } from "./use-verification";

/**
 * Doğrulama kodu akışı - email'e kod gönderme ve doğrulama
 */
export const useVerificationFlow = () => {
  const { values } = useForm();
  const {
    sendVerificationCode: sendCode,
    verifyCode: verifyCodeFn,
    isVerifying,
    verificationError,
  } = useVerification();

  /**
   * Form'daki email adresine doğrulama kodu gönder
   */
  const sendVerificationCode = useCallback(async () => {
    const email = values?.personalInfo?.email || "";
    if (!email) {
      throw new Error("Email adresi bulunamadı");
    }
    await sendCode(email);
  }, [values, sendCode]);

  /**
   * Girilen kodu doğrula
   */
  const verifyCode = useCallback(
    async (code: string): Promise<boolean> => {
      const email = values?.personalInfo?.email || "";
      if (!email) {
        throw new Error("Email adresi bulunamadı");
      }
      return await verifyCodeFn(email, code);
    },
    [values, verifyCodeFn]
  );

  return {
    sendVerificationCode,
    verifyCode,
    isVerifying,
    verificationError,
  };
};
