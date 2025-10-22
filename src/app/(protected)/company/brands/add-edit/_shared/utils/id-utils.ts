/**
 * ID'nin geçerli bir edit ID olup olmadığını kontrol eder
 * @param id URL'den gelen ID parametresi
 * @returns Boolean - geçerli edit ID ise true
 */
export const isValidEditId = (id: string | string[]): boolean => {
  if (Array.isArray(id)) return false;
  if (!id || id === "new") return false;

  const numericId = parseInt(id, 10);
  return !isNaN(numericId) && numericId > 0;
};

/**
 * ID'yi number'a çevirir
 * @param id URL'den gelen ID parametresi
 * @returns number | null
 */
export const parseEditId = (id: string | string[]): number | null => {
  if (!isValidEditId(id)) return null;
  return parseInt(id as string, 10);
};
