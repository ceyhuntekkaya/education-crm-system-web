/**
 * Parse ID from route param
 */
export const parseId = (id: string | undefined): number | null => {
  if (!id || id === "new") return null;
  const parsed = parseInt(id, 10);
  return isNaN(parsed) ? null : parsed;
};
