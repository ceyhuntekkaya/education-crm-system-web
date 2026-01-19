/**
 * Ürün durumuna göre badge variant döndürür
 */
export const getProductStatusBadgeVariant = (
  status?: string
): "success" | "warning" | "danger" | "secondary" => {
  switch (status?.toUpperCase()) {
    case "ACTIVE":
      return "success";
    case "PASSIVE":
      return "secondary";
    case "OUT_OF_STOCK":
      return "danger";
    case "DISCONTINUED":
      return "warning";
    default:
      return "secondary";
  }
};

/**
 * Ürün durumunu Türkçe'ye çevirir
 */
export const getProductStatusDisplay = (status?: string): string => {
  switch (status?.toUpperCase()) {
    case "ACTIVE":
      return "Aktif";
    case "PASSIVE":
      return "Pasif";
    case "OUT_OF_STOCK":
      return "Stokta Yok";
    case "DISCONTINUED":
      return "Üretimi Durduruldu";
    default:
      return status || "-";
  }
};

/**
 * Stok durumuna göre renk döndürür
 */
export const getStockColorClass = (
  currentStock?: number,
  minStockLevel?: number
): string => {
  if (currentStock === undefined || currentStock === 0) {
    return "text-danger";
  }
  if (
    minStockLevel !== undefined &&
    currentStock <= minStockLevel &&
    currentStock > 0
  ) {
    return "text-warning";
  }
  return "text-success";
};
