import { MembershipPlan } from "../types";
import { getMonthlyEquivalent } from "./currency.utils";

/**
 * Plan fiyatını billing period'a göre hesaplar
 */
export const getPlanPrice = (plan: MembershipPlan) => {
  switch (plan.billingPeriod) {
    case "yearly":
      return {
        currentPrice: plan.price.yearly,
        displayPrice: getMonthlyEquivalent(plan.price.yearly),
      };
    case "quarterly":
      return {
        currentPrice: plan.price.quarterly || 0,
        displayPrice: plan.price.quarterly ? plan.price.quarterly / 3 : 0,
      };
    case "monthly":
      return {
        currentPrice: plan.price.monthly,
        displayPrice: plan.price.monthly,
      };
    case "onetime":
      return {
        currentPrice: plan.price.onetime || 0,
        displayPrice: plan.price.onetime || 0,
      };
    default:
      return {
        currentPrice: plan.price.monthly,
        displayPrice: plan.price.monthly,
      };
  }
};

/**
 * Plan türüne göre fiyat etiketini döndürür
 */
export const getPriceLabel = (plan: MembershipPlan): string => {
  switch (plan.billingPeriod) {
    case "yearly":
      return "/Ay (Yıllık)";
    case "quarterly":
      return "/3Ay";
    case "monthly":
      return "/Ay";
    case "onetime":
      return "Tek Seferlik";
    default:
      return "/Ay";
  }
};
