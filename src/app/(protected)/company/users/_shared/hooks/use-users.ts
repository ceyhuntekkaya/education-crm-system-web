"use client";

import { UserDto } from "@/types";
import { mockUsers } from "../mock/users-mock-data";

interface UseUsersReturn {
  users: UserDto[];
  userLoading: boolean;
  userError: string | null;
  refetchUsers: () => void;
}

/**
 * Tüm kullanıcıları getiren hook
 * Şimdilik mock data kullanıyor, API hazır olunca güncellenecek
 * @returns Kullanıcı verileri ve yönetim fonksiyonları
 */
export const useUsers = (): UseUsersReturn => {
  // TODO: API hazır olunca useGet ile değiştir
  // const {
  //   data: usersResponse,
  //   loading: userLoading,
  //   error: userError,
  //   refetch: refetchUsers,
  // } = useGet<ApiResponseDto<UserDto[]>>(API_ENDPOINTS.USERS.LIST);

  // Şimdilik mock data kullanıyoruz
  const users = mockUsers;
  const userLoading = false;
  const userError = null;
  const refetchUsers = () => {
    console.log("Refetching users... (mock data)");
  };

  return {
    users,
    userLoading,
    userError,
    refetchUsers,
  };
};
