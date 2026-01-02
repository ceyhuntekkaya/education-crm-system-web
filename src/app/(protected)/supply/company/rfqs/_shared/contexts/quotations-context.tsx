"use client";

import React, { createContext, useContext, useState } from "react";
import { QuotationsContextValue, QuotationsProviderProps } from "../types";
import { useQuotationsData, useQuotationsSort } from "../hooks";

/**
 * 🔍 QUOTATIONS CONTEXT
 * Teklifler için context
 */

const QuotationsContext = createContext<QuotationsContextValue | undefined>(
  undefined
);

export function QuotationsProvider({
  children,
  companyId,
}: QuotationsProviderProps) {
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
  } = useQuotationsSort();

  // 📊 DATA
  const { quotations, loading, error, totalElements, isEmpty, refetch } =
    useQuotationsData(companyId, sortBy, sortOrder);

  // 🎯 CONTEXT VALUE
  const contextValue: QuotationsContextValue = {
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
    quotationsListLoading: loading,
    quotationsListError: error,
    quotationsListRefetch: refetch,

    // Data
    quotations,
    totalElements,
    quotationsListIsEmpty: isEmpty,
  };

  return (
    <QuotationsContext.Provider value={contextValue}>
      {children}
    </QuotationsContext.Provider>
  );
}

export function useQuotationsContext() {
  const context = useContext(QuotationsContext);
  if (context === undefined) {
    throw new Error(
      "useQuotationsContext must be used within a QuotationsProvider"
    );
  }
  return context;
}

export default QuotationsContext;
