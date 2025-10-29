"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { PasswordChangeDto } from "@/types";

/**
 * Şifre değiştirme hook'u
 */
export const useChangePassword = (userId: number | null) => {
  const {
    mutate: changePassword,
    loading: isLoading,
    error,
  } = usePost<void, PasswordChangeDto>(
    userId ? API_ENDPOINTS.USERS.CHANGE_PASSWORD(userId) : "",
    {
      onSuccess: () => {
        console.log("✅ Şifre başarıyla değiştirildi");
      },
      onError: (error) => {
        console.log("❌ Şifre değiştirilirken hata:", error);
      },
    }
  );

  return {
    changePassword,
    isLoading,
    error,
  };
};
