"use client";

import { usePost } from "@/hooks/api";
import { UserRegistrationDto } from "@/types";
import type { RegisterResponse } from "../types";

/**
 * Register hook for user registration
 * Custom API hook (usePost) kullanır
 */
export const useRegister = () => {
  const {
    mutate: registerUser,
    loading,
    error,
  } = usePost<RegisterResponse, UserRegistrationDto>("/users/register", {
    onSuccess: (data) => {
      // Success - kullanıcı login sayfasına yönlendirilecek
      console.log("Kayıt başarılı:", data);
    },
    onError: (errorMsg) => {
      // Error handling
      console.error("Kayıt hatası:", errorMsg);
    },
  });

  return {
    registerUser,
    isLoading: loading,
    error,
  };
};
