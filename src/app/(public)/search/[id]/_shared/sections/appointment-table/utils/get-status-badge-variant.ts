import { BadgeProps } from "../components";

/**
 * Get badge variant based on appointment status
 * @param status - Appointment status string
 * @returns Badge variant
 */
export const getStatusBadgeVariant = (
  status: string
): BadgeProps["variant"] => {
  switch (status?.toUpperCase()) {
    case "CONFIRMED":
      return "success";
    case "APPROVED":
      return "success";
    case "COMPLETED":
      return "primary";
    case "PENDING":
      return "warning";
    case "IN_PROGRESS":
      return "info";
    case "CANCELLED":
      return "danger";
    case "REJECTED":
      return "danger";
    case "NO_SHOW":
      return "danger";
    case "RESCHEDULED":
      return "warning";
    default:
      return "secondary";
  }
};
