import React from "react";
import { Badge } from "@/components";
import type { CustomFeeConfigItem } from "../types";

/**
 * Ödeme Ayarları Konfigürasyonu
 */
export const customFeePaymentSettingsConfig: CustomFeeConfigItem[] = [
  {
    label: "Vade Günü Farkı",
    value: (customFee) => (
      <span className="text-neutral-700">
        {customFee?.dueDateOffsetDays || 0} gün
      </span>
    ),
    isShowing: (customFee) => customFee?.dueDateOffsetDays !== undefined,
  },
  {
    label: "Gecikme Ücreti",
    value: (customFee) => (
      <span className="text-danger-600 fw-semibold">
        %{customFee?.lateFeePercentage || 0}
      </span>
    ),
    isShowing: (customFee) => customFee?.lateFeePercentage !== undefined,
  },
  {
    label: "Taksit İzni",
    value: (customFee) => (
      <Badge variant={customFee?.installmentAllowed ? "success" : "secondary"}>
        {customFee?.installmentAllowed ? "Var" : "Yok"}
      </Badge>
    ),
    isShowing: (customFee) => customFee?.installmentAllowed !== undefined,
  },
  {
    label: "Maksimum Taksit",
    value: (customFee) => (
      <span className="text-neutral-700">
        {customFee?.maxInstallments || 1} taksit
      </span>
    ),
    isShowing: (customFee) => customFee?.maxInstallments !== undefined,
  },
  {
    label: "İndirilebilir",
    value: (customFee) => (
      <Badge variant={customFee?.discountEligible ? "success" : "secondary"}>
        {customFee?.discountEligible ? "Evet" : "Hayır"}
      </Badge>
    ),
    isShowing: (customFee) => customFee?.discountEligible !== undefined,
  },
  {
    label: "Burs Uygulanabilir",
    value: (customFee) => (
      <Badge
        variant={customFee?.scholarshipApplicable ? "success" : "secondary"}
      >
        {customFee?.scholarshipApplicable ? "Evet" : "Hayır"}
      </Badge>
    ),
    isShowing: (customFee) => customFee?.scholarshipApplicable !== undefined,
  },
];
