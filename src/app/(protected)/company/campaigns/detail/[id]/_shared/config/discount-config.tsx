import React from "react";
import type { DiscountItemConfig } from "../types";
import { formatDiscount, translateDiscountType } from "../utils";
import { formatCurrency, formatNumber } from "@/utils/format-number";

/**
 * İndirim bilgileri konfigürasyonu
 */
export const discountConfig: DiscountItemConfig[] = [
  {
    label: "İndirim Türü",
    value: (campaign) => (
      <span className="badge bg-warning-subtle text-warning fw-semibold">
        <i className="ph ph-percent me-1"></i>
        {translateDiscountType(campaign?.discountType)}
      </span>
    ),
    isShowing: (campaign) =>
      !!campaign?.discountType && campaign?.discountType !== "NO_DISCOUNT",
  },
  {
    label: "İndirim Miktarı",
    value: (campaign) => (
      <span className="badge bg-success-subtle text-success fw-semibold">
        <i className="ph ph-currency-circle-dollar me-1"></i>
        {formatDiscount(
          campaign?.discountType,
          campaign?.discountAmount,
          campaign?.discountPercentage
        )}
      </span>
    ),
    isShowing: (campaign) => {
      const discount = formatDiscount(
        campaign?.discountType,
        campaign?.discountAmount,
        campaign?.discountPercentage
      );
      return discount !== "İndirim Yok" && discount !== "Belirtilmemiş";
    },
  },
  {
    label: "Maksimum İndirim Tutarı",
    value: (campaign) => (
      <span className="badge bg-info-subtle text-info fw-semibold">
        <i className="ph ph-chart-line-up me-1"></i>
        {formatCurrency(campaign?.maxDiscountAmount || 0)}
      </span>
    ),
    isShowing: (campaign) => !!campaign?.maxDiscountAmount,
  },
  {
    label: "Minimum Alışveriş Tutarı",
    value: (campaign) => (
      <span className="badge bg-secondary-subtle text-secondary fw-semibold">
        <i className="ph ph-shopping-cart me-1"></i>
        {formatCurrency(campaign?.minPurchaseAmount || 0)}
      </span>
    ),
    isShowing: (campaign) => !!campaign?.minPurchaseAmount,
  },
  {
    label: "Promo Kodu",
    value: (campaign) => (
      <span className="badge bg-primary-subtle text-primary fw-semibold font-monospace">
        {campaign?.promoCode}
      </span>
    ),
    isShowing: (campaign) => !!campaign?.promoCode,
  },
];
