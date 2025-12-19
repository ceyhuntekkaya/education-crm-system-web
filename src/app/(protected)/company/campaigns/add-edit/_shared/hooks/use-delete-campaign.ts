"use client";

import { useDelete } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto } from "@/types";

/**
 * Campaign silme hook'u
 */
export const useDeleteCampaign = () => {
  const {
    mutate: deleteCampaign,
    loading: isLoading,
    error,
  } = useDelete<ApiResponseDto<void>>(
    (variables: unknown) => {
      const id = variables as number;
      return API_ENDPOINTS.CAMPAIGNS.DELETE(id);
    },
    {
      onSuccess: () => {
        // console.log("✅ Campaign başarıyla silindi");
      },
      onError: (error) => {
        console.error("❌ Campaign silinirken hata:", error);
      },
    }
  );

  return {
    deleteCampaign,
    isLoading,
    error,
  };
};
