import { CampaignDto } from "@/types";

/**
 * Kampanyaları aktif/pasif olarak filtreler
 */
export const filterCampaigns = (campaigns: CampaignDto[] = []) => {
  if (!campaigns || !Array.isArray(campaigns)) {
    return {
      active: [],
      inactive: [],
    };
  }

  return {
    active: campaigns.filter((campaign) => campaign.isActive),
    inactive: campaigns.filter((campaign) => !campaign.isActive),
  };
};
