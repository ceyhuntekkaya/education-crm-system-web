import React from "react";
import { MessageDto } from "@/types/dto/content/MessageDto";
import type { ConfigItem } from "../types";

/**
 * Atama ve Kurum bilgileri konfigürasyonu
 */
export const assignmentInfoConfig: ConfigItem[] = [
  {
    label: "Kurum",
    value: (message: MessageDto) => (
      <span className="fw-medium">
        <i className="ph ph-buildings me-2 text-primary-600"></i>
        {message?.school?.name || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (message: MessageDto) => !!message?.school?.name,
  },
  {
    label: "Gönderen Kullanıcı",
    value: (message: MessageDto) => (
      <span>
        <i className="ph ph-user me-2 text-info-600"></i>
        {message?.senderUser?.fullName || "Sistem Kullanıcısı Değil"}
      </span>
    ),
    isShowing: (message: MessageDto) => !!message?.senderUser,
  },
  {
    label: "Atanan Kullanıcı",
    value: (message: MessageDto) => (
      <span>
        <i className="ph ph-user-focus me-2 text-warning-600"></i>
        {message?.assignedToUser?.fullName || "Atanmamış"}
      </span>
    ),
    isShowing: (message: MessageDto) => !!message?.assignedToUser,
  },
  {
    label: "Aktif Durum",
    value: (message: MessageDto) => {
      const isActive = message?.isActive;
      return (
        <span
          className={`badge ${
            isActive
              ? "bg-success-subtle text-success"
              : "bg-danger-subtle text-danger"
          } fw-semibold`}
        >
          <i
            className={`ph ${
              isActive ? "ph-toggle-right" : "ph-toggle-left"
            } me-1`}
          ></i>
          {isActive ? "Aktif" : "Pasif"}
        </span>
      );
    },
    isShowing: () => true,
  },
];
