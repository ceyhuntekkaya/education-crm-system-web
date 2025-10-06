/**
 * Format date time to display format
 */
export const formatDateTime = (dateTime: string | Date): string => {
  if (!dateTime) return "-";

  const date = new Date(dateTime);
  if (isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
