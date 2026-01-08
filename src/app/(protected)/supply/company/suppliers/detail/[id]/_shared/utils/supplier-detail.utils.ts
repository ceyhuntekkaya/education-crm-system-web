/**
 * ID validasyon utility fonksiyonu
 *
 * @param id - Doğrulanacak ID string
 * @returns Geçerli bir pozitif number veya null
 */
export const validateSupplierId = (id: string): number | null => {
  const numericId = parseInt(id, 10);

  if (isNaN(numericId) || numericId <= 0) {
    return null;
  }

  return numericId;
};

/**
 * Tedarikçi rating'ini yıldız sayısına çevirir
 */
export const getStarRating = (rating?: number): number => {
  if (!rating) return 0;
  return Math.round(rating * 10) / 10; // 4.567 -> 4.6
};

/**
 * Tedarikçi durumuna göre badge config döndürür
 */
export const getSupplierStatusConfig = (isActive?: boolean) => {
  if (isActive) {
    return {
      text: "Aktif",
      variant: "success" as const,
      icon: "ph-check-circle",
    };
  }

  return {
    text: "Pasif",
    variant: "secondary" as const,
    icon: "ph-x-circle",
  };
};
