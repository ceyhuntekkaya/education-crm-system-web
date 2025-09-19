import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, CountryDto, DistrictDto, ProvinceDto } from "@/types";

/**
 * API'den gelen lokasyon verilerini select component'i için uygun formata dönüştürür
 */
const transformLocationData = <T extends { id?: number; name?: string }>(
  data: T[] | undefined,
  placeholder: string
) => [
  { value: "", label: placeholder },
  ...(data?.map((item) => ({
    value: item.id?.toString() || "",
    label: item.name || "",
  })) || []),
];

/**
 * Filter form için lokasyon verilerini yönetir (il, ilçe)
 */
export function useLocationData(values?: any) {
  // İlleri getir - Türkiye için sabit (countryId: 1)
  const {
    data: provincesResponse,
    loading: provincesLoading,
    error: provincesError,
  } = useGet<ApiResponseDto<ProvinceDto[]>>(
    API_ENDPOINTS.LOCATION.PROVINCES(1) // Türkiye ID'si
  );

  // İlçeleri getir - il seçilmişse
  const {
    data: districtsResponse,
    loading: districtsLoading,
    error: districtsError,
  } = useGet<ApiResponseDto<DistrictDto[]>>(
    values?.provinceId
      ? API_ENDPOINTS.LOCATION.DISTRICTS(values.provinceId)
      : null
  );

  return {
    provinces: {
      data: transformLocationData(
        provincesResponse?.data || [],
        "İl seçiniz..."
      ),
      loading: provincesLoading,
      error: provincesError,
    },
    districts: {
      data: transformLocationData(
        districtsResponse?.data || [],
        "İlçe seçiniz..."
      ),
      loading: districtsLoading,
      error: districtsError,
    },
  };
}
