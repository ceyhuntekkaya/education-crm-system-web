import React from "react";
import type { DescriptionItemConfig } from "../types";

/**
 * Açıklama bilgileri konfigürasyonu
 */
export const descriptionConfig: DescriptionItemConfig[] = [
  {
    label: "Kısa Açıklama",
    value: (campaign) => (
      <div className="text-muted fw-medium" style={{ maxWidth: "600px" }}>
        {campaign?.shortDescription}
      </div>
    ),
    isShowing: (campaign) => !!campaign?.shortDescription,
  },
  {
    label: "Detaylı Açıklama",
    value: (campaign) => (
      <div
        className="text-secondary"
        style={{ maxWidth: "700px", whiteSpace: "pre-wrap" }}
      >
        {campaign?.description}
      </div>
    ),
    isShowing: (campaign) => !!campaign?.description,
  },
];
