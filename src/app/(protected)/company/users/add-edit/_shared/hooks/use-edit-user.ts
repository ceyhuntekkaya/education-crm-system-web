"use client";

import { usePut } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { UserProfileDto, UserUpdateDto } from "@/types";
import { useRouter } from "next/navigation";
import { useUsersContext } from "../../../_shared/context";

/**
 * Kullanıcı güncelleme hook'u
 */
export const useEditUser = (userId: number) => {
  const router = useRouter();
  const { refetchUsers } = useUsersContext();

  const {
    mutate: putUser,
    loading: isLoading,
    error,
  } = usePut<UserProfileDto, UserUpdateDto>(
    API_ENDPOINTS.USERS.UPDATE_PROFILE(userId),
    {
      onSuccess: (data) => {
        console.log("✅ Kullanıcı başarıyla güncellendi:", data);
        // Liste API'sine tekrar istek at
        refetchUsers();
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
