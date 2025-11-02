"use client";

import { useMemo } from "react";
import { useGet } from "@/hooks";
import { API_ENDPOINTS, ApiResponse } from "@/lib";
import { UserDto } from "@/types";

interface UseStaffUsersByCampusProps {
  campusId: number | null;
}

interface StaffUserOption {
  label: string;
  value: string;
}

/**
 * Campus ID'sine göre staff kullanıcılarını getiren hook
 */
export const useStaffUsersByCampus = ({
  campusId,
}: UseStaffUsersByCampusProps) => {
  const {
    data: response,
    loading: isLoading,
    error,
  } = useGet<ApiResponse<UserDto[]>>(
    campusId ? API_ENDPOINTS.USERS.BY_CAMPUS(campusId) : null
  );

  // Extract users from response data
  const users = useMemo(() => {
    if (!response || !response.success) return [];
    if (!Array.isArray(response.data)) return [];
    return response.data;
  }, [response]);

  // Staff user options for autocomplete
  const staffUserOptions: StaffUserOption[] = useMemo(() => {
    return users.map((user: UserDto) => ({
      label: user.fullName || `${user.firstName} ${user.lastName}`,
      value: user.id?.toString() || "",
    }));
  }, [users]);

  return {
    users,
    staffUserOptions,
    isLoading,
    error,
  };
};
