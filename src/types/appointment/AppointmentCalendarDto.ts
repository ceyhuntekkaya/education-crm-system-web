export interface AppointmentCalendarDto {
  date?: string;
  events?: import('./AppointmentCalendarEventDto').AppointmentCalendarEventDto[];
  totalAppointments?: number;
  availableSlots?: number;
  hasConflicts?: boolean;
}
