import { FILTER_GROUPS } from "../constants";
import { FilterGroup } from "../types";
import { getDynamicGroupIcon } from "./icon-helpers";
import { InstitutionTypeListDto } from "@/types";

// Statik filter gruplarını oluşturma
export const createStaticFilterGroups = (
  allFilters: Array<{
    key: string;
    label: string;
    value: string;
  }>
): FilterGroup[] => {
  const groups: FilterGroup[] = [];

  Object.entries(FILTER_GROUPS).forEach(([groupKey, groupConfig]) => {
    const groupFilters = allFilters.filter((filter) => {
      // Normal field'lar için
      if (groupConfig.fields.includes(filter.key)) {
        return true;
      }
      // Sadece eski tip property filtreleri features grubuna ekle
      if (groupKey === "features" && filter.key.startsWith("property_")) {
        return true;
      }
      return false;
    });

    if (groupFilters.length > 0) {
      groups.push({
        title: groupConfig.title,
        icon: groupConfig.icon,
        filters: groupFilters,
      });
    }
  });

  return groups;
};

// Dinamik filter gruplarını oluşturma
export const createDynamicFilterGroups = (
  allFilters: Array<{
    key: string;
    label: string;
    value: string;
  }>,
  selectedInstitutionTypeId: string,
  institutionTypes: InstitutionTypeListDto[]
): FilterGroup[] => {
  const groups: FilterGroup[] = [];

  if (!selectedInstitutionTypeId) return groups;

  const mockData = institutionTypes.find(
    (item: any) =>
      item.institutionTypeDto?.id?.toString() === selectedInstitutionTypeId
  );

  if (!mockData?.propertyGroupTypeDtos) return groups;

  mockData.propertyGroupTypeDtos.forEach((group: any) => {
    // Bu gruba ait filtreleri bul
    const dynamicGroupFilters = allFilters.filter((filter) =>
      filter.key.startsWith(`dynamic_${group.name}_`)
    );

    if (dynamicGroupFilters.length > 0) {
      groups.push({
        title: group.displayName || group.name,
        icon: getDynamicGroupIcon(group.name),
        filters: dynamicGroupFilters,
      });
    }
  });

  return groups;
};

// Tüm filter gruplarını birleştirme
export const combineFilterGroups = (
  staticGroups: FilterGroup[],
  dynamicGroups: FilterGroup[]
): FilterGroup[] => {
  return [...staticGroups, ...dynamicGroups];
};
