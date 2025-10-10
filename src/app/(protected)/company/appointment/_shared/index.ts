// Appointment shared exports
export * from "./context/appointment-context";
export * from "./config";
export * from "./mock";
export * from "./sections";
export * from "./types";

// Utils exports (avoiding conflicts with mock)
export {
  getStatusBadgeVariant,
  getAppointmentTypeDisplay,
  formatAppointmentTime,
  calculateAppointmentStats,
} from "./utils/appointment-utils";
