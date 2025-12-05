"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, CampaignDto } from "@/types";

interface UseSchoolCampaignsReturn {
  schoolCampaigns: CampaignDto[];
  campaignsLoading: boolean;
  campaignsError: string | null;
  refetchCampaigns: () => void;
}

/**
 * Seçili Kurum için kampanya verilerini yöneten hook
 * @param schoolId - Kurum ID'si
 * @returns Kampanya verileri ve yönetim fonksiyonları
 */
export const useSchoolCampaigns = (
  schoolId: number | null
): UseSchoolCampaignsReturn => {
  const {
    data: schoolCampaignResponse,
    loading: campaignsLoading,
    error: campaignsError,
    refetch: refetchCampaigns,
  } = useGet<ApiResponseDto<CampaignDto[]>>(
    schoolId ? API_ENDPOINTS.CAMPAIGNS.BY_SCHOOL(schoolId) : null
  );

  return {
    schoolCampaigns: schoolCampaignResponse?.data
      ? schoolCampaignResponse.data
      : [],
    campaignsLoading,
    campaignsError,
    refetchCampaigns,
  };
};
