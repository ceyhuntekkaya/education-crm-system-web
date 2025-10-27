import React from "react";
import { formatDate } from "@/utils";
import type { CustomFeeConfigItem } from "../types";

/**
 * Geçerlilik ve Tarihler Konfigürasyonu
 */
export const customFeeValidityConfig: CustomFeeConfigItem[] = [
  {
    label: "Geçerlilik Başlangıcı",
    value: (customFee) => (
      <span className="text-neutral-700">
        <i className="ph ph-calendar me-2"></i>
        {customFee?.validFrom
          ? formatDate(customFee.validFrom)
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (customFee) => !!customFee?.validFrom,
  },
  {
    label: "Geçerlilik Bitişi",
    value: (customFee) => (
      <span className="text-neutral-700">
        <i className="ph ph-calendar me-2"></i>
        {customFee?.validUntil
          ? formatDate(customFee.validUntil)
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (customFee) => !!customFee?.validUntil,
  },
  {
    label: "Oluşturulma Tarihi",
    value: (customFee) => (
      <span className="text-neutral-700">
        <i className="ph ph-clock me-2"></i>
        {customFee?.createdAt
          ? formatDate(customFee.createdAt)
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (customFee) => !!customFee?.createdAt,
  },
  {
    label: "Güncellenme Tarihi",
    value: (customFee) => (
      <span className="text-neutral-700">
        <i className="ph ph-clock-clockwise me-2"></i>
        {customFee?.updatedAt
          ? formatDate(customFee.updatedAt)
          : "Belirtilmemiş"}
      </span>
    ),
    isShowing: (customFee) => !!customFee?.updatedAt,
  },
];
