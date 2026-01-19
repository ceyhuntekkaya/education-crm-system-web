"use client";

import React, { createContext, useContext, useState } from "react";
import { useParams } from "next/navigation";
import type {
  ComparisonContextType,
  QuotationComparisonDto,
  ComparisonViewMode,
} from "../types";
import { useComparisonData } from "../hooks";

/**
 * Comparison Context
 */
const ComparisonContext = createContext<ComparisonContextType | undefined>(
  undefined
);

/**
 * Comparison Provider Props
 */
interface ComparisonProviderProps {
  children: React.ReactNode;
}

/**
 * Comparison Provider Component
 *
 * RFQ teklif karşılaştırma sayfası için state yönetimi
 */
export const ComparisonProvider: React.FC<ComparisonProviderProps> = ({
  children,
}) => {
  const params = useParams();
  const rfqId = Number(params.id);

  // View mode state
  const [viewMode, setViewMode] = useState<ComparisonViewMode>("table");

  // Selected comparison state
  const [selectedComparison, setSelectedComparison] =
    useState<QuotationComparisonDto | null>(null);

  // Fetch comparison data
  const { comparisons, loading, error, refetch } = useComparisonData(rfqId);

  const value: ComparisonContextType = {
    // Data
    comparisons,
    isLoading: loading,
    error,
    rfqId,

    // View mode
    viewMode,
    setViewMode,

    // Selection
    selectedComparison,
    selectComparison: setSelectedComparison,

    // Actions
    refetchComparisons: refetch,
  };

  return (
    <ComparisonContext.Provider value={value}>
      {children}
    </ComparisonContext.Provider>
  );
};

/**
 * Use Comparison Context Hook
 *
 * @returns Comparison context
 * @throws Error if used outside ComparisonProvider
 */
export const useComparisonContext = (): ComparisonContextType => {
  const context = useContext(ComparisonContext);

  if (context === undefined) {
    throw new Error(
      "useComparisonContext must be used within a ComparisonProvider"
    );
  }

  return context;
};
