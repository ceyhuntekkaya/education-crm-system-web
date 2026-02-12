"use client";

import { usePost } from "@/hooks/api";
import { UserRegistrationDto, ApiResponseDto, UserDto } from "@/types";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

/**
 * Teacher Registration Hook
 * Öğretmen kaydı için kullanılır
 *
 * API Endpoint: POST /users/register/teacher
 *
 * @returns {object} Hook functions and states
 */
export const useTeacherRegister = () => {
  const {
    mutate: registerTeacher,
    loading,
    error,
  } = usePost<ApiResponseDto<UserDto>, UserRegistrationDto>(
    API_ENDPOINTS.USERS.REGISTER_TEACHER,
    {
      onSuccess: (data) => {
        // console.log("[Teacher Register] Registration successful:", data);
      },
      onError: (errorMsg) => {
        console.error("[Teacher Register] Error:", errorMsg);
      },
    },
  );

  return {
    registerTeacher,
    isLoading: loading,
    error,
  };
};
