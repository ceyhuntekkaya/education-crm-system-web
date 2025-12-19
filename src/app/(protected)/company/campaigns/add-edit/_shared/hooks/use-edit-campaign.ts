"use client";

import { usePut } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { CampaignUpdateDto, CampaignDto, ApiResponseDto } from "@/types";
import { useCampaigns } from "../../../_shared/context";

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
  // Kampanya listesini yenileme fonksiyonunu context'ten al
  const { refetchCampaigns } = useCampaigns();

  const {
    mutate: putCampaign,
    loading: isLoading,
    error,
  } = usePut<ApiResponseDto<CampaignDto>, CampaignUpdateDto>(
    () => API_ENDPOINTS.CAMPAIGNS.UPDATE(campaignId),
    {
      onSuccess: (data) => {
        // console.log("✅ Campaign başarıyla güncellendi:", data);
        // Kampanya detayını yenile
        if (refetch) {
          refetch();
        }
        // Kampanya listesini yenile
        refetchCampaigns();
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
