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

/**
 * Get badge variant based on attendance status
 * @param attendanceStatus - Attendance status string
 * @returns Badge variant
 */
export const getAttendanceStatusBadgeVariant = (
  attendanceStatus: string
): BadgeProps["variant"] => {
  switch (attendanceStatus?.toUpperCase()) {
    case "ATTENDED":
      return "success";
    case "CONFIRMED":
      return "info";
    case "EXPECTED":
      return "warning";
    case "NO_SHOW":
      return "danger";
    case "LATE":
      return "warning";
    case "LEFT_EARLY":
      return "warning";
    default:
      return "secondary";
  }
};
