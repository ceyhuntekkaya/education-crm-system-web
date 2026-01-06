"use client";

import React, { createContext, useContext, useState } from "react";
import { RFQsContextValue, RFQsProviderProps } from "../types";
import { useRFQsData, useRFQsSort, useRFQsFilter } from "../hooks";

/**
 * 🔍 RFQS CONTEXT
 * Alım ilanları için context
 */

const RFQsContext = createContext<RFQsContextValue | undefined>(undefined);

export function RFQsProvider({ children, companyId }: RFQsProviderProps) {
  // 🎨 VIEW MODE
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // 🔍 FILTERING
  const { filters, filterHandlers, activeFilterCount } = useRFQsFilter();

  // 🔄 SORTING
  const {
    sortBy,
    sortOrder,
    showSortDropdown,
    dropdownRef,
    sortOptions,
    currentSortOption,
    setSortBy,
    setSortOrder,
    setShowSortDropdown,
    handleSortChange,
    toggleSortOrder,
    onSortChange,
    toggleSortDropdown,
    resetSort,
  } = useRFQsSort();

  // 📊 DATA
  const { rfqs, loading, error, totalElements, isEmpty, refetch } = useRFQsData(
    companyId,
    sortBy,
    sortOrder,
    filters
  );

  // 🎯 CONTEXT VALUE
  const contextValue: RFQsContextValue = {
    // Company ID
    companyId,

    // View
    viewMode,
    setViewMode,

    // Sorting State
    sortBy,
    sortOrder,
    showSortDropdown,

    // Sorting Refs
    dropdownRef,

    // Sorting Data
    sortOptions,
    currentSortOption,

    // Sorting Setters
    setSortBy,
    setSortOrder,
    setShowSortDropdown,

    // Sorting Handlers
    handleSortChange,
    toggleSortOrder,
    onSortChange,
    toggleSortDropdown,
    resetSort,

    // Filter State
    filters,

    // Filter Handlers
    filterHandlers,

    // Active Filter Count
    activeFilterCount,

    // API State
    rfqsListLoading: loading,
    rfqsListError: error,
    rfqsListRefetch: refetch,

    // Data
    rfqs,
    totalElements,
    rfqsListIsEmpty: isEmpty,
  };

  return (
    <RFQsContext.Provider value={contextValue}>{children}</RFQsContext.Provider>
  );
}

export function useRFQsContext() {
  const context = useContext(RFQsContext);
  if (context === undefined) {
    throw new Error("useRFQsContext must be used within a RFQsProvider");
  }
  return context;
}

export default RFQsContext;
