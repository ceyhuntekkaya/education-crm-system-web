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
 * Social media useEditPost yapısı ile aynı mimari
 */
export const useEditQuotation = ({
  quotationId,
  refetch,
}: UseEditQuotationProps) => {
  const { quotationsListRefetch: refetchList } = useQuotationsContext();

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
    }
  );

  return {
    putQuotation,
    isLoading,
    error,
  };
};
