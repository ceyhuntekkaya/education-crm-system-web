import { useCallback, useState, useRef, useEffect, useMemo } from "react";
import { useForm } from "@/contexts/form-context";

/**
 * Doğrulama kodu akışı - email'e kod gönderme ve doğrulama
 * Kurum kaydındaki ile aynı yapı
 */
export const useVerificationFlow = () => {
  const { values, setValue } = useForm();
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );

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
    const email =
      values?.loginCredentials?.email || values?.personalInfo?.email || "";
    if (!email) {
      throw new Error("Email adresi bulunamadı");
    }
    setIsVerifying(true);
    try {
      // Mock implementation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCodeSent(true);
      setResendTimer(60); // 60 saniye bekleme
    } catch (error) {
      setVerificationError("Kod gönderilirken hata oluştu");
    } finally {
      setIsVerifying(false);
    }
  }, [values]);

  /**
   * Girilen kodu doğrula
   */
  const verifyCode = useCallback(
    async (code: string): Promise<boolean> => {
      const email =
        values?.loginCredentials?.email || values?.personalInfo?.email || "";
      if (!email) {
        throw new Error("Email adresi bulunamadı");
      }
      setIsVerifying(true);
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
    },
    [values]
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

      // İlgili kod alanını güncelle (code1, code2, code3, code4)
      const codeKey = `code${index + 1}`;
      setValue(`verificationCode.${codeKey}`, value);

      // Otomatik olarak sonraki input'a geç
      if (value && index < 3) {
        inputRefs[index + 1].current?.focus();
      }
    },
    [setValue, inputRefs]
  );

  /**
   * Form values'dan kodu al
   */
  const getCodeValue = useCallback(
    (index: number): string => {
      const codeKey = `code${index + 1}`;
      return values?.verificationCode?.[codeKey] || "";
    },
    [values]
  );

  /**
   * Backspace ile geri gitme
   */
  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent) => {
      const codeKey = `code${index + 1}`;
      const currentValue = values?.verificationCode?.[codeKey] || "";

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
        setValue("verificationCode.code1", pastedData[0]);
        setValue("verificationCode.code2", pastedData[1]);
        setValue("verificationCode.code3", pastedData[2]);
        setValue("verificationCode.code4", pastedData[3]);
        inputRefs[3].current?.focus();
      }
    },
    [setValue, inputRefs]
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

    // Input Refs & Handlers
    inputRefs,
    fullCode,
    handleInputChange,
    handleKeyDown,
    handlePaste,
    getCodeValue,
  };
};
