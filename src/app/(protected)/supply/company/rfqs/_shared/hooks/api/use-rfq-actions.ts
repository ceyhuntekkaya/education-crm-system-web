"use client";

import { usePatch } from "@/hooks/api";
import { API_ENDPOINTS } from "@/lib";
import type { RFQDto, ApiResponseDto } from "@/types";

/**
 * RFQ aksiyonları için API hook
 * İlanı Yayınla, Kapat, İptal Et
 * @param rfqId - RFQ ID'si
 * @returns RFQ aksiyon fonksiyonları ve loading state'leri
 */
export const useRFQActions = (rfqId: number) => {
  const { mutate: publishRFQ, loading: isPublishing } = usePatch<
    ApiResponseDto<RFQDto>,
    Record<string, never>
  >(API_ENDPOINTS.SUPPLY.RFQS.PUBLISH(rfqId));

  const { mutate: closeRFQ, loading: isClosing } = usePatch<
    ApiResponseDto<RFQDto>,
    Record<string, never>
  >(API_ENDPOINTS.SUPPLY.RFQS.CLOSE(rfqId));

  const { mutate: cancelRFQ, loading: isCancelling } = usePatch<
    ApiResponseDto<RFQDto>,
    Record<string, never>
  >(API_ENDPOINTS.SUPPLY.RFQS.CANCEL(rfqId));

  return {
    publishRFQ,
    closeRFQ,
    cancelRFQ,
    isPublishing,
    isClosing,
    isCancelling,
  };
};
