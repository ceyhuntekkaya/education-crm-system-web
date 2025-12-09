import React from "react";
import type { DiscountItemConfig } from "../types";
import { translateDiscountType } from "../utils";

/**
 * İndirim bilgileri konfigürasyonu
 */
export const discountConfig: DiscountItemConfig[] = [
  {
    label: "İndirim Türü",
    value: (campaign) => (
      <span className="fw-medium text-secondary-700">
        <i className="ph ph-percent me-2 text-warning"></i>
        {translateDiscountType(campaign?.discountType)}
      </span>
    ),
    isShowing: (campaign) =>
      !!campaign?.discountType && campaign?.discountType !== "NO_DISCOUNT",
  },
  {
    label: "İndirim Miktarı (TL)",
    value: (campaign) => {
      const amount = campaign?.discountAmount;
      if (!amount || amount === 0) return "-";
      return (
        <span className="fw-semibold text-success-700 fs-5">
          <i className="ph ph-currency-circle-dollar me-2"></i>
          {new Intl.NumberFormat("tr-TR", {
            style: "currency",
            currency: "TRY",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          }).format(amount)}
        </span>
      );
    },
    isShowing: (campaign) =>
      !!campaign?.discountAmount && campaign?.discountAmount > 0,
  },
  {
    label: "İndirim Yüzdesi (%)",
    value: (campaign) => {
      const percentage = campaign?.discountPercentage;
      if (!percentage || percentage === 0) return "-";
      return (
        <span className="fw-semibold text-primary-700 fs-5">
          <i className="ph ph-percent me-2"></i>%{percentage}
        </span>
      );
    },
    isShowing: (campaign) =>
      !!campaign?.discountPercentage && campaign?.discountPercentage > 0,
  },
];
