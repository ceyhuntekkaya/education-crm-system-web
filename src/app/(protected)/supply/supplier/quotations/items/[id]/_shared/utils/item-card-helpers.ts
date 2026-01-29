import type { QuotationItemDto } from "@/types";

// ================== CARD INFO HELPERS ==================

/**
 * Quotation Item kartı için özet bilgileri döndürür
 */
export function getItemCardSummary(item: QuotationItemDto) {
  return {
    id: item.id,
    itemName: item.itemName || "Kalem Adı Yok",
    quantity: item.quantity || 0,
    unit: item.unit || "Birim Yok",
    specifications: item.specifications || "Özellik belirtilmemiş",
    unitPrice: item.unitPrice || 0,
    totalPrice: item.totalPrice || 0,
    discountAmount: item.discountAmount || 0,
    deliveryDays: item.deliveryDays || 0,
  };
}

/**
 * Miktar bilgisini formatlar
 */
export function formatQuantity(quantity?: number, unit?: string): string {
  if (!quantity) return "0";
  return `${quantity}${unit ? ` ${unit}` : ""}`;
}

/**
 * Fiyat bilgisini formatlar (TL)
 */
export function formatPrice(price?: number): string {
  if (!price) return "0,00 ₺";
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
  }).format(price);
}

/**
 * Teslimat süresini formatlar
 */
export function formatDeliveryDays(days?: number): string {
  if (!days) return "Belirtilmedi";
  if (days === 1) return "1 gün";
  return `${days} gün`;
}

/**
 * İndirim yüzdesini hesaplar
 */
export function calculateDiscountPercentage(
  unitPrice?: number,
  discountAmount?: number,
): number {
  if (!unitPrice || !discountAmount) return 0;
  return Math.round((discountAmount / unitPrice) * 100);
}

/**
 * Item adından dinamik renk döndürür (RFQ ile aynı mantık)
 */
export function getItemColor(itemName?: string): string {
  if (!itemName) return "#6B7280"; // neutral-500

  // Simple hash function to generate consistent colors
  const hash = itemName.split("").reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  const colors = [
    "#3B82F6", // blue
    "#10B981", // green
    "#F59E0B", // amber
    "#EF4444", // red
    "#8B5CF6", // violet
    "#EC4899", // pink
    "#06B6D4", // cyan
  ];

  return colors[Math.abs(hash) % colors.length];
}
