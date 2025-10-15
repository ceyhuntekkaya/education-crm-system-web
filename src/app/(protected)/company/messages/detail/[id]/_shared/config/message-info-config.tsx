import React from "react";
import { MessageDto } from "@/types/dto/content/MessageDto";
import type { ConfigItem } from "../types";
import {
  translateMessageType,
  translateMessagePriority,
  translateMessageStatus,
} from "../utils";

/**
 * Mesaj bilgileri konfigürasyonu
 */
export const messageInfoConfig: ConfigItem[] = [
  {
    label: "Referans No",
    value: (message: MessageDto) => (
      <span className="fw-semibold text-primary-600">
        <i className="ph ph-hash me-2"></i>
        {message?.referenceNumber || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (message: MessageDto) => !!message?.referenceNumber,
  },
  {
    label: "Konu",
    value: (message: MessageDto) => (
      <span className="fw-semibold">
        <i className="ph ph-envelope me-2"></i>
        {message?.subject || "Konu belirtilmemiş"}
      </span>
    ),
    isShowing: () => true,
  },
  {
    label: "Mesaj Türü",
    value: (message: MessageDto) => (
      <span className="badge bg-secondary-subtle text-secondary fw-semibold">
        <i className="ph ph-tag me-1"></i>
        {translateMessageType(message?.messageType)}
      </span>
    ),
    isShowing: () => true,
  },
  {
    label: "Öncelik",
    value: (message: MessageDto) => {
      const priority = message?.priority || "NORMAL";
      const badgeClass =
        priority === "HIGH" || priority === "CRITICAL"
          ? "bg-danger-subtle text-danger"
          : priority === "URGENT"
          ? "bg-warning-subtle text-warning"
          : "bg-success-subtle text-success";

      return (
        <span className={`badge ${badgeClass} fw-semibold`}>
          <i className="ph ph-flag me-1"></i>
          {translateMessagePriority(priority)}
        </span>
      );
    },
    isShowing: () => true,
  },
  {
    label: "Durum",
    value: (message: MessageDto) => {
      const status = message?.status || "NEW";
      const badgeClass =
        status === "RESOLVED" || status === "CLOSED"
          ? "bg-success-subtle text-success"
          : status === "IN_PROGRESS"
          ? "bg-warning-subtle text-warning"
          : status === "NEW"
          ? "bg-info-subtle text-info"
          : "bg-secondary-subtle text-secondary";

      return (
        <span className={`badge ${badgeClass} fw-semibold`}>
          <i className="ph ph-circle me-1"></i>
          {translateMessageStatus(status)}
        </span>
      );
    },
    isShowing: () => true,
  },
];
