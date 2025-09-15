import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import {
  ApiResponseDto,
  InstitutionTypeDto,
  InstitutionTypeListDto,
} from "@/types";
import { InstitutionTypesReturn } from "../types";

/**
 * Kurum türü verilerini transform eder
 */
const transformInstitutionTypeData = (
  data: InstitutionTypeListDto[] | undefined,
  placeholder: string
) => [
  { value: "", label: placeholder },
  ...(data
    ?.map((type: InstitutionTypeListDto) => {
      // Güvenli veri kontrolü
      if (
        !type.institutionTypeDto?.id ||
        !type.institutionTypeDto?.displayName
      ) {
        return null;
      }
      return {
        value: type.institutionTypeDto.id.toString(),
        label: type.institutionTypeDto.displayName,
      };
    })
    .filter(
      (
        option: { value: string; label: string } | null
      ): option is { value: string; label: string } => option !== null
    ) || []),
];

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
