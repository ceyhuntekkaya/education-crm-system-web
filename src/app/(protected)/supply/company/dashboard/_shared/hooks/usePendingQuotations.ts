"use client";

import { useMemo } from "react";
import { useCompanyQuotations, QuotationDto } from "./api";

/**
 * Bekleyen teklifleri getirir ve filtreler
 * Bekleyen Durumlar: SUBMITTED, UNDER_REVIEW, ACCEPTED
 *
 * @param companyId - Şirket ID'si
 * @returns Bekleyen teklifler, loading ve error durumları
 */
export const usePendingQuotations = (companyId: number | null) => {
  const {
    data: quotationsResponse,
    loading: quotationsLoading,
    error: quotationsError,
    refetch: refetchQuotations,
  } = useCompanyQuotations(companyId);

  // Bekleyen teklifleri filtrele: SUBMITTED, UNDER_REVIEW, ACCEPTED
  const pendingQuotations = useMemo(() => {
    const quotations = quotationsResponse?.data?.content ?? [];
    return quotations.filter((quotation) =>
      ["SUBMITTED", "UNDER_REVIEW", "ACCEPTED"].includes(quotation.status ?? "")
    );
  }, [quotationsResponse]);

  return {
    pendingQuotations,
    quotationsLoading,
    quotationsError,
    refetchQuotations,
  };
};
