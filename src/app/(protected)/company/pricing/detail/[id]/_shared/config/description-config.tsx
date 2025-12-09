import React from "react";
import type { DescriptionItemConfig } from "../types";

/**
 * Açıklamalar ve koşullar konfigürasyonu
 */
export const descriptionConfig: DescriptionItemConfig[] = [
  {
    label: "Genel Açıklama",
    value: (pricing) => (
      <div className="text-neutral-700 fw-normal" style={{ lineHeight: "1.6" }}>
        {pricing?.publicDescription}
      </div>
    ),
    isShowing: (pricing) =>
      !!pricing?.publicDescription && pricing?.publicDescription.trim() !== "",
  },
  {
    label: "Ödeme Koşulları",
    value: (pricing) => (
      <div className="text-neutral-700 fw-normal" style={{ lineHeight: "1.6" }}>
        <i className="ph ph-info-circle text-primary-600 me-8"></i>
        {pricing?.paymentTerms}
      </div>
    ),
    isShowing: (pricing) =>
      !!pricing?.paymentTerms && pricing?.paymentTerms.trim() !== "",
  },
  {
    label: "İade Politikası",
    value: (pricing) => (
      <div className="text-neutral-700 fw-normal" style={{ lineHeight: "1.6" }}>
        <i className="ph ph-arrows-counter-clockwise text-warning-600 me-8"></i>
        {pricing?.refundPolicy}
      </div>
    ),
    isShowing: (pricing) =>
      !!pricing?.refundPolicy && pricing?.refundPolicy.trim() !== "",
  },
  {
    label: "İç Notlar",
    value: (pricing) => (
      <div
        className="text-neutral-600 fw-normal fst-italic"
        style={{ lineHeight: "1.6" }}
      >
        <i className="ph ph-note-pencil text-secondary-600 me-8"></i>
        {pricing?.internalNotes}
      </div>
    ),
    isShowing: (pricing) =>
      !!pricing?.internalNotes && pricing?.internalNotes.trim() !== "",
  },
  {
    label: "Ücret Döküm Notları",
    value: (pricing) => (
      <div className="text-neutral-700 fw-normal" style={{ lineHeight: "1.6" }}>
        {pricing?.feeBreakdownNotes}
      </div>
    ),
    isShowing: (pricing) =>
      !!pricing?.feeBreakdownNotes && pricing?.feeBreakdownNotes.trim() !== "",
  },
  {
    label: "Pazar Konumu",
    value: (pricing) => (
      <div className="text-neutral-700 fw-normal" style={{ lineHeight: "1.6" }}>
        <i className="ph ph-target text-info-600 me-8"></i>
        {pricing?.marketPosition}
      </div>
    ),
    isShowing: (pricing) =>
      !!pricing?.marketPosition && pricing?.marketPosition.trim() !== "",
  },
];
