/**
 * ID'nin valid bir edit ID olup olmadığını kontrol eder
 */
export function isValidEditId(id: string | string[] | undefined): boolean {
  if (!id || Array.isArray(id)) return false;
  if (id === "new") return false;
  const parsed = parseInt(id, 10);
  return !isNaN(parsed) && parsed > 0;
}

/**
 * ID'yi parse eder
 */
export function parseEditId(id: string | string[] | undefined): number | null {
  if (!isValidEditId(id)) return null;
  return parseInt(id as string, 10);
}
