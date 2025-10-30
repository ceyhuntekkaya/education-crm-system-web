"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, SurveyDto } from "@/types";

interface UseAddSurveyReturn {
  addSurvey: (surveyData: Partial<SurveyDto>) => Promise<void>;
  addLoading: boolean;
  addError: string | null;
}

/**
 * Yeni anket ekleme hook'u
 * @returns Anket ekleme fonksiyonları
 */
export const useAddSurvey = (): UseAddSurveyReturn => {
  const {
    mutateAsync: addSurveyMutation,
    loading: addLoading,
    error: addError,
  } = usePost<ApiResponseDto<SurveyDto>>(API_ENDPOINTS.SURVEYS.CREATE_RESPONSE);

  const addSurvey = async (surveyData: Partial<SurveyDto>): Promise<void> => {
    try {
      await addSurveyMutation(surveyData);
    } catch (error) {
      console.error("Survey adding failed:", error);
      throw error;
    }
  };

  return {
    addSurvey,
    addLoading,
    addError,
  };
};
