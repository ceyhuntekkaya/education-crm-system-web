/**
 * 🔧 UTILITY FUNCTIONS
 * Page layout için yardımcı fonksiyonlar
 */

import type { FilterOption, PopoverFilterConfig } from "../types";

/**
 * Filter ve popover filter'ları ayırır
 */
export function separateFilters(
  allFilterOptions: (FilterOption | PopoverFilterConfig)[]
) {
  const filterOptions = allFilterOptions.filter(
    (opt): opt is FilterOption => "type" in opt
  );
  const popoverFiltersConfig = allFilterOptions.filter(
    (opt): opt is PopoverFilterConfig => "activeColor" in opt
  );

  return { filterOptions, popoverFiltersConfig };
}

/**
 * Popover filter config signature hesaplar
 */
export function getPopoverConfigKey(
  popoverFiltersConfig: PopoverFilterConfig[]
) {
  return popoverFiltersConfig
    .map((f) => `${f.id}:${f.defaultValue || "ALL"}`)
    .join("|");
}

/**
 * Aktif filter sayısını hesaplar
 */
export function calculateActiveFiltersCount(
  filterOptions: FilterOption[],
  popoverFilterValues: Record<string, string>
) {
  const standardFiltersCount = filterOptions.filter((filter) => {
    if (filter.type === "select" || filter.type === "multiSelect") {
      return (
        filter.value &&
        filter.value !== "ALL" &&
        (Array.isArray(filter.value) ? filter.value.length > 0 : true)
      );
    }
    if (filter.type === "date") {
      return filter.value !== null && filter.value !== "";
    }
    if (filter.type === "dateRange") {
      return filter.value?.from || filter.value?.to;
    }
    if (filter.type === "search") {
      return filter.value && filter.value.trim() !== "";
    }
    return false;
  }).length;

  const popoverFiltersCount = Object.values(popoverFilterValues).filter(
    (value) => value && value !== "ALL" && value !== ""
  ).length;

  return standardFiltersCount + popoverFiltersCount;
}

/**
 * Data'yı popover filters ve search query'ye göre filtreler
 */
export function filterData<T extends Record<string, any>>(
  data: T[],
  popoverFiltersConfig: PopoverFilterConfig[],
  popoverFilterValues: Record<string, string>,
  searchFields?: string[],
  searchQuery?: string
): T[] {
  if (!data || data.length === 0) return data;

  let result = data;

  // 1. Popover filters uygula
  result = result.filter((item) => {
    return popoverFiltersConfig.every((filterConfig) => {
      const filterValue = popoverFilterValues[filterConfig.id];

      // ALL seçilmişse geç
      if (!filterValue || filterValue === "ALL") return true;

      // Field name'i al (fieldName varsa onu kullan, yoksa id'yi kullan)
      const fieldName = filterConfig.fieldName || filterConfig.id;
      const itemValue = item[fieldName];

      // Değer eşleşiyorsa geç
      return itemValue === filterValue;
    });
  });

  // 2. Search query uygula (eğer searchFields belirtilmişse)
  if (searchFields && searchFields.length > 0 && searchQuery?.trim()) {
    const query = searchQuery.toLowerCase().trim();
    result = result.filter((item) => {
      return searchFields.some((field) => {
        const value = item[field];
        return value && String(value).toLowerCase().includes(query);
      });
    });
  }

  return result;
}
