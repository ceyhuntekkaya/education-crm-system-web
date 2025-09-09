import { CAMPAIGN_TYPE_CONFIG } from "../_config";

/**
 * Kampanya tipini Türkçe olarak gösterir
 */
export const getCampaignTypeDisplay = (type: string | undefined): string => {
  return (
    CAMPAIGN_TYPE_CONFIG[type as keyof typeof CAMPAIGN_TYPE_CONFIG] || "Genel"
  );
};
