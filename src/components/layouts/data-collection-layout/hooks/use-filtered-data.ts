"use client";

/**
 * 📊 FILTERED DATA HOOK
 * Data filtreleme işlemlerini yöneten hook
 */

import { useMemo } from "react";
import type { PopoverFilterConfig } from "../types";
import { filterData, sortData } from "../utils/helpers";

export function useFilteredData<T extends Record<string, any>>(
  dataItems: T[],
  popoverFiltersConfig: PopoverFilterConfig[],
  popoverFilterValues: Record<string, string>,
  searchFields?: string[],
  searchQuery?: string,
  sortBy?: string,
  sortOrder?: string
) {
  return useMemo(() => {
    // Önce filtreleme uygula
    const filteredData = filterData(
      dataItems,
      popoverFiltersConfig,
      popoverFilterValues,
      searchFields,
      searchQuery
    );

    // Sonra sıralama uygula (eğer geçerli sıralama kriterleri varsa)
    if (sortBy && sortBy !== "none" && filteredData.length > 0) {
      return sortData(filteredData, sortBy, sortOrder || "asc");
    }

    return filteredData;
  }, [
    dataItems,
    popoverFiltersConfig,
    popoverFilterValues,
    searchFields,
    searchQuery,
    sortBy,
    sortOrder,
  ]);
}
