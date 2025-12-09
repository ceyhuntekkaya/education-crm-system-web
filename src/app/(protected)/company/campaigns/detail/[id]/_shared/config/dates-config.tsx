import React from "react";
import type { DatesItemConfig } from "../types";
import {
  formatDate as utilFormatDate,
  formatDateTime as utilFormatDateTime,
} from "@/utils/format-date";

const formatDate = (dateString?: string): string => {
  if (!dateString) return "Belirtilmemiş";
  return utilFormatDateTime(dateString, "tr-TR");
};

const isDatePast = (dateString?: string): boolean => {
  if (!dateString) return false;
  return new Date(dateString) < new Date();
};

/**
 * Tarih bilgileri konfigürasyonu
 */
export const datesConfig: DatesItemConfig[] = [
  {
    label: "Başlangıç Tarihi",
    value: (campaign) => (
      <span
        className={`fw-medium ${
          isDatePast(campaign?.startDate)
            ? "text-neutral-600"
            : "text-success-700"
        }`}
      >
        <i className="ph ph-calendar-blank me-2"></i>
        {formatDate(campaign?.startDate)}
      </span>
    ),
    isShowing: (campaign) => !!campaign?.startDate,
  },
  {
    label: "Bitiş Tarihi",
    value: (campaign) => (
      <span
        className={`fw-medium ${
          isDatePast(campaign?.endDate) ? "text-danger-600" : "text-warning-700"
        }`}
      >
        <i className="ph ph-calendar-x me-2"></i>
        {formatDate(campaign?.endDate)}
      </span>
    ),
    isShowing: (campaign) => !!campaign?.endDate,
  },
];
