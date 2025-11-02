"use client";

import { usePost, usePut } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { UserProfileDto, UserRegistrationDto, UserUpdateDto } from "@/types";
import { useRouter } from "next/navigation";

/**
 * Kullanıcı ekleme hook'u
 */
export const useAddUser = () => {
  const router = useRouter();

  const {
    mutate: postUser,
    loading: isLoading,
    error,
  } = usePost<UserProfileDto, UserRegistrationDto>(
    API_ENDPOINTS.USERS.REGISTER,
    {
      onSuccess: (data) => {
        console.log("✅ Kullanıcı başarıyla eklendi:", data);
        // Kullanıcılar sayfasına yönlendir
        router.push("/company/users");
      },
      onError: (error) => {
        console.log("❌ Kullanıcı eklenirken hata:", error);
      },
    }
  );

  return {
    postUser,
    isLoading,
    error,
  };
};
