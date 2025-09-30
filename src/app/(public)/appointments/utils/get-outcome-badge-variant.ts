import { BadgeProps } from "../components";

/**
 * Get badge variant based on appointment outcome
 * @param outcome - Appointment outcome string
 * @returns Badge variant
 */
export const getOutcomeBadgeVariant = (
  outcome: string
): BadgeProps["variant"] => {
  switch (outcome?.toUpperCase()) {
    case "ENROLLED":
      return "success";
    case "INTERESTED":
      return "info";
    case "NOT_INTERESTED":
      return "danger";
    case "NEEDS_MORE_INFO":
      return "warning";
    case "PRICE_CONCERN":
      return "warning";
    case "TIMING_ISSUE":
      return "warning";
    case "CONSIDERING_OPTIONS":
      return "info";
    case "WILL_CALL_BACK":
      return "info";
    case "OTHER":
      return "secondary";
    default:
      return "secondary";
  }
};
