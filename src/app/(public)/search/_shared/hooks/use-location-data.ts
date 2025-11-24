import { useEffect, useRef } from "react";
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
import { useFormHook } from "@/hooks";

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
  const { setValue } = useFormHook();

  // ID'leri number'a çevir (form'dan string veya number geliyor)
  const countryId = values?.countryId
    ? parseInt(values.countryId.toString())
    : null;
  const provinceId = values?.provinceId
    ? parseInt(values.provinceId.toString())
    : null;
  const districtId = values?.districtId
    ? parseInt(values.districtId.toString())
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
        setValue("provinceId", "");
        setValue("districtId", "");
        setValue("neighborhoodId", "");
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
        setValue("districtId", "");
        setValue("neighborhoodId", "");
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
        setValue("neighborhoodId", "");
      }
      prevDistrictIdRef.current = districtId;
    }
  }, [districtId, setValue]);

  // İl boşaltıldığında ilçe ve mahalleyi sıfırla
  useEffect(() => {
    if (!provinceId && (values?.districtId || values?.neighborhoodId)) {
      setValue("districtId", "");
      setValue("neighborhoodId", "");
    }
  }, [provinceId, values?.districtId, values?.neighborhoodId, setValue]);

  // İlçe boşaltıldığında mahalleyi sıfırla
  useEffect(() => {
    if (!districtId && values?.neighborhoodId) {
      setValue("neighborhoodId", "");
    }
  }, [districtId, values?.neighborhoodId, setValue]);

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
