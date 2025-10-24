"use client";

import { useMemo } from "react";
import { CampaignType, DiscountType, TargetAudience } from "@/enums";
import {
  CAMPAIGN_TYPE_LABELS,
  DISCOUNT_TYPE_LABELS,
  TARGET_AUDIENCE_LABELS,
} from "../utils/enum-translations";

/**
 * Form select options'larını döndüren hook
 */
export const useCampaignFormOptions = () => {
  // Campaign Type Options
  const campaignTypeOptions = useMemo(
    () =>
      Object.entries(CampaignType).map(([key, value]) => ({
        label: CAMPAIGN_TYPE_LABELS[value as CampaignType],
        value: value,
      })),
    []
  );

  // Discount Type Options
  const discountTypeOptions = useMemo(
    () =>
      Object.entries(DiscountType).map(([key, value]) => ({
        label: DISCOUNT_TYPE_LABELS[value as DiscountType],
        value: value,
      })),
    []
  );

  // Target Audience Options
  const targetAudienceOptions = useMemo(
    () =>
      Object.entries(TargetAudience).map(([key, value]) => ({
        label: TARGET_AUDIENCE_LABELS[value as TargetAudience],
        value: value,
      })),
    []
  );

  return {
    campaignTypeOptions,
    discountTypeOptions,
    targetAudienceOptions,
  };
};
