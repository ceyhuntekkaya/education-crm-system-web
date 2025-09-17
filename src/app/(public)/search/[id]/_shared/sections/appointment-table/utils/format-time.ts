/**
 * Format a time value to Turkish locale time string
 * @param value - Time value (string, Date, or any)
 * @returns Formatted time string or "-" if invalid
 */
export const formatTime = (value: any): string => {
  if (!value) return "-";
  const date = new Date(value);
  return isNaN(date.getTime())
    ? "-"
    : date.toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
      });
};
