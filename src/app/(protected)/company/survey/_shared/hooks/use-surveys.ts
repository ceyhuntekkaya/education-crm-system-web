"use client";

import { useGet } from "@/hooks";
import { useCompany } from "@/app/(protected)/company/_shared";
import { ApiResponseDto, SurveyResponseDto } from "@/types";

interface UseSurveysReturn {
  surveys: SurveyResponseDto[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Seçili Kuruma ait anket response'larını getiren hook
 * @returns Anket response verileri ve yönetim fonksiyonları
 */
export const useSurveys = (): UseSurveysReturn => {
  const { selectedSchool } = useCompany();

  // API URL - only make request if schoolId exists
  const apiUrl = selectedSchool?.id
    ? `https://api.egitimiste.com/api/surveys/school/assignment/${selectedSchool.id}`
    : null;

  const {
    data: apiResponse,
    loading: surveyLoading,
    error: surveyError,
    refetch: refetchSurveys,
  } = useGet<ApiResponseDto<SurveyResponseDto[]>>(apiUrl, {
    enabled: !!selectedSchool?.id,
    onError: (error) => {
      console.error("Survey yükleme hatası:", error);
    },
  });

  return {
    surveys: apiResponse?.data || [],
    loading: surveyLoading,
    error: surveyError,
    refetch: refetchSurveys,
  };
};
