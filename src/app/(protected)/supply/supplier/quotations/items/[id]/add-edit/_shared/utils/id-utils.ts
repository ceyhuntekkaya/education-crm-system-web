/**
 * ID parsing utilities
 */

/**
 * ID'nin edit için geçerli olup olmadığını kontrol eder
 * 'new' ise geçersiz, sayısal değer ise geçerlidir
 */
export const isValidEditId = (id: any): boolean => {
  if (id === "new" || id === undefined || id === null) {
    return false;
  }

  const numericId = typeof id === "string" ? parseInt(id) : id;
  return !isNaN(numericId) && numericId > 0;
};

/**
 * ID'yi parse eder
 * 'new' ise null, sayısal değer ise number döner
 */
export const parseEditId = (id: any): number | null => {
  if (id === "new" || id === undefined || id === null) {
    return null;
  }

  const numericId = typeof id === "string" ? parseInt(id) : id;
  return !isNaN(numericId) && numericId > 0 ? numericId : null;
};
