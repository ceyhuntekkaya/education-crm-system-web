"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, UserDto } from "@/types";
import { mockUsers } from "../../../_shared";

interface UseUserDetailProps {
  userId: number | null;
}

interface UseUserDetailReturn {
  user: UserDto | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Seçili kullanıcı için detay verilerini yöneten hook
 * @param userId - Kullanıcı ID'si
 * @returns Kullanıcı detay verileri ve yönetim fonksiyonları
 */
export const useUserDetail = ({
  userId,
}: UseUserDetailProps): UseUserDetailReturn => {
  const {
    data: userResponse,
    loading,
    error,
    refetch,
  } = useGet<ApiResponseDto<UserDto>>(
    userId ? API_ENDPOINTS.USERS.BY_ID(userId) : null
  );

  return {
    user: userResponse?.data || null,
    loading,
    error,
    refetch,
  };
};
