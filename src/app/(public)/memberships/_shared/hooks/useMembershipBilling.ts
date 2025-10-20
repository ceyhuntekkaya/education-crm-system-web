"use client";

import { useState, useCallback } from "react";
import { BillingPeriod } from "../types";

interface UseMembershipBillingReturn {
  billingPeriod: BillingPeriod;
  setBillingPeriod: (period: BillingPeriod) => void;
  isYearly: boolean;
  isQuarterly: boolean;
  isOnetime: boolean;
  yearlyDiscount: number;
  quarterlyDiscount: number;
  toggleBillingPeriod: () => void;
  toggleMainPeriods: () => void;
}

/**
 * Membership billing yönetimi için hook
 */
export const useMembershipBilling = (
  initialPeriod: BillingPeriod = "monthly"
): UseMembershipBillingReturn => {
  const [billingPeriod, setBillingPeriod] =
    useState<BillingPeriod>(initialPeriod);

  // Billing period durumları
  const isYearly = billingPeriod === "yearly";
  const isQuarterly = billingPeriod === "quarterly";
  const isOnetime = billingPeriod === "onetime";

  // İndirim oranları
  const yearlyDiscount = 30;
  const quarterlyDiscount = 15;

  /**
   * Tüm billing period'lar arasında döngüsel geçiş
   */
  const toggleBillingPeriod = useCallback(() => {
    setBillingPeriod((prev) => {
      switch (prev) {
        case "monthly":
          return "quarterly";
        case "quarterly":
          return "yearly";
        case "yearly":
          return "onetime";
        default:
          return "monthly";
      }
    });
  }, []);

  /**
   * Sadece aylık ve yıllık arasında geçiş (eski uyumluluk için)
   */
  const toggleMainPeriods = useCallback(() => {
    setBillingPeriod((prev) => (prev === "monthly" ? "yearly" : "monthly"));
  }, []);

  return {
    billingPeriod,
    setBillingPeriod,
    isYearly,
    isQuarterly,
    isOnetime,
    yearlyDiscount,
    quarterlyDiscount,
    toggleBillingPeriod,
    toggleMainPeriods,
  };
};
