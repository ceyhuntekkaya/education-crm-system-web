"use client";

import { useState, useMemo, useCallback } from "react";
import type { FilterState, FilterHandlers } from "../types";

/**
 * 🔍 SUPPLIERS FILTER HOOK
 * Tedarikçi filtreleme mantığını yöneten hook
 */
export const useSuppliersFilter = () => {
  // 🎯 FILTER STATE
  const [isActive, setIsActive] = useState<"ALL" | "true" | "false">("ALL");
  const [dateFrom, setDateFrom] = useState<string | null>(null);
  const [dateTo, setDateTo] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [minRating, setMinRating] = useState<number | null>(null);

  // 📊 FILTER STATE OBJECT
  const filters: FilterState = useMemo(
    () => ({
      isActive,
      dateFrom,
      dateTo,
      searchQuery,
      minRating,
    }),
    [isActive, dateFrom, dateTo, searchQuery, minRating]
  );

  // 🔄 FILTER HANDLERS
  const clearDateRange = useCallback(() => {
    setDateFrom(null);
    setDateTo(null);
  }, []);

  const resetFilters = useCallback(() => {
    setIsActive("ALL");
    setDateFrom(null);
    setDateTo(null);
    setSearchQuery("");
    setMinRating(null);
  }, []);

  const filterHandlers: FilterHandlers = useMemo(
    () => ({
      setIsActive,
      setDateFrom,
      setDateTo,
      setSearchQuery,
      setMinRating,
      resetFilters,
      clearDateRange,
    }),
    [resetFilters, clearDateRange]
  );

  // 📈 ACTIVE FILTER COUNT
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (isActive !== "ALL") count++;
    if (dateFrom || dateTo) count++;
    if (searchQuery.trim()) count++;
    if (minRating !== null) count++;
    return count;
  }, [isActive, dateFrom, dateTo, searchQuery, minRating]);

  return {
    filters,
    filterHandlers,
    activeFilterCount,
  };
};
