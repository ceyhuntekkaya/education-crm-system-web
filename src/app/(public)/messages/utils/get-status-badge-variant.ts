import { BadgeVariant } from "../components/badge";

/**
 * Get badge variant for message status
 */
export const getStatusBadgeVariant = (status?: string): BadgeVariant => {
  if (!status) return "secondary";

  switch (status.toUpperCase()) {
    case "NEW":
      return "info";
    case "READ":
      return "primary";
    case "IN_PROGRESS":
    case "WAITING_RESPONSE":
      return "warning";
    case "RESPONDED":
      return "success";
    case "RESOLVED":
    case "CLOSED":
      return "secondary";
    case "ESCALATED":
      return "danger";
    case "SPAM":
      return "danger";
    case "ARCHIVED":
      return "secondary";
    default:
      return "secondary";
  }
};
