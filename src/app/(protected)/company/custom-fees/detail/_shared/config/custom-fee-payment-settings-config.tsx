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
      <span className="text-neutral-700 ">
        <i className="ph ph-calendar me-4"></i>
        {customFee?.dueDateOffsetDays || 0} gün
      </span>
    ),
    isShowing: (customFee) => customFee?.dueDateOffsetDays !== undefined,
  },
  {
    label: "Gecikme Ücreti",
    value: (customFee) => (
      <span className="text-danger-600 fw-semibold ">
        <i className="ph ph-warning me-4"></i>%
        {customFee?.lateFeePercentage || 0}
      </span>
    ),
    isShowing: (customFee) => customFee?.lateFeePercentage !== undefined,
  },
  {
    label: "Taksit İzni",
    value: (customFee) => (
      <div className="">
        <Badge
          variant={customFee?.installmentAllowed ? "success" : "secondary"}
        >
          {customFee?.installmentAllowed ? "Var" : "Yok"}
        </Badge>
      </div>
    ),
    isShowing: (customFee) => customFee?.installmentAllowed !== undefined,
  },
  {
    label: "Maksimum Taksit Sayısı",
    value: (customFee) => (
      <span className="text-neutral-700 ">
        <i className="ph ph-list-numbers me-4"></i>
        {customFee?.maxInstallments || 1} taksit
      </span>
    ),
    isShowing: (customFee) =>
      customFee?.maxInstallments !== undefined &&
      !!customFee?.installmentAllowed,
  },
  {
    label: "İndirilebilir",
    value: (customFee) => (
      <div className="">
        <Badge variant={customFee?.discountEligible ? "success" : "secondary"}>
          <i className="ph ph-percent me-4"></i>
          {customFee?.discountEligible ? "Evet" : "Hayır"}
        </Badge>
      </div>
    ),
    isShowing: (customFee) => customFee?.discountEligible !== undefined,
  },
  {
    label: "Burs Uygulanabilir",
    value: (customFee) => (
      <div className="">
        <Badge
          variant={customFee?.scholarshipApplicable ? "success" : "secondary"}
        >
          <i className="ph ph-graduation-cap me-4"></i>
          {customFee?.scholarshipApplicable ? "Evet" : "Hayır"}
        </Badge>
      </div>
    ),
    isShowing: (customFee) => customFee?.scholarshipApplicable !== undefined,
  },
  {
    label: "Gerekli Dokümanlar",
    value: (customFee) => (
      <div className="text-neutral-700 d-flex ">
        <i className="ph ph-files me-4 pt-2" style={{ flexShrink: 0 }}></i>
        <span
          className="line-height-relaxed"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {customFee?.requiredDocuments || "Belirtilmemiş"}
        </span>
      </div>
    ),
    isShowing: (customFee) => !!customFee?.requiredDocuments,
  },
  {
    label: "Ücret Politikası",
    value: (customFee) => (
      <div className="text-neutral-700 d-flex ">
        <i className="ph ph-file-text me-4 pt-2" style={{ flexShrink: 0 }}></i>
        <span
          className="line-height-relaxed"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {customFee?.feePolicy || "Belirtilmemiş"}
        </span>
      </div>
    ),
    isShowing: (customFee) => !!customFee?.feePolicy,
  },
];
