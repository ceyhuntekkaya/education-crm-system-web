import React from "react";
import type { BasicInfoItemConfig } from "../types";
import {
  translateAppointmentOutcome,
  translateCancelledByType,
  formatDateTime,
  formatBoolean,
} from "../utils/appointment-detail-utils";

/**
 * Sonuç ve takip bilgileri konfigürasyonu
 */
export const outcomeConfig: BasicInfoItemConfig[] = [
  {
    label: "Sonuç",
    value: (appointment) => {
      const outcome = translateAppointmentOutcome(appointment?.outcome);
      const badgeClass =
        appointment?.outcome === "ENROLLED"
          ? "bg-success-subtle text-success"
          : appointment?.outcome === "INTERESTED"
          ? "bg-info-subtle text-info"
          : appointment?.outcome === "NOT_INTERESTED"
          ? "bg-danger-subtle text-danger"
          : "bg-warning-subtle text-warning";

      return (
        <span className={`badge fw-semibold ${badgeClass}`}>
          <i className="ph ph-target me-1"></i>
          {outcome}
        </span>
      );
    },
    isShowing: (appointment) => !!appointment?.outcome,
  },
  {
    label: "Sonuç Notları",
    value: (appointment) => appointment?.outcomeNotes || "Belirtilmemiş",
    isShowing: (appointment) => !!appointment?.outcomeNotes,
  },
  {
    label: "Kayıt Olasılığı",
    value: (appointment) => (
      <div className="d-flex align-items-center">
        <div
          className="progress me-2"
          style={{ width: "100px", height: "8px" }}
        >
          <div
            className="progress-bar bg-success"
            style={{ width: `${appointment?.enrollmentLikelihood || 0}%` }}
          ></div>
        </div>
        <span className="fw-medium">
          {appointment?.enrollmentLikelihood || 0}%
        </span>
      </div>
    ),
    isShowing: (appointment) => appointment?.enrollmentLikelihood !== undefined,
  },
  {
    label: "Sonraki Adımlar",
    value: (appointment) => appointment?.nextSteps || "Belirtilmemiş",
    isShowing: (appointment) => !!appointment?.nextSteps,
  },
  {
    label: "Takip Gerekli",
    value: (appointment) => (
      <span
        className={`badge ${
          appointment?.followUpRequired
            ? "bg-warning-subtle text-warning"
            : "bg-success-subtle text-success"
        }`}
      >
        <i
          className={`ph ${
            appointment?.followUpRequired ? "ph-phone" : "ph-check"
          } me-1`}
        ></i>
        {formatBoolean(appointment?.followUpRequired)}
      </span>
    ),
    isShowing: (appointment) => appointment?.followUpRequired !== undefined,
  },
  {
    label: "Takip Tarihi",
    value: (appointment) => appointment?.followUpDate || "Belirtilmemiş",
    isShowing: (appointment) => !!appointment?.followUpDate,
  },
  {
    label: "Anket Gönderildi",
    value: (appointment) => formatDateTime(appointment?.surveySentAt),
    isShowing: (appointment) => !!appointment?.surveySentAt,
  },
  {
    label: "Anket Tamamlandı",
    value: (appointment) => formatDateTime(appointment?.surveyCompletedAt),
    isShowing: (appointment) => !!appointment?.surveyCompletedAt,
  },
];
