"use client";

import { useMemo } from "react";
import type { QuotationDto } from "@/types";

import { useGetQuotationsByCompany } from "./api";

/**
 * 🔍 QUOTATIONS DATA HOOK
 * Teklif verilerini ve API çağrılarını yöneten hook
 */
export const useQuotationsData = (companyId: number) => {
  // 📊 API DATA
  const { data, loading, error, refetch } =
    useGetQuotationsByCompany(companyId);

  // 📦 DATA
  const quotations = useMemo<QuotationDto[]>(() => {
    if (!data?.data?.content || !Array.isArray(data.data.content)) return [];
    return data.data.content.filter((q) => q && typeof q === "object");
  }, [data]);

  // 🎯 COMPUTED VALUES
  const totalElements = useMemo(() => data?.data?.totalElements ?? 0, [data]);
  const totalPages = useMemo(() => data?.data?.totalPages ?? 0, [data]);
  const isEmpty = useMemo(
    () => !loading && quotations.length === 0,
    [loading, quotations]
  );
  const hasError = useMemo(() => !!error, [error]);

  return {
    // API State
    loading,
    error: error as Error | null,
    refetch,

    // Data
    quotations,

    // Computed Values
    totalElements,
    totalPages,
    isEmpty,
    hasError,
  };
};
