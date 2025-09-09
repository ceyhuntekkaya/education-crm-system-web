import { CampaignDto } from "@/types";
import { CAMPAIGN_TYPE_CONFIG } from "./campaign-configs";

/**
 * Kampanya tipini Türkçe olarak gösterir
 */
export const getCampaignTypeDisplay = (type: string | undefined): string => {
  return (
    CAMPAIGN_TYPE_CONFIG[type as keyof typeof CAMPAIGN_TYPE_CONFIG] || "Genel"
  );
};

/**
 * Tarih string'ini Türkçe format'a çevirir
 */
export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
};

/**
 * Kampanya bitiş tarihine kalan gün sayısını hesaplar
 */
export const calculateDaysRemaining = (endDate: string | undefined): string => {
  if (!endDate) return "Süresiz";

  try {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return "Süresi Dolmuş";
    if (diffDays === 1) return "Son 1 gün";
    if (diffDays <= 7) return `${diffDays} gün kaldı`;
    return `${diffDays} gün kaldı`;
  } catch {
    return "Süresiz";
  }
};

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

/**
 * İndirim tipine göre kampanyaları sayar
 */
export const countCampaignsByDiscountType = (campaigns: CampaignDto[] = []) => {
  if (!campaigns || !Array.isArray(campaigns)) {
    return {
      percentage: 0,
      fixedAmount: 0,
      special: 0,
    };
  }

  return {
    percentage: campaigns.filter((c) => c.discountType === "PERCENTAGE").length,
    fixedAmount: campaigns.filter((c) => c.discountType === "FIXED_AMOUNT")
      .length,
    special: campaigns.filter(
      (c) =>
        c.discountType === "NO_DISCOUNT" ||
        c.discountType === "FREE_MONTHS" ||
        c.discountType === "BUY_X_GET_Y" ||
        c.discountType === "TIERED" ||
        c.discountType === "BUNDLE"
    ).length,
  };
};
