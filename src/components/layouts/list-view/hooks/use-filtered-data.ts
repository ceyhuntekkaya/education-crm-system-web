"use client";

/**
 * 📊 FILTERED DATA HOOK
 * Data filtreleme işlemlerini yöneten hook
 */

import { useMemo } from "react";
import type { PopoverFilterConfig } from "../types";
import { filterData } from "../utils/helpers";

export function useFilteredData<T extends Record<string, any>>(
  dataItems: T[],
  popoverFiltersConfig: PopoverFilterConfig[],
  popoverFilterValues: Record<string, string>,
  searchFields?: string[],
  searchQuery?: string,
  popoverConfigKey?: string
) {
  return useMemo(() => {
    return filterData(
      dataItems,
      popoverFiltersConfig,
      popoverFilterValues,
      searchFields,
      searchQuery
    );
  }, [
    dataItems,
    popoverFiltersConfig,
    popoverFilterValues,
    searchFields,
    searchQuery,
    popoverConfigKey, // Use memoized key instead of popoverFiltersConfig array
  ]);
}
