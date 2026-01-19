"use client";

import { usePut } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { RFQDto, RFQUpdateDto } from "@/types";
import { useRFQsContext } from "../../../_shared/contexts";

interface UseEditRFQProps {
  rfqId: number;
  refetch?: () => void;
}

/**
 * RFQ güncelleme hook'u
 */
export const useEditRFQ = ({ rfqId, refetch }: UseEditRFQProps) => {
  const { refetch: refetchList } = useRFQsContext();

  const {
    mutate: putRFQ,
    loading: isLoading,
    error,
  } = usePut<RFQDto, RFQUpdateDto>(
    () => API_ENDPOINTS.SUPPLY.RFQS.UPDATE(rfqId),
    {
      onSuccess: (data) => {
        // Liste API'sine tekrar istek at
        refetchList();
        // Refetch varsa çalıştır (rfq detail için)
        if (refetch) {
          refetch();
        }
      },
      onError: (error) => {
        console.error("❌ RFQ güncellenirken hata:", error);
      },
    }
  );

  return {
    putRFQ,
    isLoading,
    error,
  };
};
