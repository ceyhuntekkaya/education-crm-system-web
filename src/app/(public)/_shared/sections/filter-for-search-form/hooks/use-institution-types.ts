import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, InstitutionTypeListDto } from "@/types";

/**
 * API'den gelen kurum türü verilerini select component'i için uygun formata dönüştürür
 */
const transformInstitutionTypeData = (
  data: InstitutionTypeListDto[] | undefined
) => [
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
 * Filter form için kurum türlerini yönetir
 */
export function useInstitutionTypes() {
  // Kurum türlerini getir
  const {
    data: institutionTypesResponse,
    loading: institutionTypesLoading,
    error: institutionTypesError,
  } = useGet<ApiResponseDto<InstitutionTypeListDto[]>>(
    API_ENDPOINTS.INSTITUTIONS.INSTITUTION_TYPES
  );

  return {
    institutionTypes: {
      data: transformInstitutionTypeData(institutionTypesResponse?.data || []),
      loading: institutionTypesLoading,
      error: institutionTypesError,
    },
    // Ham veri de dönüyoruz (ihtiyaç olursa)
    rawInstitutionTypes: institutionTypesResponse?.data || [],
  };
}
