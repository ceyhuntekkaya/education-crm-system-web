"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, CampaignDto } from "@/types";

interface UseCampaignByIdReturn {
  campaign: CampaignDto | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * ID'ye göre tek bir campaign verisi getiren hook
 * @param id - Campaign ID'si
 * @returns Campaign verisi ve yönetim fonksiyonları
 */
export const useCampaignById = (id: number): UseCampaignByIdReturn => {
  const {
    data: campaignResponse,
    loading: isLoading,
    error,
    refetch,
  } = useGet<ApiResponseDto<CampaignDto>>(
    id ? API_ENDPOINTS.CAMPAIGNS.BY_ID(id) : null
  );

  return {
    campaign: campaignResponse?.data || null,
    isLoading,
    error,
    refetch,
  };
};
