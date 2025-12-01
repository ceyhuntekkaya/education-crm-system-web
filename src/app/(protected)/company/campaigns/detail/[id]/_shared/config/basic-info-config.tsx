import React from "react";
import type { BasicInfoItemConfig } from "../types";
import {
  translateCampaignStatus,
  translateCampaignType,
  formatCampaignPeriod,
  formatBoolean,
} from "../utils";

/**
 * Temel bilgiler konfigürasyonu
 */
export const basicInfoConfig: BasicInfoItemConfig[] = [
  {
    label: "Kampanya Başlığı",
    value: (campaign) => (
      <span className="fw-semibold text-primary-600">
        <i className="ph ph-info me-2"></i>
        {campaign?.title || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (campaign) => !!campaign?.title,
  },
  {
    label: "Kampanya Türü",
    value: (campaign) => (
      <span className="badge bg-info-subtle text-info fw-semibold">
        <i className="ph ph-tag me-1"></i>
        {translateCampaignType(campaign?.campaignType)}
      </span>
    ),
    isShowing: (campaign) => !!campaign?.campaignType,
  },
  {
    label: "Durum",
    value: (campaign) => {
      const status = translateCampaignStatus(campaign?.status);
      const badgeClass = status.className?.includes("success")
        ? "bg-success-subtle text-success"
        : status.className?.includes("warning")
        ? "bg-warning-subtle text-warning"
        : status.className?.includes("danger")
        ? "bg-danger-subtle text-danger"
        : "bg-info-subtle text-info";

      return (
        <span className={`badge fw-semibold ${badgeClass}`}>
          <i className="ph ph-circle me-1"></i>
          {status.text}
        </span>
      );
    },
    isShowing: (campaign) => !!campaign?.status,
  },
  {
    label: "Kampanya Dönemi",
    value: (campaign) => (
      <span className="badge bg-secondary-subtle text-secondary fw-semibold">
        <i className="ph ph-calendar-range me-1"></i>
        {formatCampaignPeriod(campaign?.startDate, campaign?.endDate)}
      </span>
    ),
    isShowing: (campaign) => !!(campaign?.startDate || campaign?.endDate),
  },
  {
    label: "Öne Çıkarılan",
    value: (campaign) => (
      <span
        className={`badge ${
          campaign?.isFeatured
            ? "bg-success-subtle text-success"
            : "bg-secondary-subtle text-secondary"
        } fw-semibold`}
      >
        <i
          className={`ph ${
            campaign?.isFeatured ? "ph-star-fill" : "ph-star"
          } me-1`}
        ></i>
        {formatBoolean(campaign?.isFeatured)}
      </span>
    ),
    isShowing: (campaign) => campaign?.isFeatured !== undefined,
  },
  {
    label: "Herkese Açık",
    value: (campaign) => (
      <span
        className={`badge ${
          campaign?.isPublic
            ? "bg-success-subtle text-success"
            : "bg-warning-subtle text-warning"
        } fw-semibold`}
      >
        <i
          className={`ph ${campaign?.isPublic ? "ph-globe" : "ph-lock"} me-1`}
        ></i>
        {formatBoolean(campaign?.isPublic)}
      </span>
    ),
    isShowing: (campaign) => campaign?.isPublic !== undefined,
  },
  {
    label: "Onay Gereksinimi",
    value: (campaign) => (
      <span
        className={`badge ${
          campaign?.requiresApproval
            ? "bg-warning-subtle text-warning"
            : "bg-success-subtle text-success"
        } fw-semibold`}
      >
        <i
          className={`ph ${
            campaign?.requiresApproval ? "ph-check-circle" : "ph-x-circle"
          } me-1`}
        ></i>
        {formatBoolean(campaign?.requiresApproval)}
      </span>
    ),
    isShowing: (campaign) => campaign?.requiresApproval !== undefined,
  },
];
