"use client";

import { usePost } from "@/hooks/api";
import { UserRegistrationDto, ApiResponseDto, UserDto } from "@/types";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

/**
 * Instructor Registration Hook
 * Eğitmen kaydı için kullanılır
 *
 * API Endpoint: POST /users/register/instructor
 *
 * @returns {object} Hook functions and states
 */
export const useInstructorRegister = () => {
  const {
    mutate: registerInstructor,
    loading,
    error,
  } = usePost<ApiResponseDto<UserDto>, UserRegistrationDto>(
    API_ENDPOINTS.USERS.REGISTER_INSTRUCTOR,
    {
      onSuccess: (data) => {
        // console.log("[Instructor Register] Registration successful:", data);
      },
      onError: (errorMsg) => {
        console.error("[Instructor Register] Error:", errorMsg);
      },
    },
  );

  return {
    registerInstructor,
    isLoading: loading,
    error,
  };
};
