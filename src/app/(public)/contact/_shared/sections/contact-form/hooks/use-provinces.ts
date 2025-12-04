import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, ProvinceDto } from "@/types";

/**
 * İl verilerini API'den çeker
 * Contact form için sadece il seçimi gerekiyor (Türkiye - countryId: 1)
 */
export function useProvinces() {
  const TURKEY_COUNTRY_ID = 1;

  const {
    data: provincesResponse,
    loading: provincesLoading,
    error: provincesError,
  } = useGet<ApiResponseDto<ProvinceDto[]>>(
    API_ENDPOINTS.LOCATION.PROVINCES(TURKEY_COUNTRY_ID)
  );

  // Select component için options formatı
  const provinceOptions = [
    { value: "", label: "İl seçiniz..." },
    ...(provincesResponse?.data?.map((province) => ({
      value: province.id?.toString() || "",
      label: province.name || "",
    })) || []),
  ];

  return {
    provinces: provincesResponse?.data || [],
    provinceOptions,
    loading: provincesLoading,
    error: provincesError,
  };
}
