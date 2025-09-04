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

// Helper function to transform location data
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

export function useInstitutionSearchHook({
  values = {},
  updateField = async () => {},
}: UseInstitutionSearchHookParams = {}) {
  // Track previous values for cleanup
  const prevValues = useRef({
    countryId: values?.countryId,
    provinceId: values?.provinceId,
    districtId: values?.districtId,
  });

  // Create location filter object
  const locationFilter: LocationFilter = {
    countryId: values?.countryId,
    provinceId: values?.provinceId,
    districtId: values?.districtId,
    neighborhoodId: values?.neighborhoodId,
  };

  // API calls with conditional URLs
  const {
    data: countriesResponse,
    loading: countriesLoading,
    error: countriesError,
  } = useGet<ApiResponseDto<CountryDto[]>>(API_ENDPOINTS.LOCATION.COUNTRIES);

  const {
    data: provincesResponse,
    loading: provincesLoading,
    error: provincesError,
  } = useGet<ApiResponseDto<ProvinceDto[]>>(
    locationFilter.countryId
      ? API_ENDPOINTS.LOCATION.PROVINCES(locationFilter.countryId)
      : null
  );

  const {
    data: districtsResponse,
    loading: districtsLoading,
    error: districtsError,
  } = useGet<ApiResponseDto<DistrictDto[]>>(
    locationFilter.provinceId
      ? API_ENDPOINTS.LOCATION.DISTRICTS(locationFilter.provinceId)
      : null
  );

  const {
    data: neighborhoodsResponse,
    loading: neighborhoodsLoading,
    error: neighborhoodsError,
  } = useGet<ApiResponseDto<NeighborhoodDto[]>>(
    locationFilter.districtId
      ? API_ENDPOINTS.LOCATION.NEIGHBORHOODS(locationFilter.districtId)
      : null
  );

  const {
    data: institutionTypesResponse,
    loading: institutionTypesLoading,
    error: institutionTypesError,
  } = useGet<ApiResponseDto<InstitutionTypeDto[]>>(
    API_ENDPOINTS.INSTITUTIONS.INSTITUTION_TYPES
  );

  // Transform data for select components
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

  // Handle location field cleanup on change
  useEffect(() => {
    // Country changed - clear dependent fields
    if (prevValues.current.countryId !== values?.countryId) {
      prevValues.current.countryId = values?.countryId;
      if (values?.provinceId) updateField("provinceId", "");
      if (values?.districtId) updateField("districtId", "");
      if (values?.neighborhoodId) updateField("neighborhoodId", "");
    }

    // Province changed - clear dependent fields
    if (prevValues.current.provinceId !== values?.provinceId) {
      prevValues.current.provinceId = values?.provinceId;
      if (values?.districtId) updateField("districtId", "");
      if (values?.neighborhoodId) updateField("neighborhoodId", "");
    }

    // District changed - clear dependent fields
    if (prevValues.current.districtId !== values?.districtId) {
      prevValues.current.districtId = values?.districtId;
      if (values?.neighborhoodId) updateField("neighborhoodId", "");
    }
  }, [values, updateField]);

  // Search functionality
  const {
    submitForm: search,
    loading: searchLoading,
    error: searchError,
  } = usePostForm<SchoolSearchDto, ApiResponseDto<SchoolSearchResultDto[]>>(
    API_ENDPOINTS.INSTITUTIONS.SCHOOLS_SEARCH,
    {
      onSuccess: (data) => {
        console.log("Search successful:", data);
      },
      onError: (err) => {
        console.error("Search error:", err);
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
