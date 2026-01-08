import { ProductDtoStatus } from "@/types";
import { ProductResultDto } from "../types";

export const getStatusConfig = (status: ProductDtoStatus | undefined) => {
  switch (status) {
    case "ACTIVE":
      return {
        text: "Aktif",
        bgClass: "bg-success-600",
        textClass: "text-white",
      };
    case "PASSIVE":
      return {
        text: "Pasif",
        bgClass: "bg-neutral-600",
        textClass: "text-white",
      };
    case "OUT_OF_STOCK":
      return {
        text: "Stokta Yok",
        bgClass: "bg-danger-600",
        textClass: "text-white",
      };
    case "DISCONTINUED":
      return {
        text: "Üretimi Durduruldu",
        bgClass: "bg-warning-600",
        textClass: "text-white",
      };
    default:
      return {
        text: "Bilinmiyor",
        bgClass: "bg-neutral-600",
        textClass: "text-white",
      };
  }
};

export const getStockDisplay = (product: ProductResultDto) => {
  if (product.stockTrackingType === "UNLIMITED") {
    return "Sınırsız";
  }
  if (product.currentStock !== undefined) {
    return `${product.currentStock} Adet`;
  }
  return "Belirtilmemiş";
};

export const getStockColorClass = (
  isOutOfStock: boolean,
  isLowStock: boolean
) => {
  if (isOutOfStock) return "text-danger-600";
  if (isLowStock) return "text-warning-600";
  return "text-success-600";
};

export const getStockIconBoxColor = (
  isOutOfStock: boolean,
  isLowStock: boolean
) => {
  if (isOutOfStock) return "bg-danger-100 text-danger-700";
  if (isLowStock) return "bg-warning-100 text-warning-700";
  return "bg-success-100 text-success-700";
};
