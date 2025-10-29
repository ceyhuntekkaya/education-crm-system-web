"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { UserProfileDto, ApiResponseDto } from "@/types";

interface UseUserByIdReturn {
  user: UserProfileDto | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * ID'ye göre tek bir kullanıcı verisi getiren hook
 * @param id - Kullanıcı ID'si
 * @returns Kullanıcı verileri ve yönetim fonksiyonları
 */
export const useUserById = (id: number | null): UseUserByIdReturn => {
  const {
    data: userResponse,
    loading: isLoading,
    error,
    refetch,
  } = useGet<ApiResponseDto<UserProfileDto>>(
    id ? API_ENDPOINTS.USERS.PROFILE(id) : null
  );

  return {
    user: userResponse?.data || null,
    isLoading,
    error,
    refetch,
  };
};
