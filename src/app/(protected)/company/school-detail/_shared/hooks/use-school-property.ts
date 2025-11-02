"use client";

import { useMemo } from "react";
import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto } from "@/types";
import { SchoolPropertyDto, GroupedSchoolProperty } from "../types";

interface UseSchoolPropertyProps {
  schoolId: number | null;
}

interface UseSchoolPropertyReturn {
  properties: SchoolPropertyDto[];
  groupedProperties: GroupedSchoolProperty[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Okul ek özelliklerini yöneten hook
 * @param schoolId - Okul ID'si
 * @returns Okul ek özellik verileri ve yönetim fonksiyonları
 */
export const useSchoolProperty = ({
  schoolId,
}: UseSchoolPropertyProps): UseSchoolPropertyReturn => {
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
    }, [] as GroupedSchoolProperty[]);

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
