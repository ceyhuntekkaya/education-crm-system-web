"use client";

import { useMemo } from "react";
import { useCompanyRFQs, RFQDto } from "./api";

/**
 * Aktif ilanları getirir ve filtreler
 * Aktif Durum: PUBLISHED
 *
 * @param companyId - Şirket ID'si
 * @returns Aktif ilanlar, loading ve error durumları
 */
export const useActiveRFQs = (companyId: number | null) => {
  const {
    data: rfqsResponse,
    loading: rfqsLoading,
    error: rfqsError,
    refetch: refetchRFQs,
  } = useCompanyRFQs(companyId);

  // Aktif ilanları filtrele: PUBLISHED
  const activeRFQs = useMemo(() => {
    const rfqs = rfqsResponse?.data?.content ?? [];
    return rfqs.filter((rfq) => rfq.status === "PUBLISHED");
  }, [rfqsResponse]);

  return {
    activeRFQs,
    rfqsLoading,
    rfqsError,
    refetchRFQs,
  };
};
