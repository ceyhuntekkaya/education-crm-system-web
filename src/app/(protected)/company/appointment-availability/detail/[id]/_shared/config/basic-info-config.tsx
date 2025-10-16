import React from "react";
import type { BasicInfoItemConfig } from "../types";
import {
  translateAppointmentStatus,
  translateAppointmentType,
  translateAppointmentOutcome,
  translateCancelledByType,
  formatDateTime,
  formatBoolean,
} from "../utils/appointment-detail-utils";

/**
 * Temel bilgiler konfigürasyonu
 */
export const basicInfoConfig: BasicInfoItemConfig[] = [
  {
    label: "Randevu Numarası",
    value: (appointment) => (
      <span className="fw-semibold text-primary-600">
        <i className="ph ph-hash me-2"></i>
        {appointment?.appointmentNumber || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (appointment) => !!appointment?.appointmentNumber,
  },
  {
    label: "Randevu Türü",
    value: (appointment) => (
      <span className="badge bg-info-subtle text-info fw-semibold">
        <i className="ph ph-calendar-check me-1"></i>
        {translateAppointmentType(appointment?.appointmentType)}
      </span>
    ),
    isShowing: (appointment) => !!appointment?.appointmentType,
  },
  {
    label: "Durum",
    value: (appointment) => {
      const status = translateAppointmentStatus(appointment?.status);
      // Badge sınıfına göre renk seçimi
      const badgeClass = status.badgeClass?.includes("success")
        ? "bg-success-subtle text-success"
        : status.badgeClass?.includes("warning")
        ? "bg-warning-subtle text-warning"
        : status.badgeClass?.includes("danger")
        ? "bg-danger-subtle text-danger"
        : "bg-info-subtle text-info";

      return (
        <span className={`badge fw-semibold ${badgeClass}`}>
          <i className="ph ph-circle me-1"></i>
          {status.text}
        </span>
      );
    },
    isShowing: (appointment) => !!appointment?.status,
  },
  {
    label: "Başlık",
    value: (appointment) => appointment?.title || "Belirtilmemiş",
    isShowing: (appointment) => !!appointment?.title,
  },
  {
    label: "Açıklama",
    value: (appointment) => appointment?.description || "Belirtilmemiş",
    isShowing: (appointment) => !!appointment?.description,
  },
  {
    label: "Okul",
    value: (appointment) => (
      <span className="text-primary fw-medium">
        <i className="ph ph-buildings me-2"></i>
        {appointment?.schoolName || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (appointment) => !!appointment?.schoolName,
  },
  {
    label: "Kampüs",
    value: (appointment) => appointment?.campusName || "Belirtilmemiş",
    isShowing: (appointment) => !!appointment?.campusName,
  },
  {
    label: "Konum",
    value: (appointment) => (
      <span className="text-muted">
        <i className="ph ph-map-pin me-2"></i>
        {appointment?.location || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (appointment) => !!appointment?.location,
  },
  {
    label: "Toplantı Türü",
    value: (appointment) => (
      <span
        className={`badge ${
          appointment?.isOnline
            ? "bg-primary-subtle text-primary"
            : "bg-secondary-subtle text-secondary"
        } fw-medium`}
      >
        <i
          className={`ph ${
            appointment?.isOnline ? "ph-video-camera" : "ph-user"
          } me-1`}
        ></i>
        {appointment?.isOnline ? "Online Toplantı" : "Yüz Yüze Toplantı"}
      </span>
    ),
    isShowing: () => true,
  },
];
