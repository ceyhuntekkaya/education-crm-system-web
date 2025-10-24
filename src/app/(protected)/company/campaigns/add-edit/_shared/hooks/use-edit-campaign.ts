"use client";

import { usePut } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { CampaignUpdateDto, CampaignDto, ApiResponseDto } from "@/types";

interface UseEditCampaignProps {
  campaignId: number;
  refetch?: () => void;
}

/**
 * Campaign güncelleme hook'u
 */
export const useEditCampaign = ({
  campaignId,
  refetch,
}: UseEditCampaignProps) => {
  const {
    mutate: putCampaign,
    loading: isLoading,
    error,
  } = usePut<ApiResponseDto<CampaignDto>, CampaignUpdateDto>(
    () => API_ENDPOINTS.CAMPAIGNS.UPDATE(campaignId),
    {
      onSuccess: (data) => {
        console.log("✅ Campaign başarıyla güncellendi:", data);
        // Refetch varsa çalıştır
        if (refetch) {
          refetch();
        }
      },
      onError: (error) => {
        console.error("❌ Campaign güncellenirken hata:", error);
      },
    }
  );

  return {
    putCampaign,
    isLoading,
    error,
  };
};
