import React from "react";
import type { BasicInfoItemConfig } from "../types";
import {
  translateCancelledByType,
  formatDateTime,
} from "../utils/appointment-detail-utils";
/**
 * İptal ve erteleme bilgileri konfigürasyonu
 */
export const cancellationConfig: BasicInfoItemConfig[] = [
  {
    label: "İptal Edilme Tarihi",
    value: (appointment) => (
      <span className="text-danger">
        <i className="ph ph-x-circle me-2"></i>
        {formatDateTime(appointment?.canceledAt)}
      </span>
    ),
    isShowing: (appointment) => !!appointment?.canceledAt,
  },
  {
    label: "İptal Eden",
    value: (appointment) => (
      <span className="text-danger fw-medium">
        <i className="ph ph-user me-2"></i>
        {appointment?.canceledByUserName || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (appointment) => !!appointment?.canceledByUserName,
  },
  {
    label: "İptal Eden Tip",
    value: (appointment) => (
      <span className="badge bg-danger-subtle text-danger">
        <i className="ph ph-info me-1"></i>
        {translateCancelledByType(appointment?.canceledByType)}
      </span>
    ),
    isShowing: (appointment) => !!appointment?.canceledByType,
  },
  {
    label: "İptal Sebebi",
    value: (appointment) => appointment?.cancellationReason || "Belirtilmemiş",
    isShowing: (appointment) => !!appointment?.cancellationReason,
  },
  {
    label: "Ertelendiği ID",
    value: (appointment) => (
      <code className="bg-light px-2 py-1 rounded">
        #{appointment?.rescheduledFromId}
      </code>
    ),
    isShowing: (appointment) => !!appointment?.rescheduledFromId,
  },
  {
    label: "Ertelendiği Yeni ID",
    value: (appointment) => (
      <code className="bg-light px-2 py-1 rounded">
        #{appointment?.rescheduledToId}
      </code>
    ),
    isShowing: (appointment) => !!appointment?.rescheduledToId,
  },
  {
    label: "Erteleme Sayısı",
    value: (appointment) => (
      <span className="badge bg-warning-subtle text-warning">
        <i className="ph ph-repeat me-1"></i>
        {appointment?.rescheduleCount || 0} kez
      </span>
    ),
    isShowing: (appointment) => appointment?.rescheduleCount !== undefined,
  },
];
