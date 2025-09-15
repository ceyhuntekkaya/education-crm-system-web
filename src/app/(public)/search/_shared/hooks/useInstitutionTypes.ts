import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import {
  ApiResponseDto,
  InstitutionTypeDto,
  InstitutionTypeListDto,
} from "@/types";
import { InstitutionTypesReturn } from "../types";

/**
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
    data: [
      ...(institutionTypesResponse?.data?.map((type) => ({
        value: type.institutionTypeDto?.id?.toString() || "",
        label: type.institutionTypeDto?.displayName || "",
      })) || []),
    ],
    loading: institutionTypesLoading,
    error: institutionTypesError,
  };

  console.log("institutionTypes", institutionTypes);

  console.log("institutionTypesOptions", institutionTypesOptions);

  return { institutionTypes, institutionTypesOptions };
}
