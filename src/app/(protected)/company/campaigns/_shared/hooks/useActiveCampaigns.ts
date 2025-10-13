"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, CampaignSummaryDto } from "@/types";

interface UseActiveCampaignsReturn {
  activeCampaigns: CampaignSummaryDto[];
  campaignsLoading: boolean;
  campaignsError: string | null;
  refetchCampaigns: () => void;
}

/**
 * Aktif kampanya verilerini yöneten hook
 * @returns Aktif kampanya verileri ve yönetim fonksiyonları
 */
export const useActiveCampaigns = (): UseActiveCampaignsReturn => {
  const {
    data: activeCampaignsResponse,
    loading: campaignsLoading,
    error: campaignsError,
    refetch: refetchCampaigns,
  } = useGet<ApiResponseDto<CampaignSummaryDto[]>>(
    API_ENDPOINTS.CAMPAIGNS.ACTIVE
  );

  return {
    activeCampaigns: activeCampaignsResponse?.data || [],
    campaignsLoading,
    campaignsError,
    refetchCampaigns,
  };
};
