export interface AppointmentCalendarEventDto {
  appointmentId?: number;
  title?: string;
  startTime?: string;
  endTime?: string;
  status?: string;
  statusColor?: string;
  participantName?: string;
  location?: string;
  isOnline?: boolean;
  isUrgent?: boolean;
  tooltip?: string;
}
