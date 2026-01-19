/**
 * ID parsing and validation utilities for Product add/edit
 */

/**
 * Checks if the ID is valid for edit mode
 * Returns false for "new" or undefined/invalid IDs
 */
export const isValidEditId = (
  id: string | string[] | undefined,
): id is string => {
  if (!id || Array.isArray(id)) return false;
  if (id === "new") return false;
  const numericId = Number(id);
  return !isNaN(numericId) && numericId > 0;
};

/**
 * Parses the ID to a number
 * Returns null for invalid IDs
 */
export const parseEditId = (
  id: string | string[] | undefined,
): number | null => {
  if (!isValidEditId(id)) return null;
  return Number(id);
};
