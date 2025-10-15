import React from "react";
import { MessageDto } from "@/types/dto/content/MessageDto";
import type { ConfigItem } from "../types";

/**
 * Mesaj içeriği konfigürasyonu
 */
export const messageContentConfig: ConfigItem[] = [
  {
    label: "İçerik",
    value: (message: MessageDto) => (
      <div className="p-3 bg-neutral-25 rounded-8 border">
        <i className="ph ph-text-align-left me-2 text-primary-600"></i>
        <div className="mt-2" style={{ whiteSpace: "pre-wrap" }}>
          {message?.content || "İçerik belirtilmemiş"}
        </div>
      </div>
    ),
    isShowing: (message: MessageDto) => !!message?.content,
  },
  {
    label: "İç Notlar",
    value: (message: MessageDto) => (
      <div className="p-3 bg-warning-25 rounded-8 border border-warning-30">
        <i className="ph ph-note me-2 text-warning-600"></i>
        <div className="mt-2" style={{ whiteSpace: "pre-wrap" }}>
          {message?.internalNotes || "Not yok"}
        </div>
      </div>
    ),
    isShowing: (message: MessageDto) => !!message?.internalNotes,
  },
  {
    label: "Etiketler",
    value: (message: MessageDto) => (
      <span>
        <i className="ph ph-tag me-2 text-info-600"></i>
        {message?.tags ? (
          message.tags.split(",").map((tag, index) => (
            <span
              key={index}
              className="badge bg-info-subtle text-info me-1 mb-1"
            >
              {tag.trim()}
            </span>
          ))
        ) : (
          <span className="text-neutral-500">Etiket yok</span>
        )}
      </span>
    ),
    isShowing: () => true,
  },
  {
    label: "Ek Dosyalar",
    value: (message: MessageDto) => {
      const hasAttachments = message?.hasAttachments;
      return (
        <span
          className={`badge ${
            hasAttachments
              ? "bg-success-subtle text-success"
              : "bg-secondary-subtle text-secondary"
          } fw-semibold`}
        >
          <i className="ph ph-paperclip me-1"></i>
          {hasAttachments ? "Var" : "Yok"}
        </span>
      );
    },
    isShowing: () => true,
  },
];
