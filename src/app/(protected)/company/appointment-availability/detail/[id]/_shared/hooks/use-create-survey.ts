"use client";

import { usePost } from "@/hooks";
import { SurveyAssignmentDto } from "@/types/dto/survey/SurveyAssignmentDto";
import { ApiResponseDto } from "@/types/dto/user/ApiResponseDto";
import { API_ENDPOINTS } from "@/lib";

/**
 * Survey assignment hook'u - Anketi kullanıcıya atar
 */
export const useCreateSurvey = () => {
  const {
    mutate: createSurvey,
    loading: isLoading,
    error,
  } = usePost<ApiResponseDto<any>, SurveyAssignmentDto>(
    API_ENDPOINTS.SURVEYS.USER_ASSIGNMENT,
    {
      onSuccess: () => {
        console.log("Survey assignment created successfully");
      },
      onError: (error) => {
        console.error("Failed to create survey assignment:", error);
      },
    }
  );

  return {
    createSurvey,
    isLoading,
    error,
  };
};
