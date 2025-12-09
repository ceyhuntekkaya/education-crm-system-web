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
      <span className="fw-bold text-primary-600 fs-5">
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
    label: "Kampanya Dönemi",
    value: (campaign) => (
      <span className="fw-medium text-secondary-700">
        <i className="ph ph-calendar-range me-4 text-secondary"></i>
        {formatCampaignPeriod(campaign?.startDate, campaign?.endDate)}
      </span>
    ),
    isShowing: (campaign) => !!(campaign?.startDate || campaign?.endDate),
  },
  {
    label: "Öne Çıkan",
    value: (campaign) => (
      <span className="fw-medium">
        {campaign?.isFeatured ? (
          <>
            <i className="ph-fill ph-star me-4 text-warning fs-5"></i>
            <span className="text-warning-700">Evet, öne çıkarılmış</span>
          </>
        ) : (
          <>
            <i className="ph ph-star me-4 text-neutral-400"></i>
            <span className="text-neutral-600">Hayır</span>
          </>
        )}
      </span>
    ),
    isShowing: (campaign) => campaign?.isFeatured !== undefined,
  },
  {
    label: "Herkese Açık",
    value: (campaign) => (
      <span className="fw-medium">
        {campaign?.isPublic ? (
          <>
            <i className="ph ph-globe me-4 text-success"></i>
            <span className="text-success-700">Evet, herkes görebilir</span>
          </>
        ) : (
          <>
            <i className="ph ph-lock me-4 text-neutral-500"></i>
            <span className="text-neutral-600">Hayır, gizli</span>
          </>
        )}
      </span>
    ),
    isShowing: (campaign) => campaign?.isPublic !== undefined,
  },
  {
    label: "Onay Gereksinimi",
    value: (campaign) => (
      <span className="fw-medium">
        {campaign?.requiresApproval ? (
          <>
            <i className="ph ph-seal-check me-4 text-warning"></i>
            <span className="text-warning-700">Evet, onay gerekli</span>
          </>
        ) : (
          <>
            <i className="ph ph-check-circle me-4 text-success"></i>
            <span className="text-success-700">Hayır, doğrudan aktif</span>
          </>
        )}
      </span>
    ),
    isShowing: (campaign) => campaign?.requiresApproval !== undefined,
  },
];
