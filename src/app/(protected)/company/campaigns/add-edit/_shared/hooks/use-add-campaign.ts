"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { CampaignCreateDto, CampaignDto, ApiResponseDto } from "@/types";
import { useRouter } from "next/navigation";
import { useCampaigns } from "../../../_shared";

/**
 * Campaign ekleme hook'u
 */
export const useAddCampaign = () => {
  const router = useRouter();
  const { refetchCampaigns } = useCampaigns();

  const {
    mutate: postCampaign,
    loading: isLoading,
    error,
  } = usePost<ApiResponseDto<CampaignDto>, CampaignCreateDto>(
    API_ENDPOINTS.CAMPAIGNS.CREATE,
    {
      onSuccess: (data) => {
        // console.log("✅ onSuccess alanı -> Campaign başarıyla eklendi:", data);
        // Liste API'sini refetch et
        refetchCampaigns();
        // Kampanyalar sayfasına yönlendir
        router.push("/company/campaigns");
      },
      onError: (error) => {
        // console.log("❌ onError alanı -> Campaign eklenirken hata:", error);
      },
    }
  );

  return {
    postCampaign,
    isLoading,
    error,
  };
};
