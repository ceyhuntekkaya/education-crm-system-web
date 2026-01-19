"use client";

import React, { createContext, useContext, useState } from "react";
import { SuppliersContextValue, SuppliersProviderProps } from "../types";
import {
  useSuppliersData,
  useSuppliersSort,
  useSuppliersFilter,
} from "../hooks";

/**
 * 🔍 SUPPLIERS CONTEXT
 * Tedarikçiler için context
 */

const SuppliersContext = createContext<SuppliersContextValue | undefined>(
  undefined
);

export function SuppliersProvider({
  children,
  companyId,
}: SuppliersProviderProps) {
  // 🎨 VIEW MODE
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // 🔍 FILTERING
  const { filters, filterHandlers, activeFilterCount } = useSuppliersFilter();

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
  } = useSuppliersSort();

  // 📊 DATA
  const { suppliers, loading, error, totalElements, isEmpty, refetch } =
    useSuppliersData(companyId, sortBy, sortOrder, filters);

  // 🎯 CONTEXT VALUE
  const contextValue: SuppliersContextValue = {
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
    suppliersListLoading: loading,
    suppliersListError: error ?? null,
    suppliersListRefetch: refetch,

    // Data
    suppliers,
    totalElements,
    suppliersListIsEmpty: isEmpty,
  };

  return (
    <SuppliersContext.Provider value={contextValue}>
      {children}
    </SuppliersContext.Provider>
  );
}

export function useSuppliersContext() {
  const context = useContext(SuppliersContext);
  if (context === undefined) {
    throw new Error(
      "useSuppliersContext must be used within a SuppliersProvider"
    );
  }
  return context;
}

export default SuppliersContext;
