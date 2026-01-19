"use client";

import { useState, useMemo, useCallback } from "react";
import type { FilterState, FilterHandlers } from "../types";

/**
 * 🔍 RFQ INVITATIONS FILTER HOOK
 * RFQ davetleri filtreleme mantığını yöneten hook
 */
export const useInvitationsFilter = () => {
  // 🎯 FILTER STATE
  const [searchQuery, setSearchQuery] = useState<string>("");

  // 📊 FILTER STATE OBJECT
  const filters: FilterState = useMemo(
    () => ({
      searchQuery,
    }),
    [searchQuery]
  );

  // 🔄 FILTER HANDLERS
  const resetFilters = useCallback(() => {
    setSearchQuery("");
  }, []);

  const filterHandlers: FilterHandlers = useMemo(
    () => ({
      setSearchQuery,
      resetFilters,
    }),
    [resetFilters]
  );

  // 📈 ACTIVE FILTER COUNT
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim()) count++;
    return count;
  }, [searchQuery]);

  return {
    filters,
    filterHandlers,
    activeFilterCount,
  };
};
