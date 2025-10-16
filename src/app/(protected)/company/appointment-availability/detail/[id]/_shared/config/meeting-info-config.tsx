import React from "react";
import type { BasicInfoItemConfig } from "../types";
import { formatBoolean } from "../utils/appointment-detail-utils";

/**
 * Toplantı bilgileri konfigürasyonu
 */
export const meetingInfoConfig: BasicInfoItemConfig[] = [
  {
    label: "Lokasyon",
    value: (appointment) => (
      <span className="text-primary">
        <i className="ph ph-map-pin me-2"></i>
        {appointment?.location || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (appointment) => !!appointment?.location,
  },
  {
    label: "Online Toplantı",
    value: (appointment) => (
      <span
        className={`badge ${
          appointment?.isOnline
            ? "bg-success-subtle text-success"
            : "bg-secondary-subtle text-secondary"
        }`}
      >
        <i
          className={`ph ${
            appointment?.isOnline ? "ph-video-camera" : "ph-x"
          } me-1`}
        ></i>
        {formatBoolean(appointment?.isOnline)}
      </span>
    ),
    isShowing: (appointment) => appointment?.isOnline !== undefined,
  },
  {
    label: "Toplantı URL'si",
    value: (appointment) => (
      <a
        href={appointment?.meetingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-decoration-none"
      >
        <i className="ph ph-link me-2"></i>
        Toplantıya Katıl
      </a>
    ),
    isShowing: (appointment) => !!appointment?.meetingUrl,
  },
  {
    label: "Toplantı ID",
    value: (appointment) => (
      <code className="bg-light px-2 py-1 rounded">
        <i className="ph ph-identifier me-2"></i>
        {appointment?.meetingId}
      </code>
    ),
    isShowing: (appointment) => !!appointment?.meetingId,
  },
  {
    label: "Toplantı Şifresi",
    value: (appointment) => (
      <code className="bg-light px-2 py-1 rounded">
        <i className="ph ph-key me-2"></i>
        {appointment?.meetingPassword}
      </code>
    ),
    isShowing: (appointment) => !!appointment?.meetingPassword,
  },
];
