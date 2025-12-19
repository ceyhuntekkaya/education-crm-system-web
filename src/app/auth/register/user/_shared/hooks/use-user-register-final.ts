"use client";

import { usePost } from "@/hooks/api";
import { ApiResponseDto } from "@/types";

interface UserRegisterPayload {
  email: string;
  password: string;
  passwordControl: string;
  firstName: string;
  lastName: string;
  phone: string;
  code: string;
}

/**
 * User Register Final Step Hook
 * Tüm kayıt verilerini tek seferde gönderir: /api/register/user
 */
export const useUserRegisterFinal = () => {
  const {
    mutate: submitFinal,
    loading,
    error,
  } = usePost<ApiResponseDto<any>, UserRegisterPayload>(
    "https://api.egitimiste.com/api/register/user",
    {
      onSuccess: (data) => {
        // console.log("[User Register Final] User registration completed:", data);
      },
      onError: (errorMsg) => {
        console.error("[User Register Final] Error:", errorMsg);
      },
    }
  );

  return {
    submitFinal,
    isLoading: loading,
    error,
  };
};
