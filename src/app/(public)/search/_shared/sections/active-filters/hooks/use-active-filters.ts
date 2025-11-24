import { useMemo } from "react";
import { useSearchContext } from "../../../contexts";
import { useFormHook } from "@/hooks";
import { getGroupedActiveFilters } from "../utils";
import { FilterGroup } from "../types";

export interface UseActiveFiltersReturn {
  // Filter data
  filterGroups: FilterGroup[];
  totalActiveFilters: number;
  resultCount: number;
  hasActiveFilters: boolean;

  // Form state
  values: any;
  isDirty: boolean;

  // Actions
  removeFilter: (filterKey: string) => void;
  resetForm: () => void;
  updateField: (field: string, value: any) => void;
}

export const useActiveFilters = (): UseActiveFiltersReturn => {
  const { options, institutions, institutionTypes, totalElements } =
    useSearchContext();
  const { values, updateField, resetForm, isDirty } = useFormHook();

  // Compute filter groups
  const filterGroups = useMemo(() => {
    return getGroupedActiveFilters(values, isDirty, options, institutionTypes);
  }, [values, isDirty, options, institutionTypes]);

  // Compute totals
  const totalActiveFilters = useMemo(() => {
    return filterGroups.reduce(
      (total, group) => total + group.filters.length,
      0
    );
  }, [filterGroups]);

  // API'den gelen totalElements'i kullan, yoksa institutions.length kullan
  const resultCount = totalElements || institutions.length;
  const hasActiveFilters = totalActiveFilters > 0;

  // Filter removal logic
  const removeFilter = (filterKey: string) => {
    if (filterKey.startsWith("property_")) {
      // Eski tip dinamik property filter'ı temizle
      const propertyId = filterKey.replace("property_", "");
      const currentPropertyFilters = values.propertyFilters || {};
      const newPropertyFilters = { ...currentPropertyFilters };
      delete newPropertyFilters[propertyId];
      updateField("propertyFilters", newPropertyFilters);
    } else if (filterKey.startsWith("dynamic_")) {
      // Yeni tip dinamik property filter'ı temizle (grup adı + değer ID'si ile)
      const parts = filterKey.replace("dynamic_", "").split("_");
      if (parts.length >= 2) {
        const groupName = parts.slice(0, -1).join("_"); // Son elemanı çıkar, geri kalanı grup adı
        const valueToRemove = parts[parts.length - 1]; // Son eleman değer ID'si

        const currentValue = values[groupName];

        if (Array.isArray(currentValue)) {
          // Çoklu seçim - sadece bu değeri çıkar
          const newValue = currentValue.filter((val) => val !== valueToRemove);
          updateField(groupName, newValue as any);
        } else {
          // Tekli seçim - tümünü temizle
          updateField(groupName, "");
        }
      }
    } else if (filterKey === "ageRange") {
      updateField("ageRange", [1, 80] as any);
    } else if (filterKey === "feeRange") {
      updateField("feeRange", [0.1, 1000000] as any);
    } else if (filterKey === "institutionGroupId") {
      // Kurum kategorisi silindiğinde kurum tipini de sıfırla
      updateField("institutionGroupId", "");
      updateField("institutionTypeId", "");
    } else {
      updateField(
        filterKey,
        filterKey === "hasActiveCampaigns" || filterKey === "isSubscribed"
          ? false
          : ""
      );
    }
  };

  return {
    filterGroups,
    totalActiveFilters,
    resultCount,
    hasActiveFilters,
    values,
    isDirty,
    removeFilter,
    resetForm,
    updateField,
  };
};
