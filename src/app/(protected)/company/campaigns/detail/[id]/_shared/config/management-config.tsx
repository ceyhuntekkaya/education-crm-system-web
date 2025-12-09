import React from "react";
import type { ManagementItemConfig } from "../types";
import { formatDateTime } from "@/utils/format-date";
import { formatNumber } from "@/utils/format-number";

/**
 * Yönetim bilgileri konfigürasyonu
 */
export const managementConfig: ManagementItemConfig[] = [
  {
    label: "Kalan Süre",
    value: (campaign) => {
      const remaining = campaign?.daysRemaining || 0;
      const isExpired = campaign?.isExpired;

      if (isExpired || remaining <= 0) {
        return (
          <span className="badge bg-danger-subtle text-danger fw-semibold fs-6">
            <i className="ph ph-x-circle me-1"></i>
            Süresi Doldu
          </span>
        );
      }

      const badgeClass =
        remaining <= 3
          ? "bg-danger-subtle text-danger"
          : remaining <= 7
          ? "bg-warning-subtle text-warning"
          : "bg-success-subtle text-success";

      const icon =
        remaining <= 3
          ? "ph-fire"
          : remaining <= 7
          ? "ph-clock"
          : "ph-check-circle";

      return (
        <span className={`badge fw-semibold fs-6 ${badgeClass}`}>
          <i className={`ph ${icon} me-1`}></i>
          {formatNumber(remaining)} gün kaldı
        </span>
      );
    },
    isShowing: (campaign) => campaign?.daysRemaining !== undefined,
  },
  {
    label: "Oluşturan",
    value: (campaign) => (
      <span className="text-secondary-700 fw-medium">
        <i className="ph ph-user me-2 text-primary"></i>
        {campaign?.createdByUserName}
      </span>
    ),
    isShowing: (campaign) => !!campaign?.createdByUserName,
  },
  {
    label: "Oluşturulma Tarihi",
    value: (campaign) => {
      if (!campaign?.createdAt) return null;
      return (
        <span className="text-secondary-600 fw-medium">
          <i className="ph ph-calendar-plus me-2"></i>
          {formatDateTime(campaign.createdAt)}
        </span>
      );
    },
    isShowing: (campaign) => !!campaign?.createdAt,
  },
];
