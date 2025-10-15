import React from "react";
import { MessageDto } from "@/types/dto/content/MessageDto";
import type { ConfigItem } from "../types";

/**
 * Yanıt ve çözüm bilgileri konfigürasyonu
 */
export const responseInfoConfig: ConfigItem[] = [
  {
    label: "Okunma Tarihi",
    value: (message: MessageDto) => (
      <span>
        <i className="ph ph-eye me-2 text-info-600"></i>
        {message?.readAt
          ? new Date(message.readAt).toLocaleString("tr-TR")
          : "Okunmamış"}
      </span>
    ),
    isShowing: (message: MessageDto) => !!message?.readAt,
  },
  {
    label: "Okuyan Kişi",
    value: (message: MessageDto) => (
      <span>
        <i className="ph ph-user-check me-2 text-success-600"></i>
        {message?.readBy?.fullName || "Henüz okunmamış"}
      </span>
    ),
    isShowing: (message: MessageDto) => !!message?.readBy,
  },
  {
    label: "İlk Yanıt Tarihi",
    value: (message: MessageDto) => (
      <span>
        <i className="ph ph-arrow-u-up-left me-2 text-primary-600"></i>
        {message?.firstResponseAt
          ? new Date(message.firstResponseAt).toLocaleString("tr-TR")
          : "Yanıt verilmemiş"}
      </span>
    ),
    isShowing: (message: MessageDto) => !!message?.firstResponseAt,
  },
  {
    label: "Son Yanıt Tarihi",
    value: (message: MessageDto) => (
      <span>
        <i className="ph ph-clock-counter-clockwise me-2 text-warning-600"></i>
        {message?.lastResponseAt
          ? new Date(message.lastResponseAt).toLocaleString("tr-TR")
          : "Yanıt verilmemiş"}
      </span>
    ),
    isShowing: (message: MessageDto) => !!message?.lastResponseAt,
  },
  {
    label: "Çözüm Tarihi",
    value: (message: MessageDto) => (
      <span>
        <i className="ph ph-check-circle me-2 text-success-600"></i>
        {message?.resolvedAt
          ? new Date(message.resolvedAt).toLocaleString("tr-TR")
          : "Çözülmemiş"}
      </span>
    ),
    isShowing: (message: MessageDto) => !!message?.resolvedAt,
  },
  {
    label: "Çözen Kişi",
    value: (message: MessageDto) => (
      <span>
        <i className="ph ph-user-circle-check me-2 text-primary-600"></i>
        {message?.resolvedBy?.fullName || "Henüz çözülmemiş"}
      </span>
    ),
    isShowing: (message: MessageDto) => !!message?.resolvedBy,
  },
  {
    label: "Yanıt Süresi",
    value: (message: MessageDto) => (
      <span className="badge bg-info-subtle text-info fw-semibold">
        <i className="ph ph-timer me-1"></i>
        {message?.responseTimeHours
          ? `${message.responseTimeHours.toFixed(1)} saat`
          : "Hesaplanmamış"}
      </span>
    ),
    isShowing: (message: MessageDto) => !!message?.responseTimeHours,
  },
  {
    label: "Çözüm Süresi",
    value: (message: MessageDto) => (
      <span className="badge bg-warning-subtle text-warning fw-semibold">
        <i className="ph ph-hourglass me-1"></i>
        {message?.resolutionTimeHours
          ? `${message.resolutionTimeHours.toFixed(1)} saat`
          : "Hesaplanmamış"}
      </span>
    ),
    isShowing: (message: MessageDto) => !!message?.resolutionTimeHours,
  },
];
