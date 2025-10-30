"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, SurveyDto } from "@/types";
import { useAuth } from "@/contexts";
import { MOCK_SURVEYS } from "./mock-surveys.data";

interface UseSurveysReturn {
  surveys: SurveyDto[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Tüm anketleri getiren hook
 * @returns Anket verileri ve yönetim fonksiyonları
 */
export const useSurveys = (): UseSurveysReturn => {
  const { accessToken } = useAuth();
  const responseToken = accessToken || null;

  const {
    data: surveyResponse,
    loading: surveyLoading,
    error: surveyError,
    refetch: refetchSurveys,
  } = useGet<ApiResponseDto<SurveyDto>>(
    responseToken ? API_ENDPOINTS.SURVEYS.BY_TOKEN(responseToken) : null
  );

  // API response içinden data'yı al ve array'e çevir
  // Eğer hata varsa mock data kullan
  let surveys: SurveyDto[];

  if (surveyError) {
    console.warn(
      "Backend'den hata geldi, mock data kullanılıyor:",
      surveyError
    );
    surveys = MOCK_SURVEYS;
  } else {
    const survey = surveyResponse?.data || null;
    surveys = survey ? [survey] : [];
  }

  return {
    surveys,
    loading: surveyLoading,
    error: surveyError,
    refetch: refetchSurveys,
  };
};
