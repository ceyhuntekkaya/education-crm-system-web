"use client";

import { useState, useMemo, useCallback } from "react";
import type { FilterState, FilterHandlers } from "../types";
import type { RFQStatus, RFQType } from "@/types";

/**
 * 🔍 RFQS FILTER HOOK
 * Teklif talepleri filtreleme mantığını yöneten hook
 */
export const useRFQsFilter = () => {
  // 🎯 FILTER STATE
  const [status, setStatus] = useState<RFQStatus | "ALL">("ALL");
  const [type, setType] = useState<RFQType | "ALL">("ALL");
  const [dateFrom, setDateFrom] = useState<string | null>(null);
  const [dateTo, setDateTo] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // 📊 FILTER STATE OBJECT
  const filters: FilterState = useMemo(
    () => ({
      status,
      type,
      dateFrom,
      dateTo,
      searchQuery,
    }),
    [status, type, dateFrom, dateTo, searchQuery]
  );

  // 🔄 FILTER HANDLERS
  const clearDateRange = useCallback(() => {
    setDateFrom(null);
    setDateTo(null);
  }, []);

  const resetFilters = useCallback(() => {
    setStatus("ALL");
    setType("ALL");
    setDateFrom(null);
    setDateTo(null);
    setSearchQuery("");
  }, []);

  const filterHandlers: FilterHandlers = useMemo(
    () => ({
      setStatus,
      setType,
      setDateFrom,
      setDateTo,
      setSearchQuery,
      resetFilters,
      clearDateRange,
    }),
    [resetFilters, clearDateRange]
  );

  // 📈 ACTIVE FILTER COUNT
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (status !== "ALL") count++;
    if (type !== "ALL") count++;
    if (dateFrom || dateTo) count++;
    if (searchQuery.trim()) count++;
    return count;
  }, [status, type, dateFrom, dateTo, searchQuery]);

  return {
    filters,
    filterHandlers,
    activeFilterCount,
  };
};
