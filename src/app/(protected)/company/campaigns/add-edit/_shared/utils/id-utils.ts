/**
 * ID'nin geçerli bir edit ID'si olup olmadığını kontrol eder
 */
export const isValidEditId = (id: string | string[] | undefined): boolean => {
  if (!id || Array.isArray(id)) return false;
  if (id === "new") return false;
  const numId = Number(id);
  return !isNaN(numId) && numId > 0;
};

/**
 * Edit ID'sini parse eder ve number döner
 */
export const parseEditId = (
  id: string | string[] | undefined
): number | null => {
  if (!isValidEditId(id)) return null;
  return Number(id);
};
