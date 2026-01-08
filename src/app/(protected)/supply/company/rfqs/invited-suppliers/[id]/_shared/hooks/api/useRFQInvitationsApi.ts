"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type { ApiResponseListRFQInvitationDto } from "@/types";

// ================== API HOOKS ==================

/**
 * RFQ'nun davet edilen tedarikçilerini getirir
 *
 * @param rfqId - RFQ ID'si
 * @returns RFQ davetleri listesi
 *
 * API Endpoint: GET /supply/rfqs/{id}/invitations
 */
export const useGetRFQInvitations = (
  rfqId: number,
  options?: { enabled?: boolean }
) => {
  return useGet<ApiResponseListRFQInvitationDto>(
    rfqId ? API_ENDPOINTS.SUPPLY.RFQS.INVITATIONS(rfqId) : null,
    {
      enabled: options?.enabled ?? !!rfqId,
    }
  );
};
