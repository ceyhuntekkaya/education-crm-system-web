/**
 * ID'nin geçerli bir düzenleme ID'si olup olmadığını kontrol eder
 */
export const isValidEditId = (
  id: string | string[] | undefined
): id is string => {
  return typeof id === "string" && id !== "new";
};

/**
 * String ID'yi number ID'ye dönüştürür
 */
export const parseEditId = (
  id: string | string[] | undefined
): number | null => {
  if (!isValidEditId(id)) {
    return null;
  }

  const parsed = parseInt(id, 10);
  return isNaN(parsed) ? null : parsed;
};
