// Core exports
export {
  AppointmentAvailabilityProvider,
  useAppointment,
} from "./context/appointment-context";
export * from "./config";
export {
  useAppointmentAvailability,
  useAppointmentAvailabilityRange,
} from "./hooks";
export * from "./mock";

// Component exports
export * from "./sections";

// Utils exports (avoiding conflicts with mock)
export {
  getStatusBadgeVariant,
  getAppointmentTypeDisplay,
  formatAppointmentTime,
  calculateAppointmentStats,
} from "./utils/appointment-utils";
