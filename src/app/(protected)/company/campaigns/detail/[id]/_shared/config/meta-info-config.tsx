import React from "react";
import type { MetaInfoItemConfig } from "../types";

/**
 * Meta bilgiler konfigürasyonu
 */
export const metaInfoConfig: MetaInfoItemConfig[] = [
  {
    label: "Meta Başlık",
    value: (campaign) => (
      <span className="badge bg-secondary-subtle text-secondary fw-semibold">
        <i className="ph ph-textbox me-1"></i>
        {campaign?.metaTitle}
      </span>
    ),
    isShowing: (campaign) => !!campaign?.metaTitle,
  },
  {
    label: "Meta Açıklama",
    value: (campaign) => (
      <div className="text-muted" style={{ maxWidth: "500px" }}>
        {campaign?.metaDescription}
      </div>
    ),
    isShowing: (campaign) => !!campaign?.metaDescription,
  },
  {
    label: "Meta Anahtar Kelimeler",
    value: (campaign) => (
      <div className="d-flex flex-wrap gap-1">
        {campaign?.metaKeywords
          ?.split(",")
          .map((keyword: string, index: number) => (
            <span
              key={index}
              className="badge bg-secondary-subtle text-secondary"
            >
              <i className="ph ph-hash me-1"></i>
              {keyword.trim()}
            </span>
          ))}
      </div>
    ),
    isShowing: (campaign) => !!campaign?.metaKeywords,
  },
  {
    label: "Slug",
    value: (campaign) => (
      <span className="badge bg-info-subtle text-info font-monospace fw-semibold">
        <i className="ph ph-link-simple me-1"></i>/{campaign?.slug}
      </span>
    ),
    isShowing: (campaign) => !!campaign?.slug,
  },
];
