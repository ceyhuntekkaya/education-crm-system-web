"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { CampaignDto, ApiResponseDto } from "@/types";

interface UseCampaignByIdReturn {
  campaign: CampaignDto | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * ID'ye göre tek bir campaign verisi getiren hook
 * @param id - Campaign ID'si
 * @returns Campaign verileri ve yönetim fonksiyonları
 */
export const useCampaignById = (id: number | null): UseCampaignByIdReturn => {
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
