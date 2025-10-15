import React from "react";
import { MessageDto } from "@/types/dto/content/MessageDto";
import type { ConfigItem } from "../types";

/**
 * İzleme ve kaynak bilgileri konfigürasyonu
 */
export const trackingInfoConfig: ConfigItem[] = [
  {
    label: "Kaynak Sayfa",
    value: (message: MessageDto) => (
      <span>
        <i className="ph ph-link me-2 text-primary-600"></i>
        <a
          href={message?.sourcePage}
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-none"
        >
          {message?.sourcePage || "Belirtilmemiş"}
        </a>
      </span>
    ),
    isShowing: (message: MessageDto) => !!message?.sourcePage,
  },
  {
    label: "UTM Source",
    value: (message: MessageDto) => (
      <span className="badge bg-info-subtle text-info fw-semibold">
        <i className="ph ph-chart-line-up me-1"></i>
        {message?.utmSource || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (message: MessageDto) => !!message?.utmSource,
  },
  {
    label: "UTM Medium",
    value: (message: MessageDto) => (
      <span className="badge bg-warning-subtle text-warning fw-semibold">
        <i className="ph ph-megaphone me-1"></i>
        {message?.utmMedium || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (message: MessageDto) => !!message?.utmMedium,
  },
  {
    label: "UTM Campaign",
    value: (message: MessageDto) => (
      <span className="badge bg-success-subtle text-success fw-semibold">
        <i className="ph ph-target me-1"></i>
        {message?.utmCampaign || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (message: MessageDto) => !!message?.utmCampaign,
  },
  {
    label: "Tarayıcı Bilgisi",
    value: (message: MessageDto) => (
      <div className="p-3 bg-neutral-25 rounded-8 border">
        <i className="ph ph-browser me-2 text-neutral-600"></i>
        <div
          className="mt-2 font-monospace small"
          style={{ wordBreak: "break-all" }}
        >
          {message?.userAgent || "Belirtilmemiş"}
        </div>
      </div>
    ),
    isShowing: (message: MessageDto) => !!message?.userAgent,
  },
  {
    label: "Oluşturulma Tarihi",
    value: (message: MessageDto) => (
      <span>
        <i className="ph ph-calendar-plus me-2 text-success-600"></i>
        {message?.createdAt
          ? new Date(message.createdAt).toLocaleString("tr-TR")
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: () => true,
  },
];
