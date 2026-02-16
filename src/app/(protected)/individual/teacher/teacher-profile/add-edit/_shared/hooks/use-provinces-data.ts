import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type { ApiResponseDto, ProvinceDto } from "@/types";

/**
 * İl verilerini yönetir ve autocomplete için formatlar
 */
export function useProvincesData() {
  // İlleri getir
  const { data: provincesResponse, loading: provincesLoading } = useGet<
    ApiResponseDto<ProvinceDto[]>
  >(API_ENDPOINTS.LOCATION.PROVINCES(1)); // Türkiye ID'si

  // City için - value=name (backend'e string gönderilecek)
  const cityOptions =
    provincesResponse?.data?.map((province) => ({
      label: province.name || "",
      value: province.name || "", // Value olarak name
    })) || [];

  // ProvinceIds için - value=id (backend'e ID array gönderilecek)
  const provinceOptions =
    provincesResponse?.data?.map((province) => ({
      label: province.name || "",
      value: province.id?.toString() || "", // Value olarak ID
    })) || [];

  return {
    cityOptions,
    provinceOptions,
    provincesLoading,
  };
}
