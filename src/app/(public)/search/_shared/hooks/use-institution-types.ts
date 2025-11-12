import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, InstitutionTypeListDto } from "@/types";
import { InstitutionTypesReturn } from "../types";
import { transformInstitutionTypeData } from "../utils";

/**
 * 🏫 INSTITUTION TYPES HOOK
 * Kurum türü verilerini yönetir
 */
export function useInstitutionTypes(): InstitutionTypesReturn {
  const {
    data: institutionTypesResponse,
    loading: institutionTypesLoading,
    error: institutionTypesError,
  } = useGet<ApiResponseDto<InstitutionTypeListDto[]>>(
    API_ENDPOINTS.INSTITUTIONS.INSTITUTION_TYPES
  );

  const institutionTypes = institutionTypesResponse?.data || [];

  const institutionTypesOptions = {
    data: transformInstitutionTypeData(
      institutionTypesResponse?.data,
      "Kurum türü seçin"
    ),
    loading: institutionTypesLoading,
    error: institutionTypesError,
  };

  // console.log("institutionTypes", institutionTypes);

  // console.log("institutionTypesOptions", institutionTypesOptions);

  return { institutionTypes, institutionTypesOptions };
}
