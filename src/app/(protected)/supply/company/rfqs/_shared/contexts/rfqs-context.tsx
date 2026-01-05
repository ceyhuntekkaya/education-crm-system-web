"use client";

import React, { createContext, useContext, useState } from "react";
import { RFQsContextValue, RFQsProviderProps } from "../types";
import { useRFQsData, useRFQsSort } from "../hooks";

/**
 * 🔍 RFQS CONTEXT
 * Teklif talepleri için context
 */

const RFQsContext = createContext<RFQsContextValue | undefined>(undefined);

export function RFQsProvider({ children, companyId }: RFQsProviderProps) {
  // 🎨 VIEW MODE
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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
    sortOrder
  );

  // 🎯 CONTEXT VALUE
  const contextValue: RFQsContextValue = {
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
