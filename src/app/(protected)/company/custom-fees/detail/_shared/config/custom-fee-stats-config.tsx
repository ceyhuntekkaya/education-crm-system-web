import React from "react";
import { formatCurrency } from "../../../utils";
import type { CustomFeeConfigItem } from "../types";

/**
 * İstatistikler Konfigürasyonu
 */
export const customFeeStatsConfig: CustomFeeConfigItem[] = [
  {
    label: "Toplama Oranı",
    value: (customFee) => (
      <div className="d-flex align-items-center gap-2">
        <div className="progress" style={{ width: "100px", height: "8px" }}>
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{
              width: `${((customFee?.collectionRate || 0) * 100).toFixed(0)}%`,
            }}
            aria-valuenow={(customFee?.collectionRate || 0) * 100}
            aria-valuemin={0}
            aria-valuemax={100}
          ></div>
        </div>
        <span className="fw-semibold text-success-600">
          %{((customFee?.collectionRate || 0) * 100).toFixed(0)}
        </span>
      </div>
    ),
    isShowing: (customFee) => customFee?.collectionRate !== undefined,
  },
  {
    label: "Toplam Tahsil Edilen",
    value: (customFee) => (
      <span className="fw-semibold text-success-600">
        {formatCurrency(customFee?.totalCollected, "TRY")}
      </span>
    ),
    isShowing: (customFee) => customFee?.totalCollected !== undefined,
  },
  {
    label: "Ücretlendirilen Öğrenci",
    value: (customFee) => (
      <span className="text-neutral-700">
        <i className="ph ph-users me-2"></i>
        {customFee?.studentsCharged || 0} öğrenci
      </span>
    ),
    isShowing: (customFee) => customFee?.studentsCharged !== undefined,
  },
  {
    label: "Ödeme Yapan Öğrenci",
    value: (customFee) => (
      <span className="text-success-600">
        <i className="ph ph-check-circle me-2"></i>
        {customFee?.studentsPaid || 0} öğrenci
      </span>
    ),
    isShowing: (customFee) => customFee?.studentsPaid !== undefined,
  },
  {
    label: "Ortalama Gecikme",
    value: (customFee) => (
      <span className="text-warning-600">
        <i className="ph ph-clock me-2"></i>
        {customFee?.averagePaymentDelayDays?.toFixed(1) || 0} gün
      </span>
    ),
    isShowing: (customFee) => customFee?.averagePaymentDelayDays !== undefined,
  },
];
