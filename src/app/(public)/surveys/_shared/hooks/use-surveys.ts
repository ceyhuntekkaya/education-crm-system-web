"use client";

import { useData } from "@/contexts";
import { SurveyResponseDto } from "@/types";

interface UseSurveysReturn {
  surveys: SurveyResponseDto[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Kullanıcıya atanan anketleri getiren hook
 * Global context'ten veri çeker
 * @returns Anket verileri ve yönetim fonksiyonları
 */
export const useSurveys = (): UseSurveysReturn => {
  const {
    surveys,
    surveysLoading: loading,
    surveysError: error,
    refetchSurveys: refetch,
  } = useData();

  return {
    surveys,
    loading,
    error,
    refetch,
  };
};
