"use client";

import React, { createContext, useContext, useState } from "react";
import { RFQItemsContextValue, RFQItemsProviderProps } from "../types";
import { useItemsData, useItemsSort, useItemsFilter } from "../hooks";

/**
 * 🔍 RFQ ITEMS CONTEXT
 * RFQ kalemleri için context
 */

const RFQItemsContext = createContext<RFQItemsContextValue | undefined>(
  undefined
);

export function RFQItemsProvider({ children, rfqId }: RFQItemsProviderProps) {
  // 🎨 VIEW MODE
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // 🔍 FILTERING
  const { filters, filterHandlers, activeFilterCount } = useItemsFilter();

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
  } = useItemsSort();

  // 📊 DATA
  const { items, rawItems, loading, error, totalElements, isEmpty, refetch } =
    useItemsData(rfqId, sortBy, sortOrder, filters);

  // 🏷️ UNIQUE CATEGORIES (filtrelenmemiş raw data'dan)
  const uniqueCategories = React.useMemo(() => {
    const categoryMap = new Map<number, string>();
    rawItems.forEach((item) => {
      if (item.categoryId && item.categoryName) {
        categoryMap.set(item.categoryId, item.categoryName);
      }
    });
    return Array.from(categoryMap.entries())
      .map(([id, name]) => ({ id, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [rawItems]);

  // 🎯 CONTEXT VALUE
  const contextValue: RFQItemsContextValue = {
    // RFQ ID
    rfqId,

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
    itemsListLoading: loading,
    itemsListError: error,
    itemsListRefetch: refetch,

    // Data
    items,
    totalElements,
    itemsListIsEmpty: isEmpty,

    // Categories
    uniqueCategories,
  };

  return (
    <RFQItemsContext.Provider value={contextValue}>
      {children}
    </RFQItemsContext.Provider>
  );
}

export function useRFQItemsContext() {
  const context = useContext(RFQItemsContext);
  if (context === undefined) {
    throw new Error(
      "useRFQItemsContext must be used within a RFQItemsProvider"
    );
  }
  return context;
}

export default RFQItemsContext;
