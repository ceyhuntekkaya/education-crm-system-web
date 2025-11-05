"use client";

import { useMemo } from "react";
import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto } from "@/types";

/**
 * School Property DTO - API'den dönen format
 */
export interface SchoolPropertyDto {
  schoolId: number;
  propertyTypeId: number;
  institutionPropertyValueId: number;
  institutionPropertyId: number;
  name: string;
  displayName: string;
  propertyGroupTypeId: number;
  sortOrder: number;
  groupName: string;
  groupDisplayName: string;
  institutionTypeId: number;
  institutionTypeName: string;
  groupSortOrder: number;
}

interface UseSchoolPropertiesProps {
  schoolId: number | null;
}

interface UseSchoolPropertiesReturn {
  properties: SchoolPropertyDto[];
  propertyTypeIds: number[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Okul ek özelliklerini yöneten hook (Add/Edit için)
 * @param schoolId - Okul ID'si (edit modunda)
 * @returns Okul ek özellik verileri ve property type ID'leri
 */
export const useSchoolProperties = ({
  schoolId,
}: UseSchoolPropertiesProps): UseSchoolPropertiesReturn => {
  const {
    data: propertyResponse,
    loading,
    error,
    refetch,
  } = useGet<ApiResponseDto<SchoolPropertyDto[]>>(
    schoolId ? API_ENDPOINTS.INSTITUTIONS.SCHOOL_PROPERTY(schoolId) : null
  );

  const properties = useMemo(() => {
    return propertyResponse?.data || [];
  }, [propertyResponse?.data]);

  // Property type ID'lerini string array olarak çıkar (form için)
  const propertyTypeIds = useMemo(() => {
    return properties.map((property) => property.propertyTypeId);
  }, [properties]);

  return {
    properties,
    propertyTypeIds,
    isLoading: loading,
    error,
    refetch,
  };
};
