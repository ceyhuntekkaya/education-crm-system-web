/**
 * Sipariş durumuna göre badge variant döndürür
 */
export const getOrderStatusBadgeVariant = (
  status?: string
): "success" | "warning" | "danger" | "info" | "secondary" => {
  switch (status?.toUpperCase()) {
    case "CONFIRMED":
      return "success";
    case "PREPARING":
      return "info";
    case "SHIPPED":
      return "info";
    case "DELIVERED":
      return "success";
    case "PENDING":
      return "warning";
    case "CANCELLED":
    case "RETURNED":
      return "danger";
    default:
      return "secondary";
  }
};

/**
 * Sipariş durumunu Türkçe'ye çevirir
 */
export const getOrderStatusDisplay = (status?: string): string => {
  switch (status?.toUpperCase()) {
    case "PENDING":
      return "Beklemede";
    case "CONFIRMED":
      return "Onaylandı";
    case "PREPARING":
      return "Hazırlanıyor";
    case "SHIPPED":
      return "Kargoda";
    case "DELIVERED":
      return "Teslim Edildi";
    case "CANCELLED":
      return "İptal Edildi";
    case "RETURNED":
      return "İade Edildi";
    default:
      return status || "-";
  }
};
