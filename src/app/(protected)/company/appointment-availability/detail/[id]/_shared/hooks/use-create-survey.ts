"use client";

import { usePost } from "@/hooks";
import { SurveyResponseCreateDto } from "@/types/dto/survey/SurveyResponseCreateDto";
import { SurveyResponseDto } from "@/types/dto/survey/SurveyResponseDto";
import { ApiResponseDto } from "@/types/dto/user/ApiResponseDto";
import { API_ENDPOINTS } from "@/lib";

/**
 * Survey response oluşturma hook'u
 */
export const useCreateSurvey = () => {
  const {
    mutate: createSurvey,
    loading: isLoading,
    error,
  } = usePost<ApiResponseDto<SurveyResponseDto>, SurveyResponseCreateDto>(
    API_ENDPOINTS.SURVEYS.CREATE_RESPONSE,
    {
      onSuccess: () => {
        console.log("Survey response created successfully");
      },
      onError: (error) => {
        console.error("Failed to create survey response:", error);
      },
    }
  );

  return {
    createSurvey,
    isLoading,
    error,
  };
};
