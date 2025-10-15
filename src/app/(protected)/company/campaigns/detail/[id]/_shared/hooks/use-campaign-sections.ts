import { useMemo } from "react";
import { createSections } from "../utils";
import { CAMPAIGN_SECTIONS } from "../config";

/**
 * Campaign sections hook'u
 * Tüm section işleme mantığını kapsüller
 */
export const useCampaignSections = (campaign: any) => {
  return useMemo(() => {
    // Campaign null ise boş array döndür
    if (!campaign) return [];

    // Ana section'ları oluştur
    const campaignSections = createSections(CAMPAIGN_SECTIONS, campaign);

    return campaignSections;
  }, [campaign]);
};
