import React from "react";
import type { BasicInfoItemConfig } from "../types";

/**
 * Personel bilgileri konfigürasyonu
 */
export const staffConfig: BasicInfoItemConfig[] = [
  {
    label: "Personel",
    value: (appointment) => (
      <span className="text-primary fw-medium">
        <i className="ph ph-user-circle me-2"></i>
        {appointment?.staffUserName || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (appointment) => !!appointment?.staffUserName,
  },
];
