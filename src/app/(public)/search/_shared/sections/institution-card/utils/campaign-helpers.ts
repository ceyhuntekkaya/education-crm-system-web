import { SchoolSearchResultDto } from "@/types/dto/institution/InstitutionSearch.types";

/**
 * Kurumun aktif kampanyası olup olmadığını kontrol eder
 */
export const hasActiveCampaign = (
  institution: SchoolSearchResultDto
): boolean => {
  return !!(
    institution.hasActiveCampaigns &&
    Array.isArray(institution.activeCampaigns) &&
    institution.activeCampaigns.length > 0 &&
    institution.activeCampaigns[0]?.badgeText
  );
};

/**
 * Kampanya badge için stil bilgilerini döndürür
 */
export const getCampaignBadgeStyle = (institution: SchoolSearchResultDto) => {
  const campaign = institution.activeCampaigns?.[0];
  if (!campaign) return {};

  return {
    backgroundColor: campaign.badgeColor
      ? `${campaign.badgeColor}15`
      : "#fff5f5",
    borderColor: campaign.badgeColor ?? "#f56565",
    color: campaign.badgeColor ?? "#f56565",
  };
};
