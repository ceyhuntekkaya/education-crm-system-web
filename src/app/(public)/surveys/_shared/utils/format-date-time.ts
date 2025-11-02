import { formatDateTime as formatDateTimeUtil } from "@/utils";

/**
 * Format date-time string to readable format
 * @param dateString - ISO date string
 * @returns Formatted date-time string
 */
export const formatDateTime = (dateString: string | undefined): string => {
  if (!dateString) return "-";

  try {
    return formatDateTimeUtil(dateString);
  } catch (error) {
    console.error("Date formatting error:", error);
    return "-";
  }
};
