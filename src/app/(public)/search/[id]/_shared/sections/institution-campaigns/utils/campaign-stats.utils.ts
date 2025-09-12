import { CampaignDto } from "@/types";

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
