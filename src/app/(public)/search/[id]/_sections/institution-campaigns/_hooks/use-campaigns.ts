import { useMemo } from "react";
import { CampaignDto } from "@/types";
import { filterCampaigns, countCampaignsByDiscountType } from "../_utils";

export interface UseCampaignsResult {
  activeCampaigns: CampaignDto[];
  inactiveCampaigns: CampaignDto[];
  stats: {
    total: number;
    active: number;
    percentage: number;
    fixedAmount: number;
    special: number;
  };
}

/**
 * Kampanya verilerini işleyen ve istatistikleri hesaplayan hook
 */
export const useCampaigns = (campaigns: CampaignDto[] = []): UseCampaignsResult => {
  const { active, inactive } = useMemo(() => 
    filterCampaigns(campaigns), [campaigns]
  );

  const stats = useMemo(() => {
    const discountStats = countCampaignsByDiscountType(campaigns);
    return {
      total: campaigns?.length || 0,
      active: active.length,
      percentage: discountStats.percentage,
      fixedAmount: discountStats.fixedAmount,
      special: discountStats.special,
    };
  }, [campaigns, active.length]);

  return {
    activeCampaigns: active,
    inactiveCampaigns: inactive,
    stats,
  };
};
