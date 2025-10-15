import React from "react";
import type { BasicInfoItemConfig } from "../types";
import {
  translateCampaignStatus,
  translateCampaignType,
  formatCampaignPeriod,
  formatBoolean,
} from "../utils";
import { formatNumber } from "@/utils/format-number";

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
      // Badge sınıfına göre renk seçimi
      const badgeClass = status.className?.includes('success') ? 'bg-success-subtle text-success' :
                        status.className?.includes('warning') ? 'bg-warning-subtle text-warning' :
                        status.className?.includes('danger') ? 'bg-danger-subtle text-danger' :
                        'bg-info-subtle text-info';
      
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
    label: "Akademik Yıl",
    value: (campaign) => (
      <span className="badge bg-warning-subtle text-warning fw-semibold">
        <i className="ph ph-graduation-cap me-1"></i>
        {campaign?.academicYear || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (campaign) => !!campaign?.academicYear,
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
  {
    label: "Kampanya Slug",
    value: (campaign) => (
      <span className="badge bg-primary-subtle text-primary fw-semibold font-monospace">
        <i className="ph ph-link-simple me-1"></i>
        {campaign?.slug || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (campaign) => !!campaign?.slug,
  },
  {
    label: "Kısa Açıklama",
    value: (campaign) => (
      <p className="mb-0 text-neutral-700">
        {campaign?.shortDescription || "Kısa açıklama girilmemiş"}
      </p>
    ),
    isShowing: (campaign) => !!campaign?.shortDescription,
  },
  {
    label: "Öncelik",
    value: (campaign) => (
      <span
        className={`badge ${
          campaign?.priority === 1
            ? "bg-danger-subtle text-danger"
            : campaign?.priority <= 3
            ? "bg-warning-subtle text-warning"
            : "bg-success-subtle text-success"
        } fw-semibold`}
      >
        <i className="ph ph-flag me-1"></i>
        Öncelik {campaign?.priority}
      </span>
    ),
    isShowing: (campaign) => !!campaign?.priority,
  },
  {
    label: "Sıralama",
    value: (campaign) => (
      <span className="badge bg-secondary-subtle text-secondary fw-semibold">
        <i className="ph ph-sort-ascending me-1"></i>
        Sıra: {campaign?.sortOrder}
      </span>
    ),
    isShowing: (campaign) => !!campaign?.sortOrder,
  },
  {
    label: "Aktif Durumu",
    value: (campaign) => (
      <span
        className={`badge ${
          campaign?.isActive
            ? "bg-success-subtle text-success"
            : "bg-secondary-subtle text-secondary"
        } fw-semibold`}
      >
        <i
          className={`ph ${
            campaign?.isActive ? "ph-play-circle" : "ph-pause-circle"
          } me-1`}
        ></i>
        {campaign?.isActive ? "Aktif" : "Pasif"}
      </span>
    ),
    isShowing: (campaign) => campaign?.isActive !== undefined,
  },
  {
    label: "Süre Durumu",
    value: (campaign) => (
      <div className="d-flex flex-wrap gap-2 align-items-center">
        <span
          className={`badge ${
            campaign?.isExpired
              ? "bg-danger-subtle text-danger"
              : "bg-success-subtle text-success"
          } fw-semibold`}
        >
          <i
            className={`ph ${
              campaign?.isExpired ? "ph-clock-countdown" : "ph-check-circle"
            } me-1`}
          ></i>
          {campaign?.isExpired ? "Süresi Dolmuş" : "Süresi Aktif"}
        </span>
        {campaign?.daysRemaining !== undefined && (
          <span className="badge bg-info-subtle text-info fw-semibold">
            <i className="ph ph-calendar me-1"></i>
            {campaign.daysRemaining > 0
              ? `${campaign.daysRemaining} gün kaldı`
              : "Süre dolmuş"}
          </span>
        )}
      </div>
    ),
    isShowing: (campaign) =>
      campaign?.isExpired !== undefined ||
      campaign?.daysRemaining !== undefined,
  },
];
