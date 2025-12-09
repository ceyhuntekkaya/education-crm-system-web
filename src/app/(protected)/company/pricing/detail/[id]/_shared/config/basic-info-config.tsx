import React from "react";
import type { BasicInfoItemConfig } from "../types";

/**
 * Temel bilgiler konfigürasyonu
 */
export const basicInfoConfig: BasicInfoItemConfig[] = [
  {
    label: "Kurum Adı",
    value: (pricing) => (
      <span className="fw-semibold text-primary-600">
        {pricing?.schoolName || "Belirtilmemiş"}
      </span>
    ),
    isShowing: () => true,
  },
];
