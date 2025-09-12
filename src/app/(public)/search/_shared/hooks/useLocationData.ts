import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import {
  ApiResponseDto,
  CountryDto,
  DistrictDto,
  NeighborhoodDto,
  ProvinceDto,
} from "@/types";
import { LocationDataReturn } from "../types";

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
 * Lokasyon verilerini yönetir (ülke, il, ilçe, mahalle)
 */
export function useLocationData(values?: any): LocationDataReturn {
  // Tüm ülkeleri getir
  const {
    data: countriesResponse,
    loading: countriesLoading,
    error: countriesError,
  } = useGet<ApiResponseDto<CountryDto[]>>(API_ENDPOINTS.LOCATION.COUNTRIES);

  // İlleri getir - ülke seçilmişse
  const {
    data: provincesResponse,
    loading: provincesLoading,
    error: provincesError,
  } = useGet<ApiResponseDto<ProvinceDto[]>>(
    values?.countryId
      ? API_ENDPOINTS.LOCATION.PROVINCES(values.countryId)
      : null
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

  // Mahalleleri getir - ilçe seçilmişse
  const {
    data: neighborhoodsResponse,
    loading: neighborhoodsLoading,
    error: neighborhoodsError,
  } = useGet<ApiResponseDto<NeighborhoodDto[]>>(
    values?.districtId
      ? API_ENDPOINTS.LOCATION.NEIGHBORHOODS(values.districtId)
      : null
  );

  // Verileri transform et
  const countries = {
    data: transformLocationData(countriesResponse?.data, "Ülke seçin"),
    loading: countriesLoading,
    error: countriesError,
  };

  const provinces = {
    data: transformLocationData(provincesResponse?.data, "İl seçin"),
    loading: provincesLoading,
    error: provincesError,
  };

  const districts = {
    data: transformLocationData(districtsResponse?.data, "İlçe seçin"),
    loading: districtsLoading,
    error: districtsError,
  };

  const neighborhoods = {
    data: transformLocationData(neighborhoodsResponse?.data, "Mahalle seçin"),
    loading: neighborhoodsLoading,
    error: neighborhoodsError,
  };

  return {
    countries,
    provinces,
    districts,
    neighborhoods,
  };
}
