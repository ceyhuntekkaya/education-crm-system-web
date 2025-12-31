"use client";

import React, { createContext, useContext, useState } from "react";
import { QuotationsContextValue, QuotationsProviderProps } from "../types";
import { useQuotationsData } from "../hooks";

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

  // 📊 DATA
  const { quotations, loading, error, totalElements, isEmpty, refetch } =
    useQuotationsData(companyId);

  // 🎯 CONTEXT VALUE
  const contextValue: QuotationsContextValue = {
    // View
    viewMode,
    setViewMode,

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
