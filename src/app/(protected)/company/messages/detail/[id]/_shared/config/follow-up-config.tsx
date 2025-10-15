import React from "react";
import { MessageDto } from "@/types/dto/content/MessageDto";
import type { ConfigItem } from "../types";

/**
 * Takip ve memnuniyet konfigürasyonu
 */
export const followUpConfig: ConfigItem[] = [
  {
    label: "Takip Gerekli",
    value: (message: MessageDto) => {
      const followUpRequired = message?.followUpRequired;
      return (
        <span
          className={`badge ${
            followUpRequired
              ? "bg-warning-subtle text-warning"
              : "bg-success-subtle text-success"
          } fw-semibold`}
        >
          <i className="ph ph-bell me-1"></i>
          {followUpRequired ? "Evet" : "Hayır"}
        </span>
      );
    },
    isShowing: () => true,
  },
  {
    label: "Takip Tarihi",
    value: (message: MessageDto) => (
      <span>
        <i className="ph ph-calendar-dots me-2 text-warning-600"></i>
        {message?.followUpDate
          ? new Date(message.followUpDate).toLocaleString("tr-TR")
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (message: MessageDto) => !!message?.followUpDate,
  },
  {
    label: "Takip Notları",
    value: (message: MessageDto) => (
      <div className="p-3 bg-warning-25 rounded-8 border border-warning-30">
        <i className="ph ph-note me-2 text-warning-600"></i>
        <div className="mt-2" style={{ whiteSpace: "pre-wrap" }}>
          {message?.followUpNotes || "Not yok"}
        </div>
      </div>
    ),
    isShowing: (message: MessageDto) => !!message?.followUpNotes,
  },
  {
    label: "Memnuniyet Puanı",
    value: (message: MessageDto) => {
      const rating = message?.satisfactionRating;
      const badgeClass =
        rating && rating >= 4
          ? "bg-success-subtle text-success"
          : rating && rating >= 3
          ? "bg-warning-subtle text-warning"
          : "bg-danger-subtle text-danger";

      return (
        <span className={`badge ${badgeClass} fw-semibold`}>
          <i className="ph ph-star me-1"></i>
          {rating ? `${rating}/5` : "Değerlendirilmemiş"}
        </span>
      );
    },
    isShowing: (message: MessageDto) => !!message?.satisfactionRating,
  },
  {
    label: "Memnuniyet Yorumu",
    value: (message: MessageDto) => (
      <div className="p-3 bg-info-25 rounded-8 border border-info-30">
        <i className="ph ph-chat-text me-2 text-info-600"></i>
        <div className="mt-2" style={{ whiteSpace: "pre-wrap" }}>
          {message?.satisfactionFeedback || "Yorum yok"}
        </div>
      </div>
    ),
    isShowing: (message: MessageDto) => !!message?.satisfactionFeedback,
  },
  {
    label: "Memnuniyet Tarihi",
    value: (message: MessageDto) => (
      <span>
        <i className="ph ph-calendar-check me-2 text-success-600"></i>
        {message?.satisfactionDate
          ? new Date(message.satisfactionDate).toLocaleString("tr-TR")
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (message: MessageDto) => !!message?.satisfactionDate,
  },
];
