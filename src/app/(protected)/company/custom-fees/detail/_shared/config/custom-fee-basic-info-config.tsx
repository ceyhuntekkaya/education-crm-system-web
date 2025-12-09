import React from "react";
import { Badge } from "@/components";
import {
  getStatusBadgeVariant,
  getStatusDisplay,
  getFeeTypeDisplay,
  getFeeTypeBadgeVariant,
  getBillingPeriodDisplay,
  formatCurrency,
} from "../../../utils";
import type { CustomFeeConfigItem } from "../types";

/**
 * Temel Bilgiler Konfigürasyonu
 */
export const customFeeBasicInfoConfig: CustomFeeConfigItem[] = [
  {
    label: "Ücret Adı",
    value: (customFee) => (
      <span className="text-main-600 fw-semibold ">
        <i className="ph ph-currency-circle-dollar me-4"></i>
        {customFee?.feeName || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (customFee) => !!customFee?.feeName,
  },
  {
    label: "Kurum",
    value: (customFee) => (
      <span className="text-neutral-700 ">
        <i className="ph ph-graduation-cap me-4"></i>
        {customFee?.schoolName || "Belirtilmemiş"}
      </span>
    ),
    isShowing: (customFee) => !!customFee?.schoolName,
  },
  {
    label: "Ücret Türü",
    value: (customFee) => (
      <div className="">
        <Badge variant={getFeeTypeBadgeVariant(customFee?.feeType)}>
          {getFeeTypeDisplay(customFee?.feeType)}
        </Badge>
      </div>
    ),
    isShowing: (customFee) => !!customFee?.feeType,
  },
  {
    label: "Tutar",
    value: (customFee) => (
      <span className="fw-semibold text-success-600 fs-5 ">
        {customFee?.formattedFeeAmount ||
          formatCurrency(customFee?.feeAmount, "TRY")}
      </span>
    ),
    isShowing: (customFee) => customFee?.feeAmount !== undefined,
  },
  {
    label: "Ücret Sıklığı",
    value: (customFee) => (
      <span className="text-neutral-700 ">
        <i className="ph ph-calendar-check me-4"></i>
        {getBillingPeriodDisplay(customFee?.feeFrequency)}
      </span>
    ),
    isShowing: (customFee) => !!customFee?.feeFrequency,
  },
  {
    label: "Durum",
    value: (customFee) => (
      <div className="">
        <Badge variant={getStatusBadgeVariant(customFee?.status)}>
          {getStatusDisplay(customFee?.status)}
        </Badge>
      </div>
    ),
    isShowing: (customFee) => !!customFee?.status,
  },
  {
    label: "Açıklama",
    value: (customFee) => (
      <div className="text-neutral-700 d-flex ">
        <i
          className="ph ph-note-pencil me-4 pt-2"
          style={{ flexShrink: 0 }}
        ></i>
        <span
          className="line-height-relaxed"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {customFee?.feeDescription || "-"}
        </span>
      </div>
    ),
    isShowing: (customFee) => !!customFee?.feeDescription,
  },
];
