"use client";

/**
 * 🔄 POPOVER FILTERS HOOK
 * Popover filter state yönetimi
 */

import { useState, useCallback, useEffect, useMemo } from "react";
import type { PopoverFilterConfig } from "../types";
import {
  getPopoverConfigKey,
  calculateActiveFiltersCount,
} from "../utils/helpers";

export function usePopoverFilters(
  popoverFiltersConfig: PopoverFilterConfig[],
  filterOptions: any[]
) {
  // Her popover filter için state oluştur
  const [popoverFilterValues, setPopoverFilterValues] = useState<
    Record<string, string>
  >(() => ({}));

  // Popover filter değeri değiştiğinde (sadece internal state update)
  const handlePopoverFilterChange = useCallback(
    (filterId: string, value: string) => {
      setPopoverFilterValues((prev) => ({ ...prev, [filterId]: value }));
    },
    []
  );

  // PopoverFilters config'inin signature'ını hesapla
  const popoverConfigKey = useMemo(() => {
    return getPopoverConfigKey(popoverFiltersConfig);
  }, [popoverFiltersConfig]);

  // Initialize popover filter values once when config changes
  useEffect(() => {
    if (popoverFiltersConfig.length === 0) return;

    setPopoverFilterValues((prev) => {
      const newValues: Record<string, string> = {};
      let hasChanges = false;

      popoverFiltersConfig.forEach((filter) => {
        const existingValue = prev[filter.id];
        const defaultValue = filter.defaultValue || "ALL";

        if (existingValue !== undefined) {
          newValues[filter.id] = existingValue;
        } else {
          newValues[filter.id] = defaultValue;
          hasChanges = true;
        }
      });

      // Only update if there are actual changes or if it's the first initialization
      return hasChanges || Object.keys(prev).length === 0 ? newValues : prev;
    });
  }, [popoverConfigKey, popoverFiltersConfig]);

  // Aktif filter sayısını hesapla
  const activeFiltersCount = useMemo(() => {
    return calculateActiveFiltersCount(filterOptions, popoverFilterValues);
  }, [filterOptions, popoverFilterValues]);

  return {
    popoverFilterValues,
    handlePopoverFilterChange,
    activeFiltersCount,
    popoverConfigKey,
  };
}
