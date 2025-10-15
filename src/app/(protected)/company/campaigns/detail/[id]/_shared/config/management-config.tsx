import React from "react";
import type { ManagementItemConfig } from "../types";
import { formatDateTime } from "@/utils/format-date";
import { formatNumber } from "@/utils/format-number";

/**
 * Yönetim bilgileri konfigürasyonu
 */
export const managementConfig: ManagementItemConfig[] = [
  {
    label: "Oluşturan Kullanıcı",
    value: (campaign) => (
      <span className="text-primary-600 fw-semibold">
        {campaign?.createdByUserName}
      </span>
    ),
    isShowing: (campaign) => !!campaign?.createdByUserName,
  },
  {
    label: "Onaylayan Kullanıcı",
    value: (campaign) => (
      <span className="text-success-600 fw-semibold">
        {campaign?.approvedByUserName}
      </span>
    ),
    isShowing: (campaign) => !!campaign?.approvedByUserName,
  },
  {
    label: "Oluşturma Tarihi",
    value: (campaign) => {
      if (!campaign?.createdAt) return null;
      return (
        <span className="text-secondary-600">
          <i className="ph ph-calendar-plus me-2"></i>
          {formatDateTime(campaign.createdAt)}
        </span>
      );
    },
    isShowing: (campaign) => !!campaign?.createdAt,
  },
  {
    label: "Onay Tarihi",
    value: (campaign) => {
      if (!campaign?.approvedAt) return null;
      return (
        <span className="text-success-600">
          <i className="ph ph-check-circle me-2"></i>
          {formatDateTime(campaign.approvedAt)}
        </span>
      );
    },
    isShowing: (campaign) => !!campaign?.approvedAt,
  },
  {
    label: "Son Güncelleme",
    value: (campaign) => {
      if (!campaign?.updatedAt) return null;
      const date = new Date(campaign.updatedAt);
      return (
        <span className="text-warning-600">
          <i className="ph ph-clock-clockwise me-2"></i>
          {formatDateTime(campaign.updatedAt)}
        </span>
      );
    },
    isShowing: (campaign) => !!campaign?.updatedAt,
  },
  {
    label: "Kalan Gün Sayısı",
    value: (campaign) => {
      const remaining = campaign?.daysRemaining || 0;
      const colorClass =
        remaining <= 0
          ? "text-danger"
          : remaining <= 7
          ? "text-warning"
          : "text-success";

      return (
        <span className={`fw-semibold ${colorClass}`}>
          <i className="ph ph-timer me-2"></i>
          {remaining > 0
            ? `${formatNumber(remaining)} gün kaldı`
            : "Süresi doldu"}
        </span>
      );
    },
    isShowing: (campaign) => campaign?.daysRemaining !== undefined,
  },
  {
    label: "Kampanya Durumu",
    value: (campaign) => (
      <div className="d-flex gap-2 flex-wrap">
        {campaign?.isActive && (
          <span className="badge bg-success-subtle text-success">Aktif</span>
        )}
        {campaign?.isExpired && (
          <span className="badge bg-danger-subtle text-danger">
            Süresi Doldu
          </span>
        )}
        {!campaign?.isActive && !campaign?.isExpired && (
          <span className="badge bg-secondary-subtle text-secondary">
            Pasif
          </span>
        )}
      </div>
    ),
    isShowing: (campaign) =>
      campaign?.isActive !== undefined || campaign?.isExpired !== undefined,
  },
];
