"use client";

import { useState, useCallback } from "react";
import { BillingPeriod } from "../types";

export const useMembershipBilling = (
  initialPeriod: BillingPeriod = "monthly"
) => {
  const [billingPeriod, setBillingPeriod] =
    useState<BillingPeriod>(initialPeriod);

  const isYearly = billingPeriod === "yearly";
  const yearlyDiscount = 30; // %30 indirim

  const toggleBillingPeriod = useCallback(() => {
    setBillingPeriod((prev) => (prev === "monthly" ? "yearly" : "monthly"));
  }, []);

  return {
    billingPeriod,
    setBillingPeriod,
    isYearly,
    yearlyDiscount,
    toggleBillingPeriod,
  };
};
