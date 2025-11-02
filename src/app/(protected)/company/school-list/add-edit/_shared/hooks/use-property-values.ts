"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import {
  ApiResponseDto,
  InstitutionTypeListDto,
  PropertyGroupTypeDto,
  PropertyTypeDto,
} from "@/types";
import { useMemo } from "react";

/**
 * PropertyGroupType için checkbox option tipi
 */
export interface PropertyGroupCheckboxOption {
  groupId: number;
  groupName: string;
  groupDisplayName: string;
  isMultiple: boolean;
  properties: {
    value: string; // propertyTypeId
    label: string; // displayName
  }[];
}

interface UsePropertyValuesReturn {
  propertyGroupTypes: PropertyGroupTypeDto[];
  propertyCheckboxGroups: PropertyGroupCheckboxOption[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  getGroupsByInstitutionTypeId: (
    institutionTypeId: number | string | undefined
  ) => PropertyGroupCheckboxOption[];
}

/**
 * PropertyGroupType verilerini transform eder - Checkbox grupları için
 */
const transformToCheckboxGroups = (
  propertyGroupTypes: PropertyGroupTypeDto[] | undefined
): PropertyGroupCheckboxOption[] => {
  if (!propertyGroupTypes || propertyGroupTypes.length === 0) {
    return [];
  }

  return propertyGroupTypes
    .map((group) => {
      // Güvenli veri kontrolü
      if (!group.id || !group.name || !group.propertyTypes) {
        return null;
      }

      // PropertyTypes'ları checkbox option formatına çevir
      const properties =
        group.propertyTypes
          ?.filter((prop) => prop.id && prop.displayName)
          .map((prop) => ({
            value: prop.id!.toString(),
            label: prop.displayName!,
          })) || [];

      // Eğer hiç property yoksa grubu ekleme
      if (properties.length === 0) {
        return null;
      }

      return {
        groupId: group.id,
        groupName: group.name,
        groupDisplayName: group.displayName || group.name,
        // isMultiple undefined ise true kabul et (çoklu seçim default)
        isMultiple: group.isMultiple !== false,
        properties,
      };
    })
    .filter(
      (
        option: PropertyGroupCheckboxOption | null
      ): option is PropertyGroupCheckboxOption => option !== null
    );
};

/**
 * Property values verilerini yönetir
 * InstitutionType'a göre PropertyGroupType'ları ve bunların PropertyType'larını getirir
 */
export function usePropertyValues(): UsePropertyValuesReturn {
  const {
    data: institutionTypesResponse,
    loading: isLoading,
    error,
    refetch,
  } = useGet<ApiResponseDto<InstitutionTypeListDto[]>>(
    API_ENDPOINTS.INSTITUTIONS.INSTITUTION_TYPES
  );

  // Tüm institution types'ların tüm property group types'larını birleştir
  const allPropertyGroupTypes = useMemo(() => {
    if (!institutionTypesResponse?.data) {
      return [];
    }

    const allGroups: PropertyGroupTypeDto[] = [];

    institutionTypesResponse.data.forEach((institutionType) => {
      if (institutionType.propertyGroupTypeDtos) {
        allGroups.push(...institutionType.propertyGroupTypeDtos);
      }
    });

    return allGroups;
  }, [institutionTypesResponse?.data]);

  // Checkbox gruplarına transform et
  const propertyCheckboxGroups = useMemo(
    () => transformToCheckboxGroups(allPropertyGroupTypes),
    [allPropertyGroupTypes]
  );

  /**
   * Belirli bir InstitutionType ID'sine göre PropertyGroupType'ları filtreler
   */
  const getGroupsByInstitutionTypeId = (
    institutionTypeId: number | string | undefined
  ): PropertyGroupCheckboxOption[] => {
    if (!institutionTypeId || !institutionTypesResponse?.data) {
      return [];
    }

    const typeIdNum =
      typeof institutionTypeId === "string"
        ? parseInt(institutionTypeId, 10)
        : institutionTypeId;

    // InstitutionType'ı bul
    const institutionType = institutionTypesResponse.data.find(
      (type) => type.institutionTypeDto?.id === typeIdNum
    );

    if (!institutionType?.propertyGroupTypeDtos) {
      return [];
    }

    // Bu InstitutionType'a ait PropertyGroupTypes'ları transform et
    return transformToCheckboxGroups(institutionType.propertyGroupTypeDtos);
  };

  return {
    propertyGroupTypes: allPropertyGroupTypes,
    propertyCheckboxGroups,
    isLoading,
    error,
    refetch,
    getGroupsByInstitutionTypeId,
  };
}
