"use client";

import { mockUsers } from "../mock";
import { UserListDto, UserProfileDto } from "@/types";

interface UseUsersReturn {
  users: (UserListDto | UserProfileDto)[];
  userLoading: boolean;
  userError: string | null;
  refetchUsers: () => void;
}

/**
 * Tüm kullanıcıları getiren hook
 * Şu an mock data kullanıyor, API hazır olunca güncellenecek
 * @returns Kullanıcı verileri ve yönetim fonksiyonları
 */
export const useUsers = (): UseUsersReturn => {
  // TODO: API hazır olunca bu kısmı useGet ile değiştir
  // const {
  //   data: usersResponse,
  //   loading: userLoading,
  //   error: userError,
  //   refetch: refetchUsers,
  // } = useGet<ApiResponseDto<UserProfileDto[]>>(
  //   API_ENDPOINTS.USERS.LIST
  // );

  // Şimdilik mock data kullanıyoruz
  const users = mockUsers;
  const userLoading = false;
  const userError = null;
  const refetchUsers = () => {
    console.log("Refetching users...");
  };

  return {
    users,
    userLoading,
    userError,
    refetchUsers,
  };
};
