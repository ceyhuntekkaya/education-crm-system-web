"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import CustomCard from "@/components/ui/custom-card";
import { useRegister } from "../context";
import { useForm } from "@/contexts/form-context";

/**
 * Step 3: Verification Code
 * 4 basamaklı doğrulama kodu girişi
 */
export const VerificationCodeStep: React.FC = () => {
  const {
    sendVerificationCode,
    isVerifying,
    codeSent,
    resendTimer,
    inputRefs,
    fullCode,
    handleInputChange,
    handleKeyDown,
    handlePaste,
    getCodeValue,
  } = useRegister();
  const { values } = useForm();

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
              <div className="d-flex justify-content-center">
                <Button
                  type="button"
                  variant="success"
                  onClick={sendVerificationCode}
                  disabled={isVerifying}
                  className="btn-lg px-32"
                  leftIcon={!isVerifying ? "ph-envelope-simple" : undefined}
                  loading={isVerifying}
                >
                  {isVerifying ? "Gönderiliyor..." : "Doğrulama Kodu Gönder"}
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="d-flex justify-content-center gap-16 mb-24">
                {inputRefs.map(
                  (ref: React.RefObject<HTMLInputElement>, index: number) => (
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
                  )
                )}
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
                      onClick={sendVerificationCode}
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
