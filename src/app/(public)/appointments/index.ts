// Main component export
export { default as AppointmentTable } from "./page";

// UI Components export
export { Avatar, Badge, ActionButtons } from "./components";

// Section Components export
export { AppointmentTableHeader, AppointmentTableError } from "./sections";

// Utils export
export {
  formatDateTime,
  formatTime,
  getStatusBadgeVariant,
  getOutcomeBadgeVariant,
} from "./utils";

// Hooks export
export { useAppointments } from "./hooks";

// Config export
export { createAppointmentColumns } from "./config";
export * from "./types";
export * from "./hooks";
export * from "./mock";
