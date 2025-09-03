"use client";

import { useEffect, useRef } from "react";
import { useGet, usePostForm } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import {
  ApiResponseDto,
  CountryDto,
  DistrictDto,
  InstitutionTypeDto,
  NeighborhoodDto,
  ProvinceDto,
  SchoolSearchDto,
  SchoolSearchResultDto,
} from "@/types";

import type { LocationFilter, UseInstitutionSearchHookParams } from "../_types";
import { mockInstitutions } from "../_mock";

export function useInstitutionSearchHook({
  values = {},
  updateField = async () => {},
}: UseInstitutionSearchHookParams = {}) {
  // Önceki değerleri takip etmek için ref'ler
  const prevCountryId = useRef(values?.countryId);
  const prevProvinceId = useRef(values?.provinceId);
  const prevDistrictId = useRef(values?.districtId);

  // Location filter objesi oluştur
  const locationFilter: LocationFilter = {
    countryId: values?.countryId,
    provinceId: values?.provinceId,
    districtId: values?.districtId,
    neighborhoodId: values?.neighborhoodId,
  };
  const {
    data: countriesResponse,
    loading,
    error,
  } = useGet<ApiResponseDto<CountryDto[]>>(API_ENDPOINTS.LOCATION.COUNTRIES);

  // Provinces API çağrısı - sadece ülke seçildiğinde çalışır
  const {
    data: provincesResponse,
    loading: provincesLoading,
    error: provincesError,
  } = useGet<ApiResponseDto<ProvinceDto[]>>(
    locationFilter?.countryId
      ? API_ENDPOINTS.LOCATION.PROVINCES(locationFilter.countryId)
      : null
  );

  // Districts API çağrısı - sadece il seçildiğinde çalışır
  const {
    data: districtsResponse,
    loading: districtsLoading,
    error: districtsError,
  } = useGet<ApiResponseDto<DistrictDto[]>>(
    locationFilter?.provinceId
      ? API_ENDPOINTS.LOCATION.DISTRICTS(locationFilter.provinceId)
      : null
  );

  // Neighborhoods API çağrısı - sadece ilçe seçildiğinde çalışır
  const {
    data: neighborhoodsResponse,
    loading: neighborhoodsLoading,
    error: neighborhoodsError,
  } = useGet<ApiResponseDto<NeighborhoodDto[]>>(
    locationFilter?.districtId
      ? API_ENDPOINTS.LOCATION.NEIGHBORHOODS(locationFilter.districtId)
      : null
  );

  // Transform countries data for autocomplete
  const countries = {
    data: [
      { value: "", label: "Ülke seçin" },
      ...(countriesResponse?.data?.map((country) => ({
        value: country.id?.toString() || "",
        label: country.name || "",
      })) || []),
    ],
    loading: loading,
    error: error,
  };

  // Transform provinces data for autocomplete
  const provinces = {
    data: [
      { value: "", label: "İl seçin" },
      ...(provincesResponse?.data?.map((province) => ({
        value: province.id?.toString() || "",
        label: province.name || "",
      })) || []),
    ],
    loading: provincesLoading,
    error: provincesError,
  };

  // Transform districts data for autocomplete
  const districts = {
    data: [
      { value: "", label: "İlçe seçin" },
      ...(districtsResponse?.data?.map((district) => ({
        value: district.id?.toString() || "",
        label: district.name || "",
      })) || []),
    ],
    loading: districtsLoading,
    error: districtsError,
  };

  // Transform neighborhoods data for autocomplete
  const neighborhoods = {
    data: [
      { value: "", label: "Mahalle seçin" },
      ...(neighborhoodsResponse?.data?.map((neighborhood) => ({
        value: neighborhood.id?.toString() || "",
        label: neighborhood.name || "",
      })) || []),
    ],
    loading: neighborhoodsLoading,
    error: neighborhoodsError,
  };

  useEffect(() => {
    // Ülke değiştiğinde alt seviyeleri sıfırla
    if (values && prevCountryId.current !== values.countryId) {
      prevCountryId.current = values.countryId;

      // Ülke değişti, alt seviyeleri sıfırla
      if (values.provinceId) updateField("provinceId", "");
      if (values.districtId) updateField("districtId", "");
      if (values.neighborhoodId) updateField("neighborhoodId", "");
    }

    if (values && prevProvinceId.current !== values.provinceId) {
      prevProvinceId.current = values.provinceId;

      // İl değişti, alt seviyeleri sıfırla
      if (values.districtId) updateField("districtId", "");
      if (values.neighborhoodId) updateField("neighborhoodId", "");
    }

    if (values && prevDistrictId.current !== values.districtId) {
      prevDistrictId.current = values.districtId;

      // İlçe değişti, mahalle sıfırla
      if (values.neighborhoodId) updateField("neighborhoodId", "");
    }
  }, [values, updateField]);

  const {
    data: institutionTypesResponse,
    loading: institutionTypesLoading,
    error: institutionTypesError,
  } = useGet<ApiResponseDto<InstitutionTypeDto[]>>(
    API_ENDPOINTS.INSTITUTIONS.INSTITUTION_TYPES
  );

  const institutionTypes = {
    data: [
      ...(institutionTypesResponse?.data?.map((type) => ({
        value: type.id?.toString() || "",
        label: type.displayName || "",
      })) || []),
    ],
    loading: institutionTypesLoading,
    error: institutionTypesError,
  };

  // Search functionality
  const {
    submitForm: search,
    loading: searchLoading,
    error: searchError,
  } = usePostForm<SchoolSearchDto, ApiResponseDto<SchoolSearchResultDto[]>>(
    API_ENDPOINTS.INSTITUTIONS.SCHOOLS_SEARCH,
    {
      onSuccess: (data) => {
        console.log("SEARCH başarılı:", data);
      },
      onError: (err) => {
        const msg = typeof err === "string" ? err : String(err);
        console.error("Search hatası:", {
          error: err,
          message: msg,
          timestamp: new Date().toISOString(),
        });
      },
    }
  );

  const options = {
    institution: institutionTypes,
    location: {
      countries,
      provinces,
      districts,
      neighborhoods,
    },
  };

  return {
    institutions: mockInstitutions,
    countries,
    provinces,
    districts,
    neighborhoods,
    options,
    search,
    searchLoading,
    searchError,
  };
}

export default useInstitutionSearchHook;
