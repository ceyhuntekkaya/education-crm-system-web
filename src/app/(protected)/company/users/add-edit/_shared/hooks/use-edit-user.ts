"use client";

import { usePut } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { UserProfileDto, UserUpdateDto } from "@/types";
import { useRouter } from "next/navigation";

/**
 * Kullanıcı güncelleme hook'u
 */
export const useEditUser = (userId: number) => {
  const router = useRouter();

  const {
    mutate: putUser,
    loading: isLoading,
    error,
  } = usePut<UserProfileDto, UserUpdateDto>(
    API_ENDPOINTS.USERS.UPDATE_PROFILE(userId),
    {
      onSuccess: (data) => {
        console.log("✅ Kullanıcı başarıyla güncellendi:", data);
        // Kullanıcı detay sayfasına yönlendir
        router.push(`/company/users/detail/${userId}`);
      },
      onError: (error) => {
        console.log("❌ Kullanıcı güncellenirken hata:", error);
      },
    }
  );

  return {
    putUser,
    isLoading,
    error,
  };
};
