import type { RFQItemDto } from "@/types";

// ================== CARD INFO HELPERS ==================

/**
 * RFQ Item kartı için özet bilgileri döndürür
 */
export function getItemCardSummary(item: RFQItemDto) {
  return {
    id: item.id,
    itemName: item.itemName || "Kalem Adı Yok",
    categoryName: item.categoryName || "Kategorisiz",
    quantity: item.quantity || 0,
    unit: item.unit || "Birim Yok",
    specifications: item.specifications || "Özellik belirtilmemiş",
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
 * Kategori rengini döndürür
 */
export function getCategoryColor(categoryName?: string): string {
  if (!categoryName) return "#6B7280"; // neutral-500

  // Simple hash function to generate consistent colors
  const hash = categoryName.split("").reduce((acc, char) => {
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
