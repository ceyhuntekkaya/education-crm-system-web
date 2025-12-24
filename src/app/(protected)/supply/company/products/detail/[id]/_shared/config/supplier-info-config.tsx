import React from "react";
import type { SupplierInfoItemConfig } from "../types";

/**
 * Tedarikçi bilgileri konfigürasyonu
 */
export const supplierInfoConfig: SupplierInfoItemConfig[] = [
  {
    label: "Tedarikçi",
    value: (product) => (
      <span className="fw-semibold text-primary-600">
        {product?.supplierCompanyName || "Belirtilmemiş"}
      </span>
    ),
    isShowing: () => true,
  },
];
