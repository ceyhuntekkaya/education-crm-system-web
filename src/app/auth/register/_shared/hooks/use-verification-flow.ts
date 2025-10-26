import { useCallback, useState, useRef, useEffect, useMemo } from "react";
import { useForm } from "@/contexts/form-context";
import { useVerification } from "./use-verification";

/**
 * Doğrulama kodu akışı - email'e kod gönderme ve doğrulama
 * UI state ve fonksiyonlarını da içerir
 */
export const useVerificationFlow = () => {
  const { values, setValue } = useForm();
  const {
    sendVerificationCode: sendCode,
    verifyCode: verifyCodeFn,
    isVerifying,
    verificationError,
  } = useVerification();

  // UI State
  const [codeSent, setCodeSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  // Input refs - her biri ayrı tanımlandı
  const inputRef0 = useRef<HTMLInputElement>(null);
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const inputRef3 = useRef<HTMLInputElement>(null);

  const inputRefs = useMemo(
    () => [inputRef0, inputRef1, inputRef2, inputRef3],
    [inputRef0, inputRef1, inputRef2, inputRef3]
  );

  /**
   * Form'daki email adresine doğrulama kodu gönder
   */
  const sendVerificationCode = useCallback(async () => {
    const email = values?.personalInfo?.email || "";
    if (!email) {
      throw new Error("Email adresi bulunamadı");
    }
    await sendCode(email);
    setCodeSent(true);
    setResendTimer(60); // 60 saniye bekleme
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

  // Resend timer - countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  /**
   * Input değişikliği handler
   */
  const handleInputChange = useCallback(
    (index: number, value: string) => {
      // Sadece rakam kabul et
      if (!/^\d*$/.test(value)) return;

      // İlgili kod alanını güncelle (digit1, digit2, digit3, digit4)
      const digitKey = `digit${index + 1}`;
      setValue(`verificationCode.${digitKey}`, value);

      // Otomatik olarak sonraki input'a geç
      if (value && index < 3) {
        inputRefs[index + 1].current?.focus();
      }
    },
    [setValue, inputRefs]
  );

  /**
   * Backspace ile geri gitme
   */
  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent) => {
      const digitKey = `digit${index + 1}`;
      const currentValue = values?.verificationCode?.[digitKey] || "";

      if (e.key === "Backspace" && !currentValue && index > 0) {
        inputRefs[index - 1].current?.focus();
      }
    },
    [values, inputRefs]
  );

  /**
   * Paste işlemi
   */
  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pastedData = e.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, 4);

      if (pastedData.length === 4) {
        setValue("verificationCode.digit1", pastedData[0]);
        setValue("verificationCode.digit2", pastedData[1]);
        setValue("verificationCode.digit3", pastedData[2]);
        setValue("verificationCode.digit4", pastedData[3]);
        inputRefs[3].current?.focus();
      }
    },
    [setValue, inputRefs]
  );

  /**
   * Form values'dan kodu al
   */
  const getCodeValue = useCallback(
    (index: number): string => {
      const digitKey = `digit${index + 1}`;
      return values?.verificationCode?.[digitKey] || "";
    },
    [values]
  );

  /**
   * Tam kodu al (4 haneli)
   */
  const fullCode = [
    getCodeValue(0),
    getCodeValue(1),
    getCodeValue(2),
    getCodeValue(3),
  ].join("");

  return {
    // API Actions
    sendVerificationCode,
    verifyCode,
    isVerifying,
    verificationError,

    // UI State
    codeSent,
    resendTimer,
    inputRefs,
    fullCode,

    // UI Handlers
    handleInputChange,
    handleKeyDown,
    handlePaste,
    getCodeValue,
  };
};
