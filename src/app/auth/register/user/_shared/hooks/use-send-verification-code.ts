"use client";

import { useGet } from "@/hooks/api";
import { ApiResponseDto } from "@/types";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { useCallback } from "react";

/**
 * Send Verification Code Hook for User Register
 */
export const useSendVerificationCode = () => {
  const {
    refetch: sendCode,
    loading,
    error,
  } = useGet<ApiResponseDto<string>>(API_ENDPOINTS.REGISTER.SEND_CODE, {
    enabled: false,
    onSuccess: (data) => {
      // console.log("[User Send Verification Code] Email sent:", data);
    },
    onError: (errorMsg) => {
      console.error("[User Send Verification Code] Error:", errorMsg);
    },
  });

  const sendVerificationCodeToEmail = useCallback(async () => {
    try {
      await sendCode();
      return true;
    } catch (err) {
      console.error("Failed to send verification code:", err);
      return false;
    }
  }, [sendCode]);

  return {
    sendVerificationCodeToEmail,
    isSending: loading,
    error,
  };
};
