import { BadgeProps } from "../components";

/**
 * Get badge variant based on participant type
 * @param participantType - Participant type string
 * @returns Badge variant
 */
export const getParticipantTypeBadgeVariant = (
  participantType: string
): BadgeProps["variant"] => {
  switch (participantType?.toUpperCase()) {
    case "PARENT":
      return "primary";
    case "STUDENT":
      return "info";
    case "SCHOOL_STAFF":
      return "success";
    case "CONSULTANT":
      return "warning";
    case "OBSERVER":
      return "secondary";
    case "TRANSLATOR":
      return "info";
    case "OTHER":
      return "secondary";
    default:
      return "secondary";
  }
};
