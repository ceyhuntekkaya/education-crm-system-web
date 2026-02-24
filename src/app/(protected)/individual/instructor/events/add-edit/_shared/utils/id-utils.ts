/**
 * ID'nin geçerli bir edit ID olup olmadığını kontrol eder
 */
export const isValidEditId = (id: string | string[]): boolean => {
  if (Array.isArray(id)) return false;
  if (!id || id === "new") return false;
  const numericId = parseInt(id, 10);
  return !isNaN(numericId) && numericId > 0;
};

/**
 * ID'yi number'a çevirir
 */
export const parseEditId = (id: string | string[]): number | null => {
  if (!isValidEditId(id)) return null;
  return parseInt(id as string, 10);
};
