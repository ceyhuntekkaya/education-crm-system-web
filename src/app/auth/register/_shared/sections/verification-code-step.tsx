"use client";

import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import CustomCard from "@/components/ui/custom-card";
import { useRegister } from "../context";
import { useForm } from "@/contexts/form-context";

/**
 * Step 3: Verification Code
 * 4 basamaklı doğrulama kodu girişi
 */
export const VerificationCodeStep: React.FC = () => {
  const { sendVerificationCode, verifyCode, isVerifying } = useRegister();
  const { values, setValue } = useForm();

  const [codeSent, setCodeSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Doğrulama kodunu gönder
  const handleSendCode = async () => {
    await sendVerificationCode();
    setCodeSent(true);
    setResendTimer(60); // 60 saniye bekleme
  };

  // Resend timer
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // Input değişikliği
  const handleInputChange = (index: number, value: string) => {
    // Sadece rakam kabul et
    if (!/^\d*$/.test(value)) return;

    // İlgili kod alanını güncelle (digit1, digit2, digit3, digit4)
    const digitKey = `digit${index + 1}`;
    setValue(`verificationCode.${digitKey}`, value);

    // Otomatik olarak sonraki input'a geç
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  // Backspace ile geri gitme
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    const digitKey = `digit${index + 1}`;
    const currentValue = values?.verificationCode?.[digitKey] || "";

    if (e.key === "Backspace" && !currentValue && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  // Paste işlemi
  const handlePaste = (e: React.ClipboardEvent) => {
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
  };

  // Form values'dan kodu al
  const getCodeValue = (index: number): string => {
    const digitKey = `digit${index + 1}`;
    return values?.verificationCode?.[digitKey] || "";
  };

  const fullCode = [
    getCodeValue(0),
    getCodeValue(1),
    getCodeValue(2),
    getCodeValue(3),
  ].join("");

  return (
    <div className="register-step-content">
      {/* Verification Card */}
      <CustomCard
        title="E-posta Doğrulama"
        subtitle={
          <>
            <strong className="text-main-600">
              {values?.personalInfo?.email || ""}
            </strong>{" "}
            adresine gönderilen 4 haneli doğrulama kodunu giriniz
          </>
        }
      >
        <div className="verification-code-container">
          {!codeSent ? (
            <div className="text-center">
              <p className="text-neutral-600 mb-24">
                E-posta adresinize doğrulama kodu göndermek için aşağıdaki
                butona tıklayın
              </p>
              <Button
                type="button"
                variant="success"
                onClick={handleSendCode}
                disabled={isVerifying}
                className="btn-lg px-32"
              >
                {isVerifying ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-8"
                      role="status"
                      aria-hidden="true"
                    />
                    Gönderiliyor...
                  </>
                ) : (
                  <>
                    <i className="ph-bold ph-envelope-simple me-8" />
                    Doğrulama Kodu Gönder
                  </>
                )}
              </Button>
            </div>
          ) : (
            <>
              <div className="d-flex justify-content-center gap-16 mb-24">
                {inputRefs.map((ref, index) => (
                  <input
                    key={index}
                    ref={ref}
                    type="text"
                    maxLength={1}
                    className="verification-input"
                    value={getCodeValue(index)}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    disabled={isVerifying}
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              <div className="text-center">
                <p className="text-neutral-600 mb-16">
                  Kodu almadınız mı?{" "}
                  {resendTimer > 0 ? (
                    <span className="text-neutral-500">
                      ({resendTimer} saniye sonra tekrar gönderebilirsiniz)
                    </span>
                  ) : (
                    <button
                      type="button"
                      className="btn-link text-main-600 fw-semibold"
                      onClick={handleSendCode}
                      disabled={isVerifying}
                    >
                      Tekrar Gönder
                    </button>
                  )}
                </p>

                {fullCode.length === 4 && (
                  <div className="mt-16">
                    <p className="text-success-600 fw-medium">
                      <i className="ph-bold ph-check-circle me-8" />
                      Kod girişi tamamlandı
                    </p>
                    <small className="text-neutral-500">
                      Test için kod: 1234
                    </small>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </CustomCard>
    </div>
  );
};
