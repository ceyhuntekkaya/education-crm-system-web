"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import {
  ApiResponseDto,
  CountryDto,
  DistrictDto,
  ProvinceDto,
  NeighborhoodDto,
  CountrySummaryDto,
  ProvinceSummaryDto,
  DistrictSummaryDto,
  NeighborhoodSummaryDto,
} from "@/types";

/**
 * CountryDto'yu CountrySummaryDto'ya dönüştürür
 */
const toCountrySummary = (country: CountryDto): CountrySummaryDto => ({
  id: country.id,
  name: country.name,
  isoCode2: country.isoCode2,
  flagEmoji: country.flagEmoji,
  phoneCode: country.phoneCode,
  isSupported: country.isSupported,
});

/**
 * ProvinceDto'yu ProvinceSummaryDto'ya dönüştürür
 */
const toProvinceSummary = (province: ProvinceDto): ProvinceSummaryDto => ({
  id: province.id,
  name: province.name,
  code: province.code,
  plateCode: province.plateCode,
  isMetropolitan: province.isMetropolitan,
  schoolCount: province.schoolCount,
});

/**
 * DistrictDto'yu DistrictSummaryDto'ya dönüştürür
 */
const toDistrictSummary = (district: DistrictDto): DistrictSummaryDto => ({
  id: district.id,
  name: district.name,
  code: district.code,
  districtType: district.districtType as any,
  isCentral: district.isCentral,
  socioeconomicLevel: district.socioeconomicLevel as any,
});

/**
 * NeighborhoodDto'yu NeighborhoodSummaryDto'ya dönüştürür
 */
const toNeighborhoodSummary = (
  neighborhood: NeighborhoodDto
): NeighborhoodSummaryDto => ({
  id: neighborhood.id,
  name: neighborhood.name,
  code: neighborhood.code,
  neighborhoodType: neighborhood.neighborhoodType as any,
  incomeLevel: neighborhood.incomeLevel as any,
});

/**
 * API'den gelen lokasyon verilerini autocomplete için uygun formata dönüştürür
 */
const transformLocationData = <T extends { id?: number; name?: string }>(
  data: T[] | undefined
) =>
  data?.map((item) => ({
    value: item.id?.toString() || "",
    label: item.name || "",
    raw: item, // ✅ Tam veriyi sakla
  })) || [];

/**
 * Campus formu için lokasyon verilerini yönetir (ülke, il, ilçe, mahalle)
 * @param values - Form values'dan gelen değerler
 */
export function useCampusLocationData(values?: any) {
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

  return {
    countries: {
      data: transformLocationData(countriesResponse?.data),
      raw: countriesResponse?.data?.map(toCountrySummary) || [], // ✅ Summary versiyonunu döndür
      loading: countriesLoading,
      error: countriesError,
    },
    provinces: {
      data: transformLocationData(provincesResponse?.data),
      raw: provincesResponse?.data?.map(toProvinceSummary) || [], // ✅ Summary versiyonunu döndür
      loading: provincesLoading,
      error: provincesError,
      disabled: !values?.countryId,
    },
    districts: {
      data: transformLocationData(districtsResponse?.data),
      raw: districtsResponse?.data?.map(toDistrictSummary) || [], // ✅ Summary versiyonunu döndür
      loading: districtsLoading,
      error: districtsError,
      disabled: !values?.provinceId,
    },
    neighborhoods: {
      data: transformLocationData(neighborhoodsResponse?.data),
      raw: neighborhoodsResponse?.data?.map(toNeighborhoodSummary) || [], // ✅ Summary versiyonunu döndür
      loading: neighborhoodsLoading,
      error: neighborhoodsError,
      disabled: !values?.districtId,
    },
  };
}
