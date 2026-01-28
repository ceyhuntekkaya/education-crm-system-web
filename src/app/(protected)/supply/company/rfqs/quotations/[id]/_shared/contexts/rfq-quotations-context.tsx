"use client";

import React, { createContext, useContext, useState } from "react";
import { RFQQuotationsContextValue } from "../types";
import {
  useRFQQuotationsApi,
  useQuotationsSort,
  useQuotationsFilter,
  useProcessedQuotations,
} from "../hooks";
import { useRFQById } from "../../../../_shared/hooks/api";

const RFQQuotationsContext = createContext<
  RFQQuotationsContextValue | undefined
>(undefined);

export const useRFQQuotationsContext = () => {
  const context = useContext(RFQQuotationsContext);
  if (!context) {
    throw new Error(
      "useRFQQuotationsContext must be used within RFQQuotationsProvider",
    );
  }
  return context;
};

interface RFQQuotationsProviderProps {
  children: React.ReactNode;
}

export const RFQQuotationsProvider: React.FC<RFQQuotationsProviderProps> = ({
  children,
}) => {
  // 🎨 VIEW MODE
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // 🔍 SEARCH
  const [searchQuery, setSearchQuery] = useState("");

  // 🔄 SORTING
  const {
    sortBy,
    sortOrder,
    sortOptions,
    currentSortOption,
    onSortChange,
    toggleSortOrder,
    resetSort,
  } = useQuotationsSort();

  // 🔍 FILTERING
  const { filters, filterHandlers, activeFilterCount } = useQuotationsFilter();

  // 📊 DATA
  const { quotations, isLoading, error, refetch, rfqId } =
    useRFQQuotationsApi();

  // RFQ verisini context'te tut
  const { rfq, isLoading: rfqLoading } = useRFQById(rfqId);

  // 🔄 PROCESSED DATA
  const processedQuotations = useProcessedQuotations({
    quotations,
    searchQuery,
    filters,
    sortBy,
    sortOrder,
  });

  const value: RFQQuotationsContextValue = {
    // Data
    quotations,
    filteredQuotations: processedQuotations,
    rfq,
    isLoading: isLoading || rfqLoading,
    error,
    rfqId: String(rfqId),

    // View
    viewMode,
    setViewMode,

    // Search
    searchQuery,
    setSearchQuery,

    // Sort
    sortBy,
    sortOrder,
    sortOptions,
    currentSortOption,
    onSortChange,
    toggleSortOrder,
    resetSort,

    // Filter
    filters,
    filterHandlers,
    activeFilterCount,

    // Actions
    refetch,
  };

  return (
    <RFQQuotationsContext.Provider value={value}>
      {children}
    </RFQQuotationsContext.Provider>
  );
};
