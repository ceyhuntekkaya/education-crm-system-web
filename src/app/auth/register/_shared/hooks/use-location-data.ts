"use client";

import { useEffect, useRef } from "react";
import { useForm } from "@/contexts/form-context";
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
 * API'den gelen lokasyon verilerini select için uygun formata dönüştürür
 */
const transformLocationData = <T extends { id?: number; name?: string }>(
  data: T[] | undefined
) =>
  data?.map((item) => ({
    value: item.id?.toString() || "",
    label: item.name || "",
    raw: item, // Tam veriyi sakla
  })) || [];

/**
 * Register formu için lokasyon verilerini yönetir (ülke, il, ilçe, mahalle)
 * @param values - Form values'dan gelen değerler
 */
export function useLocationData(values?: any) {
  const { setValue } = useForm();
  const campusInfo = values?.campusInfo || {};

  // ID'leri number'a çevir (form'dan string geliyor)
  const countryId = campusInfo?.countryId
    ? parseInt(campusInfo.countryId.toString())
    : null;
  const provinceId = campusInfo?.provinceId
    ? parseInt(campusInfo.provinceId.toString())
    : null;
  const districtId = campusInfo?.districtId
    ? parseInt(campusInfo.districtId.toString())
    : null;

  // Önceki değerleri takip et
  const prevCountryIdRef = useRef(countryId);
  const prevProvinceIdRef = useRef(provinceId);
  const prevDistrictIdRef = useRef(districtId);

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
    countryId ? API_ENDPOINTS.LOCATION.PROVINCES(countryId) : null
  );

  // İlçeleri getir - il seçilmişse
  const {
    data: districtsResponse,
    loading: districtsLoading,
    error: districtsError,
  } = useGet<ApiResponseDto<DistrictDto[]>>(
    provinceId ? API_ENDPOINTS.LOCATION.DISTRICTS(provinceId) : null
  );

  // Mahalleleri getir - ilçe seçilmişse
  const {
    data: neighborhoodsResponse,
    loading: neighborhoodsLoading,
    error: neighborhoodsError,
  } = useGet<ApiResponseDto<NeighborhoodDto[]>>(
    districtId ? API_ENDPOINTS.LOCATION.NEIGHBORHOODS(districtId) : null
  );

  // Ülke değiştiğinde il, ilçe ve mahalleyi sıfırla
  useEffect(() => {
    if (prevCountryIdRef.current !== countryId) {
      if (
        prevCountryIdRef.current !== undefined &&
        prevCountryIdRef.current !== null
      ) {
        setValue("campusInfo.provinceId", "");
        setValue("campusInfo.districtId", "");
        setValue("campusInfo.neighborhoodId", "");
      }
      prevCountryIdRef.current = countryId;
    }
  }, [countryId, setValue]);

  // İl değiştiğinde ilçe ve mahalleyi sıfırla
  useEffect(() => {
    if (prevProvinceIdRef.current !== provinceId) {
      if (
        prevProvinceIdRef.current !== undefined &&
        prevProvinceIdRef.current !== null
      ) {
        setValue("campusInfo.districtId", "");
        setValue("campusInfo.neighborhoodId", "");
      }
      prevProvinceIdRef.current = provinceId;
    }
  }, [provinceId, setValue]);

  // İlçe değiştiğinde mahalleyi sıfırla
  useEffect(() => {
    if (prevDistrictIdRef.current !== districtId) {
      if (
        prevDistrictIdRef.current !== undefined &&
        prevDistrictIdRef.current !== null
      ) {
        setValue("campusInfo.neighborhoodId", "");
      }
      prevDistrictIdRef.current = districtId;
    }
  }, [districtId, setValue]);

  return {
    countries: {
      data: transformLocationData(countriesResponse?.data),
      raw: countriesResponse?.data?.map(toCountrySummary) || [],
      loading: countriesLoading,
      error: countriesError,
    },
    provinces: {
      data: transformLocationData(provincesResponse?.data),
      raw: provincesResponse?.data?.map(toProvinceSummary) || [],
      loading: provincesLoading,
      error: provincesError,
      disabled: !countryId,
    },
    districts: {
      data: transformLocationData(districtsResponse?.data),
      raw: districtsResponse?.data?.map(toDistrictSummary) || [],
      loading: districtsLoading,
      error: districtsError,
      disabled: !provinceId,
    },
    neighborhoods: {
      data: transformLocationData(neighborhoodsResponse?.data),
      raw: neighborhoodsResponse?.data?.map(toNeighborhoodSummary) || [],
      loading: neighborhoodsLoading,
      error: neighborhoodsError,
      disabled: !districtId,
    },
  };
}
