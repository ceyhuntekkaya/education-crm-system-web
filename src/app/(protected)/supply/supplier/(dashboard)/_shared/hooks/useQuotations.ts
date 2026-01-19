"use client";

import { useMemo } from "react";
import { useSupplierQuotations } from "./api";
import { QuotationDto } from "@/types/dto/supply";

/**
 * Tüm teklifleri ve bekleyen teklifleri getirir
 *
 * @param supplierId - Tedarikçi ID'si
 * @returns Tüm teklifler, bekleyen teklifler, loading ve error durumları
 */
export const useQuotations = (supplierId: number | null) => {
  // Tüm teklifleri getir (filtrelenmemiş)
  const {
    data: quotationsResponse,
    loading: quotationsLoading,
    error: quotationsError,
    refetch: refetchQuotations,
  } = useSupplierQuotations(supplierId);

  // Teklifleri çıkar
  const quotations = useMemo(() => {
    return quotationsResponse?.data?.content ?? [];
  }, [quotationsResponse]);

  // Bekleyen teklifleri filtrele: DRAFT, SUBMITTED, UNDER_REVIEW
  const pendingQuotations = useMemo(() => {
    return quotations.filter((quotation) =>
      ["DRAFT", "SUBMITTED", "UNDER_REVIEW"].includes(quotation.status ?? "")
    );
  }, [quotations]);

  return {
    quotations,
    pendingQuotations,
    quotationsLoading,
    quotationsError,
    refetchQuotations,
  };
};
