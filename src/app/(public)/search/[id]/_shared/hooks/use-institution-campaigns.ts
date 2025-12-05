"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, CampaignDto } from "@/types";

interface UseInstitutionCampaignsProps {
  schoolId: string | number | null;
}

interface UseInstitutionCampaignsReturn {
  campaigns: CampaignDto[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Seçili Kurum için kampanya verilerini yöneten hook
 * @param schoolId - Kurum ID'si
 * @returns Kampanya verileri ve yönetim fonksiyonları
 */
export const useInstitutionCampaigns = ({
  schoolId,
}: UseInstitutionCampaignsProps): UseInstitutionCampaignsReturn => {
  const {
    data: campaignsResponse,
    loading,
    error,
    refetch,
  } = useGet<ApiResponseDto<CampaignDto[]>>(
    schoolId ? API_ENDPOINTS.CAMPAIGNS.BY_SCHOOL(schoolId) : null
  );

  return {
    campaigns: campaignsResponse?.data || [],
    loading,
    error,
    refetch,
  };
};
