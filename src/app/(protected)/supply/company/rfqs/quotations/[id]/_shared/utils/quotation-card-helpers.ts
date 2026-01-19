import { QuotationComparisonDtoStatus } from "@/types/dto/supply/quotation.dto";
import type { BadgeVariant } from "@/components";

export const getStatusColor = (
  status?: QuotationComparisonDtoStatus
): {
  variant: BadgeVariant;
  className?: string;
  color?: string;
  bgClass?: string;
  textClass?: string;
} => {
  switch (status) {
    case "ACCEPTED":
      return {
        variant: "success",
        color: "#10b981",
        bgClass: "bg-success-50",
        textClass: "text-success-700",
      };
    case "SUBMITTED":
      return {
        variant: "info",
        color: "#3b82f6",
        bgClass: "bg-info-50",
        textClass: "text-info-700",
      };
    case "UNDER_REVIEW":
      return {
        variant: "warning",
        color: "#f59e0b",
        bgClass: "bg-warning-50",
        textClass: "text-warning-700",
      };
    case "REJECTED":
      return {
        variant: "danger",
        color: "#ef4444",
        bgClass: "bg-danger-50",
        textClass: "text-danger-700",
      };
    case "EXPIRED":
      return {
        variant: "secondary",
        color: "#6b7280",
        bgClass: "bg-neutral-50",
        textClass: "text-neutral-700",
      };
    case "DRAFT":
      return {
        variant: "secondary",
        color: "#6b7280",
        bgClass: "bg-neutral-50",
        textClass: "text-neutral-700",
      };
    default:
      return {
        variant: "secondary",
        color: "#6b7280",
        bgClass: "bg-neutral-50",
        textClass: "text-neutral-700",
      };
  }
};

export const getStatusLabel = (
  status?: QuotationComparisonDtoStatus
): string => {
  switch (status) {
    case "DRAFT":
      return "Taslak";
    case "SUBMITTED":
      return "Gönderildi";
    case "UNDER_REVIEW":
      return "İnceleniyor";
    case "ACCEPTED":
      return "Kabul Edildi";
    case "REJECTED":
      return "Reddedildi";
    case "EXPIRED":
      return "Süresi Doldu";
    default:
      return "Bilinmiyor";
  }
};

export const formatDeliveryDays = (days?: number): string => {
  if (!days) return "-";
  return `${days} gün`;
};

export const canAcceptQuotation = (
  status?: QuotationComparisonDtoStatus
): boolean => {
  // Sadece "Gönderildi" ve "İnceleniyor" durumlarında kabul edilebilir
  return status === "SUBMITTED" || status === "UNDER_REVIEW";
};
