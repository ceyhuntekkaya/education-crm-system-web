"use client";

import { ApiResponseDto, UserDto } from "@/types";
import { useAuth } from "@/contexts";
import { useGet } from "@/hooks/api";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

interface UseUsersReturn {
  users: UserDto[];
  userLoading: boolean;
  userError: string | null;
  refetchUsers: () => void;
}

/**
 * Tüm kullanıcıları getiren hook
 * Campus ID'ye göre kullanıcıları listeler
 * @returns Kullanıcı verileri ve yönetim fonksiyonları
 */
export const useUsers = (): UseUsersReturn => {
  const { user } = useAuth();
  const campusId = user?.campus?.id;

  const {
    data: usersResponse,
    loading: userLoading,
    error: userError,
    refetch: refetchUsers,
  } = useGet<ApiResponseDto<UserDto[]>>(
    campusId ? API_ENDPOINTS.USERS.BY_CAMPUS(campusId) : null
  );

  const users = usersResponse?.data || [];

  return {
    users,
    userLoading,
    userError,
    refetchUsers,
  };
};
