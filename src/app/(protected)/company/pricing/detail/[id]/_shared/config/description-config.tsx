import React from "react";
import type { DescriptionItemConfig } from "../types";

/**
 * Açıklamalar ve koşullar konfigürasyonu
 */
export const descriptionConfig: DescriptionItemConfig[] = [
  {
    label: "Genel Açıklama",
    value: (pricing) => (
      <span className="text-neutral-600 fw-normal">
        {pricing?.publicDescription}
      </span>
    ),
    isShowing: (pricing) => !!pricing?.publicDescription,
  },
  {
    label: "Ödeme Koşulları",
    value: (pricing) => (
      <span className="text-neutral-600 fw-normal">
        {pricing?.paymentTerms}
      </span>
    ),
    isShowing: (pricing) => !!pricing?.paymentTerms,
  },
  {
    label: "İade Politikası",
    value: (pricing) => (
      <span className="text-neutral-600 fw-normal">
        {pricing?.refundPolicy}
      </span>
    ),
    isShowing: (pricing) => !!pricing?.refundPolicy,
  },
];
