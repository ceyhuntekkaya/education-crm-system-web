import React from "react";
import type { BasicInfoItemConfig } from "../types";
import { formatDateTime } from "../utils/appointment-detail-utils";

/**
 * Tarih ve saat bilgileri konfigürasyonu
 */
export const dateTimeConfig: BasicInfoItemConfig[] = [
  {
    label: "Randevu Tarihi",
    value: (appointment) => (
      <span className="fw-medium">
        <i className="ph ph-calendar me-2"></i>
        {appointment?.appointmentDate || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (appointment) => !!appointment?.appointmentDate,
  },
  {
    label: "Başlangıç Saati",
    value: (appointment) => (
      <span className="text-success fw-medium">
        <i className="ph ph-clock me-2"></i>
        {appointment?.startTime || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (appointment) => !!appointment?.startTime,
  },
  {
    label: "Bitiş Saati",
    value: (appointment) => (
      <span className="text-danger fw-medium">
        <i className="ph ph-clock me-2"></i>
        {appointment?.endTime || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (appointment) => !!appointment?.endTime,
  },
  {
    label: "Süre",
    value: (appointment) => (
      <span className="badge bg-primary-subtle text-primary">
        <i className="ph ph-timer me-1"></i>
        {appointment?.durationMinutes
          ? `${appointment.durationMinutes} dakika`
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (appointment) => !!appointment?.durationMinutes,
  },
  {
    label: "Gerçek Başlangıç",
    value: (appointment) => (
      <span className="text-success">
        <i className="ph ph-play me-2"></i>
        {formatDateTime(appointment?.actualStartTime)}
      </span>
    ),
    isShowing: (appointment) => !!appointment?.actualStartTime,
  },
  {
    label: "Gerçek Bitiş",
    value: (appointment) => (
      <span className="text-danger">
        <i className="ph ph-stop me-2"></i>
        {formatDateTime(appointment?.actualEndTime)}
      </span>
    ),
    isShowing: (appointment) => !!appointment?.actualEndTime,
  },
  {
    label: "Onaylanma Tarihi",
    value: (appointment) => (
      <span className="text-success">
        <i className="ph ph-check-circle me-2"></i>
        {formatDateTime(appointment?.confirmedAt)}
        {appointment?.confirmedByUserName && (
          <small className="text-muted ms-2">
            ({appointment.confirmedByUserName})
          </small>
        )}
      </span>
    ),
    isShowing: (appointment) => !!appointment?.confirmedAt,
  },
  {
    label: "Hatırlatma Gönderilme",
    value: (appointment) => (
      <span className="text-info">
        <i className="ph ph-bell me-2"></i>
        {formatDateTime(appointment?.reminderSentAt)}
      </span>
    ),
    isShowing: (appointment) => !!appointment?.reminderSentAt,
  },
  {
    label: "Takip Tarihi",
    value: (appointment) => (
      <span className="text-warning">
        <i className="ph ph-calendar-plus me-2"></i>
        {appointment?.followUpDate || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (appointment) =>
      !!appointment?.followUpDate && !!appointment?.followUpRequired,
  },
  {
    label: "Anket Gönderilme",
    value: (appointment) => (
      <span className="text-primary">
        <i className="ph ph-clipboard me-2"></i>
        {formatDateTime(appointment?.surveySentAt)}
      </span>
    ),
    isShowing: (appointment) => !!appointment?.surveySentAt,
  },
  {
    label: "Anket Tamamlanma",
    value: (appointment) => (
      <span className="text-success">
        <i className="ph ph-check-square me-2"></i>
        {formatDateTime(appointment?.surveyCompletedAt)}
      </span>
    ),
    isShowing: (appointment) => !!appointment?.surveyCompletedAt,
  },
  {
    label: "Oluşturulma Tarihi",
    value: (appointment) => formatDateTime(appointment?.createdAt),
    isShowing: (appointment) => !!appointment?.createdAt,
  },
  {
    label: "Güncellenme Tarihi",
    value: (appointment) => formatDateTime(appointment?.updatedAt),
    isShowing: (appointment) => !!appointment?.updatedAt,
  },
];
