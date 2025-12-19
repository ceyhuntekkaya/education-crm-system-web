"use client";

import React, { useEffect, useState } from "react";
import { useRegister } from "../context";
import { useSendVerificationCode } from "../hooks";
import { useRegisterStep3 } from "../hooks/use-register-step-3";
import { useAuth } from "@/contexts/auth-context";
import LoadingSpinner from "@/components/ui/loadings/loading-spinner";

/**
 * Step 3 Demo: Verification Code Demo
 * Demo amaçlı doğrulama kodu adımı
 * Sayfa yüklendiğinde otomatik olarak:
 * 1. Doğrulama kodu gönderir
 * 2. Ardından otomatik olarak 1234 kodu ile confirm API'sine istek atar
 * 3. Başarılı olursa bir sonraki adıma geçer
 */
export const VerificationCodeStepDemo: React.FC = () => {
  const { nextStep, userId, setUserId } = useRegister();
  const { user } = useAuth();
  const { sendVerificationCodeToEmail } = useSendVerificationCode();
  const { submitConfirm } = useRegisterStep3(false); // snackbar kapalı
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const autoComplete = async () => {
      try {
        setIsProcessing(true);

        // 1. Önce doğrulama kodu gönder
        const emailSent = await sendVerificationCodeToEmail();

        if (emailSent) {
          // 2. Email başarılı gönderildiyse, otomatik olarak confirm API'sine istek at
          // userId'yi context'ten al, yoksa auth'tan al
          const authUserId = user?.id;
          const effectiveUserId = userId || authUserId;

          if (effectiveUserId) {
            const payload = {
              userId: effectiveUserId,
              code: "1234",
            };

            const response = await submitConfirm(payload);

            if (response?.success) {
              // userId'yi set et (eğer yoksa)
              if (!userId && effectiveUserId) {
                setUserId(effectiveUserId);
              }
              // 3. Başarılıysa bir sonraki adıma geç
              nextStep();
            }
          }
        }
      } finally {
        setIsProcessing(false);
      }
    };

    autoComplete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isProcessing) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "400px" }}
      >
        <LoadingSpinner message="" size="lg" variant="dots" />
      </div>
    );
  }

  return null;
};
