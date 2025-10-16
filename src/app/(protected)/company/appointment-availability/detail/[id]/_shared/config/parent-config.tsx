import React from "react";
import type { BasicInfoItemConfig } from "../types";

/**
 * Veli bilgileri konfigürasyonu
 */
export const parentConfig: BasicInfoItemConfig[] = [
  {
    label: "Veli",
    value: (appointment) => (
      <span className="text-info fw-medium">
        <i className="ph ph-user me-2"></i>
        {appointment?.parentUserName ||
          appointment?.parentName ||
          "Belirtilmemiş"}
      </span>
    ),
    isShowing: (appointment) =>
      !!(appointment?.parentUserName || appointment?.parentName),
  },
  {
    label: "Veli E-posta",
    value: (appointment) => (
      <a
        href={`mailto:${appointment?.parentEmail}`}
        className="text-decoration-none"
      >
        <i className="ph ph-envelope me-2"></i>
        {appointment?.parentEmail}
      </a>
    ),
    isShowing: (appointment) => !!appointment?.parentEmail,
  },
  {
    label: "Veli Telefon",
    value: (appointment) => (
      <a
        href={`tel:${appointment?.parentPhone}`}
        className="text-decoration-none"
      >
        <i className="ph ph-phone me-2"></i>
        {appointment?.parentPhone}
      </a>
    ),
    isShowing: (appointment) => !!appointment?.parentPhone,
  },
];
