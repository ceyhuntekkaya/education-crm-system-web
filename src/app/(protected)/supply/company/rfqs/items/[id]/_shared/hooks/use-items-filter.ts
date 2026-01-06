"use client";

import { useState, useMemo, useCallback } from "react";
import type { FilterState, FilterHandlers } from "../types";

/**
 * 🔍 RFQ ITEMS FILTER HOOK
 * RFQ kalemleri filtreleme mantığını yöneten hook
 */
export const useItemsFilter = () => {
  // 🎯 FILTER STATE
  const [categoryId, setCategoryId] = useState<number | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // 📊 FILTER STATE OBJECT
  const filters: FilterState = useMemo(
    () => ({
      categoryId,
      searchQuery,
    }),
    [categoryId, searchQuery]
  );

  // 🔄 FILTER HANDLERS
  const resetFilters = useCallback(() => {
    setCategoryId("ALL");
    setSearchQuery("");
  }, []);

  const filterHandlers: FilterHandlers = useMemo(
    () => ({
      setCategoryId,
      setSearchQuery,
      resetFilters,
    }),
    [resetFilters]
  );

  // 📈 ACTIVE FILTER COUNT
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (categoryId !== "ALL") count++;
    if (searchQuery.trim()) count++;
    return count;
  }, [categoryId, searchQuery]);

  return {
    filters,
    filterHandlers,
    activeFilterCount,
  };
};
