"use client";

import { usePut } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { QuotationDto, QuotationUpdateDto } from "@/types";
import { useQuotationsContext } from "../../../_shared/contexts";

interface UseEditQuotationProps {
  quotationId: number;
  refetch?: () => void;
}

/**
 * Quotation güncelleme hook'u
 */
export const useEditQuotation = ({
  quotationId,
  refetch,
}: UseEditQuotationProps) => {
  const { refetch: refetchList } = useQuotationsContext();

  const {
    mutate: putQuotation,
    loading: isLoading,
    error,
  } = usePut<QuotationDto, QuotationUpdateDto>(
    () => API_ENDPOINTS.SUPPLY.QUOTATIONS.UPDATE(quotationId),
    {
      onSuccess: (data) => {
        // Liste API'sine tekrar istek at
        refetchList();
        // Refetch varsa çalıştır (quotation detail için)
        if (refetch) {
          refetch();
        }
      },
      onError: (error) => {
        console.error("❌ Quotation güncellenirken hata:", error);
      },
    },
  );

  return {
    putQuotation,
    isLoading,
    error,
  };
};
