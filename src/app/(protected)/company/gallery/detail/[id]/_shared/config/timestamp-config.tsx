import React from "react";
import type { TimestampItemConfig } from "../types";

/**
 * Zaman damgaları konfigürasyonu
 */
export const timestampConfig: TimestampItemConfig[] = [
  {
    label: "Oluşturma Tarihi",
    value: (gallery) => (
      <span className="text-dark">
        <i className="ph ph-calendar-plus me-4"></i>
        {gallery?.createdAt
          ? new Date(gallery.createdAt).toLocaleDateString("tr-TR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })
          : "Tarih belirtilmemiş"}
      </span>
    ),
    isShowing: (gallery) => gallery?.createdAt !== undefined,
  },
  {
    label: "Oluşturma Saati",
    value: (gallery) => (
      <span className="text-dark">
        <i className="ph ph-clock me-4"></i>
        {gallery?.createdAt
          ? new Date(gallery.createdAt).toLocaleTimeString("tr-TR", {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "Saat belirtilmemiş"}
      </span>
    ),
    isShowing: (gallery) => gallery?.createdAt !== undefined,
  },
  {
    label: "Göreli Zaman",
    value: (gallery) => (
      <span className="text-dark">
        <i className="ph ph-calendar me-4"></i>
        {gallery?.createdAt
          ? new Intl.RelativeTimeFormat("tr", { numeric: "auto" }).format(
              Math.ceil(
                (new Date(gallery.createdAt).getTime() - Date.now()) /
                  (1000 * 60 * 60 * 24)
              ),
              "day"
            )
          : "Bilinmiyor"}
      </span>
    ),
    isShowing: (gallery) => gallery?.createdAt !== undefined,
  },
];
