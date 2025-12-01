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
        className={`badge fw-semibold ${
          isDatePast(campaign?.startDate)
            ? "bg-secondary-subtle text-secondary"
            : "bg-success-subtle text-success"
        }`}
      >
        <i className="ph ph-calendar-blank me-1"></i>
        {formatDate(campaign?.startDate)}
      </span>
    ),
    isShowing: (campaign) => !!campaign?.startDate,
  },
  {
    label: "Bitiş Tarihi",
    value: (campaign) => (
      <span
        className={`badge fw-semibold ${
          isDatePast(campaign?.endDate)
            ? "bg-danger-subtle text-danger"
            : "bg-warning-subtle text-warning"
        }`}
      >
        <i className="ph ph-calendar-x me-1"></i>
        {formatDate(campaign?.endDate)}
      </span>
    ),
    isShowing: (campaign) => !!campaign?.endDate,
  },
];
