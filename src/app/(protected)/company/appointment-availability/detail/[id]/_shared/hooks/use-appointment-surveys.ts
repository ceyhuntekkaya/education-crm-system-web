import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, SurveyDto } from "@/types";
import { SurveyType } from "@/enums";

interface UseAppointmentSurveysReturn {
  surveys: SurveyDto[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Tüm anketleri getiren hook
 * Gerçek API'yi kullanarak tüm survey'leri getirir
 */
export const useAppointmentSurveys = (): UseAppointmentSurveysReturn => {
  const {
    data: surveysResponse,
    loading: isLoading,
    error,
    refetch,
  } = useGet<ApiResponseDto<SurveyDto[]>>("/surveys/");

  return {
    surveys: surveysResponse?.data || [],
    isLoading,
    error,
    refetch,
  };
};
