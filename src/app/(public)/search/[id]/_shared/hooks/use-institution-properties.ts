"use client";

import { useMemo } from "react";
import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto } from "@/types";

/**
 * Institution Property Item Interface
 */
export interface InstitutionPropertyDto {
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

/**
 * Grouped Institution Properties Interface
 */
export interface GroupedInstitutionProperty {
  groupId: number;
  groupName: string;
  groupDisplayName: string;
  groupSortOrder: number;
  properties: InstitutionPropertyDto[];
}

interface UseInstitutionPropertiesProps {
  schoolId: string | number | null;
}

interface UseInstitutionPropertiesReturn {
  properties: InstitutionPropertyDto[];
  groupedProperties: GroupedInstitutionProperty[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Kurum ek özelliklerini yöneten hook
 * @param schoolId - Kurum ID'si
 * @returns Kurum ek özellik verileri ve yönetim fonksiyonları
 */
export const useInstitutionProperties = ({
  schoolId,
}: UseInstitutionPropertiesProps): UseInstitutionPropertiesReturn => {
  const {
    data: propertyResponse,
    loading,
    error,
    refetch,
  } = useGet<ApiResponseDto<InstitutionPropertyDto[]>>(
    schoolId ? API_ENDPOINTS.INSTITUTIONS.SCHOOL_PROPERTY(schoolId) : null
  );

  const properties = useMemo(() => {
    return propertyResponse?.data || [];
  }, [propertyResponse?.data]);

  // Properties'i propertyGroupTypeId'ye göre grupla
  const groupedProperties = useMemo(() => {
    if (!properties.length) return [];

    const grouped = properties.reduce((acc, property) => {
      const groupId = property.propertyGroupTypeId;
      const existingGroup = acc.find((group) => group.groupId === groupId);

      if (existingGroup) {
        existingGroup.properties.push(property);
      } else {
        acc.push({
          groupId,
          groupName: property.groupName,
          groupDisplayName: property.groupDisplayName,
          groupSortOrder: property.groupSortOrder,
          properties: [property],
        });
      }

      return acc;
    }, [] as GroupedInstitutionProperty[]);

    // Grupları sortOrder'a göre sırala ve her grup içindeki properties'i de sırala
    return grouped
      .sort((a, b) => a.groupSortOrder - b.groupSortOrder)
      .map((group) => ({
        ...group,
        properties: group.properties.sort((a, b) => a.sortOrder - b.sortOrder),
      }));
  }, [properties]);

  return {
    properties,
    groupedProperties,
    loading,
    error,
    refetch,
  };
};
