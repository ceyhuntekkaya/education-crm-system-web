import { BadgeProps } from "../components";

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
