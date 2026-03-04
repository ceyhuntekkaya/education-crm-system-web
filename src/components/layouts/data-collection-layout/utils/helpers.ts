/**
 * 🔧 UTILITY FUNCTIONS
 * Page layout için yardımcı fonksiyonlar
 */

import type { FilterOption, PopoverFilterConfig } from "../types";

/**
 * Filter ve popover filter'ları ayırır
 */
export function separateFilters(
  allFilterOptions: (FilterOption | PopoverFilterConfig)[],
) {
  const filterOptions = allFilterOptions.filter(
    (opt): opt is FilterOption => "type" in opt,
  );
  const popoverFiltersConfig = allFilterOptions.filter(
    (opt): opt is PopoverFilterConfig => "options" in opt && !("type" in opt), // PopoverFilterConfig'de options var ama type yok
  );

  return { filterOptions, popoverFiltersConfig };
}

/**
 * Popover filter config signature hesaplar
 */
export function getPopoverConfigKey(
  popoverFiltersConfig: PopoverFilterConfig[],
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
  popoverFilterValues: Record<string, string>,
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
    (value) => value && value !== "ALL" && value !== "",
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
  searchQuery?: string,
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

/**
 * Data'yı verilen kriterlere göre sıralar
 */
export function sortData<T extends Record<string, any>>(
  data: T[],
  sortBy: string,
  sortOrder: string,
): T[] {
  if (!data || data.length === 0 || !sortBy || sortBy === "none") {
    return data;
  }

  // Sıralama kriterini parse et ("field", "field_asc" veya "field_desc" formatı)
  let sortField = sortBy;
  let isDescending = false;

  if (sortBy.endsWith("_desc")) {
    sortField = sortBy.replace("_desc", "");
    isDescending = true;
  } else if (sortBy.endsWith("_asc")) {
    sortField = sortBy.replace("_asc", "");
    isDescending = false;
  } else if (sortOrder === "desc") {
    isDescending = true;
  }

  // Sıralama işlemi
  const sorted = [...data].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    // Null/undefined değerleri en sona koy
    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return 1;
    if (bValue == null) return -1;

    let comparison = 0;

    // Tarih karşılaştırması - ÖNCE kontrol edilmeli (date string'ler parseFloat ile yanlış sayısal eşleşebilir)
    if (
      aValue instanceof Date ||
      bValue instanceof Date ||
      (typeof aValue === "string" && /\d{4}-\d{2}-\d{2}/.test(aValue)) ||
      (typeof bValue === "string" && /\d{4}-\d{2}-\d{2}/.test(bValue))
    ) {
      const dateA = new Date(aValue);
      const dateB = new Date(bValue);

      // Geçersiz tarih kontrolü
      if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
        // Geçersiz tarihler string olarak karşılaştırılsın
        const strA = String(aValue).toLowerCase();
        const strB = String(bValue).toLowerCase();
        comparison = strA.localeCompare(strB, "tr", { numeric: true });
      } else {
        comparison = dateA.getTime() - dateB.getTime();
      }
    }
    // Sayısal karşılaştırma - salt sayısal değerler için
    else if (
      typeof aValue === "number" ||
      typeof bValue === "number" ||
      (!isNaN(Number(aValue)) &&
        !isNaN(Number(bValue)) &&
        aValue !== "" &&
        bValue !== "")
    ) {
      const numA = typeof aValue === "number" ? aValue : Number(aValue);
      const numB = typeof bValue === "number" ? bValue : Number(bValue);
      comparison = numA - numB;
    }
    // String karşılaştırması
    else {
      const strA = String(aValue).toLowerCase();
      const strB = String(bValue).toLowerCase();
      comparison = strA.localeCompare(strB, "tr", { numeric: true });
    }

    // Sıralama yönünü uygula
    return isDescending ? -comparison : comparison;
  });

  return sorted;
}
