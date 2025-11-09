"use client";

import { usePost, usePut } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { UserProfileDto, UserRegistrationDto, UserUpdateDto } from "@/types";
import { useRouter } from "next/navigation";
import { useUsersContext } from "../../../_shared/context";

/**
 * Kullanıcı ekleme hook'u
 */
export const useAddUser = () => {
  const router = useRouter();
  const { refetchUsers } = useUsersContext();

  const {
    mutate: postUser,
    loading: isLoading,
    error,
  } = usePost<UserProfileDto, UserRegistrationDto>(
    API_ENDPOINTS.USERS.REGISTER,
    {
      onSuccess: (data) => {
        console.log("✅ Kullanıcı başarıyla eklendi:", data);
        // Liste API'sine tekrar istek at
        refetchUsers();
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
