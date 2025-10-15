import React from "react";
import type { UsageLimitsItemConfig } from "../types";
import { formatNumber } from "@/utils/format-number";

/**
 * Kullanım limitleri konfigürasyonu
 */
export const usageLimitsConfig: UsageLimitsItemConfig[] = [
  {
    label: "Toplam Kullanım Limiti",
    value: (campaign) =>
      campaign?.usageLimit ? (
        <span className="badge bg-warning-subtle text-warning fw-semibold">
          {formatNumber(campaign.usageLimit)} kişi
        </span>
      ) : (
        <span className="text-muted">Sınırsız</span>
      ),
    isShowing: () => true,
  },
  {
    label: "Şu Ana Kadar Kullanım",
    value: (campaign) => (
      <span className="fw-semibold text-info-600">
        {formatNumber(campaign?.usageCount || 0)} kişi
      </span>
    ),
    isShowing: () => true,
  },
  {
    label: "Kişi Başı Limit",
    value: (campaign) =>
      campaign?.perUserLimit ? (
        <span className="badge bg-info-subtle text-info fw-semibold">
          {formatNumber(campaign.perUserLimit)} kez
        </span>
      ) : (
        <span className="text-muted">Sınırsız</span>
      ),
    isShowing: (campaign) => !!campaign?.perUserLimit,
  },
  {
    label: "Okul Başı Limit",
    value: (campaign) =>
      campaign?.perSchoolLimit ? (
        <span className="badge bg-secondary-subtle text-secondary fw-semibold">
          {formatNumber(campaign.perSchoolLimit)} kişi
        </span>
      ) : (
        <span className="text-muted">Sınırsız</span>
      ),
    isShowing: (campaign) => !!campaign?.perSchoolLimit,
  },
  {
    label: "Kullanım Oranı",
    value: (campaign) => {
      if (!campaign?.usageLimit || !campaign?.usageCount) return null;

      const percentage = (campaign.usageCount / campaign.usageLimit) * 100;
      const colorClass =
        percentage >= 90
          ? "text-danger"
          : percentage >= 70
          ? "text-warning"
          : "text-success";

      return (
        <span className={`fw-semibold ${colorClass}`}>
          %{percentage.toFixed(1)}
        </span>
      );
    },
    isShowing: (campaign) => !!(campaign?.usageLimit && campaign?.usageCount),
  },
];
