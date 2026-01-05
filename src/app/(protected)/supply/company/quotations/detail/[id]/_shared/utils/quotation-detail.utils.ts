/**
 * ID'yi validate eder ve number'a çevirir
 * @param id - URL'den gelen ID string'i
 * @returns Geçerli bir number ID veya null
 */
export const validateQuotationId = (id: string): number | null => {
  const parsed = parseInt(id, 10);
  return !isNaN(parsed) && parsed > 0 ? parsed : null;
};

