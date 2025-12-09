import React from "react";
import { Badge } from "@/components";
import type { CustomFeeConfigItem } from "../types";

/**
 * Uygulama Kuralları Konfigürasyonu
 */
export const customFeeApplicationRulesConfig: CustomFeeConfigItem[] = [
  {
    label: "Zorunlu Ücret",
    value: (customFee) => (
      <div className="ms-4">
        <Badge variant={customFee?.isMandatory ? "warning" : "secondary"}>
          {customFee?.isMandatory ? "Evet" : "Hayır"}
        </Badge>
      </div>
    ),
    isShowing: (customFee) => customFee?.isMandatory !== undefined,
  },
  {
    label: "İade Edilebilir",
    value: (customFee) => (
      <div className="ms-4">
        <Badge variant={customFee?.isRefundable ? "success" : "secondary"}>
          {customFee?.isRefundable ? "Evet" : "Hayır"}
        </Badge>
      </div>
    ),
    isShowing: (customFee) => customFee?.isRefundable !== undefined,
  },
  {
    label: "Yeni Öğrencilere Uygulanır",
    value: (customFee) => (
      <div className="ms-4">
        <Badge
          variant={customFee?.appliesToNewStudents ? "success" : "secondary"}
        >
          {customFee?.appliesToNewStudents ? "Evet" : "Hayır"}
        </Badge>
      </div>
    ),
    isShowing: (customFee) => customFee?.appliesToNewStudents !== undefined,
  },
  {
    label: "Mevcut Öğrencilere Uygulanır",
    value: (customFee) => (
      <div className="ms-4">
        <Badge
          variant={
            customFee?.appliesToExistingStudents ? "success" : "secondary"
          }
        >
          {customFee?.appliesToExistingStudents ? "Evet" : "Hayır"}
        </Badge>
      </div>
    ),
    isShowing: (customFee) =>
      customFee?.appliesToExistingStudents !== undefined,
  },
];
