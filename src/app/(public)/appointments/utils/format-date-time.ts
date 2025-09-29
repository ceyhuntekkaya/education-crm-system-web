/**
 * Format a date value to Turkish locale date string
 * @param value - Date value (string, Date, or any)
 * @returns Formatted date string or "-" if invalid
 */
export const formatDateTime = (value: any): string => {
  if (!value) return "-";
  const date = new Date(value);
  return isNaN(date.getTime()) ? "-" : date.toLocaleDateString("tr-TR");
};
