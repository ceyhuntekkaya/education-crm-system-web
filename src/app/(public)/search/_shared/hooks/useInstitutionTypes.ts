import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, InstitutionTypeDto } from "@/types";
import { InstitutionTypesReturn } from "../types";

/**
 * Kurum türü verilerini yönetir
 */
export function useInstitutionTypes(): InstitutionTypesReturn {
  const {
    data: institutionTypesResponse,
    loading: institutionTypesLoading,
    error: institutionTypesError,
  } = useGet<ApiResponseDto<InstitutionTypeDto[]>>(
    API_ENDPOINTS.INSTITUTIONS.INSTITUTION_TYPES
  );

  const institutionTypes = {
    data: [
      ...(institutionTypesResponse?.data?.map((type) => ({
        value: type.id?.toString() || "",
        label: type.displayName || "",
      })) || []),
    ],
    loading: institutionTypesLoading,
    error: institutionTypesError,
  };

  return institutionTypes;
}
