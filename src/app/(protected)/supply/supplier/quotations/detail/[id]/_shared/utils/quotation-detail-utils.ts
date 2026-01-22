/**
 * Quotation ID validasyonu
 * String ID'yi number'a çevirir ve kontrol eder
 */
export const validateQuotationId = (id: string): number | null => {
  const numericId = parseInt(id, 10);
  return isNaN(numericId) || numericId <= 0 ? null : numericId;
};
