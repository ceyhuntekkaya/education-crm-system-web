import { BadgeVariant } from "../components/badge";

/**
 * Get badge variant for message priority
 */
export const getPriorityBadgeVariant = (priority?: string): BadgeVariant => {
  if (!priority) return "secondary";

  switch (priority.toUpperCase()) {
    case "LOW":
      return "success";
    case "NORMAL":
      return "primary";
    case "HIGH":
      return "warning";
    case "URGENT":
    case "CRITICAL":
      return "danger";
    default:
      return "secondary";
  }
};
