"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, SurveyResponseDto } from "@/types";
import { useAuth } from "@/contexts";
import { MOCK_SURVEYS } from "./mock-surveys.data";

interface UseSurveysReturn {
  surveys: SurveyResponseDto[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Kullanıcıya atanan anketleri getiren hook
 * @returns Anket verileri ve yönetim fonksiyonları
 */
export const useSurveys = (): UseSurveysReturn => {
  const { user, accessToken } = useAuth();

  const {
    data: surveyResponse,
    loading: surveyLoading,
    error: surveyError,
    refetch: refetchSurveys,
  } = useGet<ApiResponseDto<SurveyResponseDto[]>>(
    user?.id && accessToken
      ? API_ENDPOINTS.SURVEYS.USER_ASSIGNMENT_BY_ID(user.id)
      : null
  );

  // API response içinden data'yı al
  // Eğer hata varsa mock data kullan
  // let surveys: SurveyDto[];

  // if (surveyError) {
  //   console.warn(
  //     "Backend'den hata geldi, mock data kullanılıyor:",
  //     surveyError
  //   );
  //   surveys = MOCK_SURVEYS;
  // } else {
  //   surveys = surveyResponse?.data || [];
  // }

  return {
    surveys: surveyResponse?.data || [],
    loading: surveyLoading,
    error: surveyError,
    refetch: refetchSurveys,
  };
};
