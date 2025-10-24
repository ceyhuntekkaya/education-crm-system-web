/**
 * Edit ID'nin geçerli olup olmadığını kontrol eder
 * @param id - URL'den gelen ID parametresi
 * @returns Boolean - ID geçerliyse true
 */
export const isValidEditId = (id: string | string[] | undefined): boolean => {
  if (!id || Array.isArray(id) || id === "new") {
    return false;
  }
  const numId = Number(id);
  return !isNaN(numId) && numId > 0;
};

/**
 * Edit ID'yi number'a çevirir
 * @param id - URL'den gelen ID parametresi
 * @returns Number | null - Geçerli ID varsa number, yoksa null
 */
export const parseEditId = (
  id: string | string[] | undefined
): number | null => {
  if (!isValidEditId(id)) {
    return null;
  }
  return Number(id);
};
