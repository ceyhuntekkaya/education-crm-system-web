import React from "react";
import { MessageDto } from "@/types/dto/content/MessageDto";
import type { ConfigItem } from "../types";
import { translateContactMethod } from "../utils";

/**
 * Gönderen bilgileri konfigürasyonu
 */
export const senderInfoConfig: ConfigItem[] = [
  {
    label: "Ad Soyad",
    value: (message: MessageDto) => (
      <span className="fw-medium">
        <i className="ph ph-user me-2 text-primary-600"></i>
        {message?.senderName || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (message: MessageDto) => !!message?.senderName,
  },
  {
    label: "E-posta",
    value: (message: MessageDto) => (
      <span>
        <i className="ph ph-envelope me-2 text-info-600"></i>
        <a
          href={`mailto:${message?.senderEmail}`}
          className="text-decoration-none"
        >
          {message?.senderEmail || "Belirtilmemiş"}
        </a>
      </span>
    ),
    isShowing: (message: MessageDto) => !!message?.senderEmail,
  },
  {
    label: "Telefon",
    value: (message: MessageDto) => (
      <span>
        <i className="ph ph-phone me-2 text-success-600"></i>
        <a
          href={`tel:${message?.senderPhone}`}
          className="text-decoration-none"
        >
          {message?.senderPhone || "Belirtilmemiş"}
        </a>
      </span>
    ),
    isShowing: (message: MessageDto) => !!message?.senderPhone,
  },
  {
    label: "IP Adresi",
    value: (message: MessageDto) => (
      <span className="font-monospace">
        <i className="ph ph-globe me-2 text-neutral-500"></i>
        {message?.ipAddress || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (message: MessageDto) => !!message?.ipAddress,
  },
  {
    label: "Tercih Edilen İletişim",
    value: (message: MessageDto) => (
      <span>
        <i className="ph ph-chat me-2 text-warning-600"></i>
        {translateContactMethod(message?.preferredContactMethod)}
      </span>
    ),
    isShowing: (message: MessageDto) => !!message?.preferredContactMethod,
  },
  {
    label: "Tercih Edilen Saat",
    value: (message: MessageDto) => (
      <span>
        <i className="ph ph-clock me-2 text-purple-600"></i>
        {message?.preferredContactTime || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (message: MessageDto) => !!message?.preferredContactTime,
  },
];
