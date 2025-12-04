"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import {
  InstitutionTypeSummaryDto,
  ApiResponseDto,
  InstitutionTypeListDto,
} from "@/types";
import { formatTitle } from "@/utils";
import { useMemo, useCallback } from "react";

/**
 * Metni title case formatına çevirir
 */
const toTitleCase = (text: string): string => {
  const lowerCaseWords = [
    "ve",
    "veya",
    "ile",
    "için",
    "de",
    "da",
    "bir",
    "gibi",
  ];

  return text
    .toLowerCase()
    .split(" ")
    .map((word, index) => {
      if (index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      if (lowerCaseWords.includes(word)) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

export interface InstitutionTypeOption {
  value: string;
  label: string;
  groupId?: number;
  groupName?: string;
}

export interface InstitutionGroupOption {
  value: string;
  label: string;
}

interface UseInstitutionTypesReturn {
  institutionTypes: InstitutionTypeSummaryDto[];
  institutionTypeOptions: InstitutionTypeOption[];
  institutionGroupOptions: InstitutionGroupOption[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  getFilteredTypesByGroupId: (
    groupId: string | undefined
  ) => InstitutionTypeOption[];
  getGroupIdByTypeId: (typeId: string | undefined) => string | undefined;
}

/**
 * Institution types listesi getiren hook
 * @returns Institution types verileri ve yönetim fonksiyonları
 */
export const useInstitutionTypes = (): UseInstitutionTypesReturn => {
  // InstitutionTypeListDto'yu kullan - groupId ve groupName içeriyor
  const {
    data: response,
    loading: isLoading,
    error,
    refetch,
  } = useGet<ApiResponseDto<InstitutionTypeListDto[]>>(
    API_ENDPOINTS.INSTITUTIONS.INSTITUTION_TYPES
  );

  const institutionTypes = useMemo(() => {
    // InstitutionTypeListDto'dan InstitutionTypeSummaryDto'ya dönüştür
    return (response?.data || [])
      .filter((item) => item.institutionTypeDto?.id)
      .map((item) => ({
        id: item.institutionTypeDto!.id!,
        name: item.institutionTypeDto!.name || "",
        displayName: item.institutionTypeDto!.displayName || "",
        groupId: item.institutionTypeDto!.groupId,
        groupName: item.institutionTypeDto!.groupName,
      })) as InstitutionTypeSummaryDto[];
  }, [response?.data]);

  // Institution type dropdown için options hazırla (groupId ve groupName ile birlikte)
  const institutionTypeOptions = useMemo(
    () => [
      { value: "", label: "Kurum tipi seçiniz..." },
      ...institutionTypes.map((type) => ({
        value: type.id?.toString() || "",
        label: formatTitle(type.displayName || type.name || ""),
        groupId: type.groupId,
        groupName: type.groupName,
      })),
    ],
    [institutionTypes]
  );

  // Unique grupları topla
  const institutionGroupOptions = useMemo(() => {
    const groupsMap = new Map<number, { groupId: number; groupName: string }>();

    institutionTypes.forEach((type) => {
      const { groupId, groupName } = type;

      if (groupId && groupName && !groupsMap.has(groupId)) {
        groupsMap.set(groupId, { groupId, groupName });
      }
    });

    const groups = Array.from(groupsMap.values()).sort((a, b) =>
      a.groupName.localeCompare(b.groupName, "tr")
    );

    return [
      { value: "", label: "Kurum kategorisi seçiniz..." },
      ...groups.map((group) => ({
        value: group.groupId.toString(),
        label: toTitleCase(group.groupName),
      })),
    ];
  }, [institutionTypes]);

  // Seçili gruba göre kurum tiplerini filtrele
  const getFilteredTypesByGroupId = useCallback(
    (groupId: string | undefined): InstitutionTypeOption[] => {
      if (!groupId || groupId === "") {
        return [{ value: "", label: "Önce kurum kategorisi seçiniz..." }];
      }

      const filtered = institutionTypeOptions.filter((type) => {
        if (type.value === "") return true;
        return type.groupId?.toString() === groupId;
      });

      return filtered.length > 1
        ? filtered
        : [{ value: "", label: "Bu kategoride kurum tipi bulunamadı" }];
    },
    [institutionTypeOptions]
  );

  // Kurum tipi ID'sine göre grup ID'sini bul (edit modunda kullanılacak)
  const getGroupIdByTypeId = useCallback(
    (typeId: string | undefined): string | undefined => {
      if (!typeId || typeId === "") return undefined;

      const foundType = institutionTypeOptions.find(
        (type) => type.value === typeId
      );
      return foundType?.groupId?.toString();
    },
    [institutionTypeOptions]
  );

  return {
    institutionTypes,
    institutionTypeOptions,
    institutionGroupOptions,
    isLoading,
    error,
    refetch,
    getFilteredTypesByGroupId,
    getGroupIdByTypeId,
  };
};
