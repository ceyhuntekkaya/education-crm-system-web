/**
 * Belirli bir değerin geçerli bir edit ID'si olup olmadığını kontrol eder
 * @param id Route parametresinden gelen ID değeri
 * @returns Boolean - geçerli edit ID ise true
 */
export const isValidEditId = (
  id: string | string[] | undefined
): id is string => {
  if (!id || Array.isArray(id)) return false;
  if (id === "new") return false;

  const numId = parseInt(id, 10);
  return !isNaN(numId) && numId > 0;
};

/**
 * Edit ID'sini parse eder ve number'a çevirir
 * @param id Route parametresinden gelen ID değeri
 * @returns number | null - geçerli ID ise number, değilse null
 */
export const parseEditId = (
  id: string | string[] | undefined
): number | null => {
  if (!isValidEditId(id)) return null;
  return parseInt(id, 10);
};
