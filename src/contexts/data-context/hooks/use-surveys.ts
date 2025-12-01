"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, SurveyResponseDto } from "@/types";
import { useAuth } from "@/contexts";

/**
 * Hook to fetch user surveys
 * Internal hook used by DataProvider
 * @param enabled - Veri çekme işleminin yapılıp yapılmayacağını belirler
 */
export const useSurveys = (enabled: boolean = true) => {
  const { user, accessToken } = useAuth();

  const {
    data: surveyResponse,
    loading,
    error,
    refetch,
  } = useGet<ApiResponseDto<SurveyResponseDto[]>>(
    user?.id && accessToken && enabled
      ? API_ENDPOINTS.SURVEYS.USER_ASSIGNMENT_BY_ID(user.id)
      : null,
    {
      enabled: !!user?.id && !!accessToken && enabled, // Sadece user, token varsa ve enabled ise çalışsın
    }
  );

  return {
    surveys: surveyResponse?.data || [],
    loading,
    error,
    refetch,
  };
};
