import { useMemo } from "react";
import { CampaignDto } from "@/types";
import { filterCampaigns } from "../_utils";

export interface UseCampaignsResult {
  activeCampaigns: CampaignDto[];
  inactiveCampaigns: CampaignDto[];
}

/**
 * Kampanya verilerini işleyen ve istatistikleri hesaplayan hook
 */
export const useCampaigns = (
  campaigns: CampaignDto[] = []
): UseCampaignsResult => {
  const { active, inactive } = useMemo(
    () => filterCampaigns(campaigns),
    [campaigns]
  );

  return {
    activeCampaigns: active,
    inactiveCampaigns: inactive,
  };
};
