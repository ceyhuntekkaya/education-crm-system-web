export interface AppointmentRescheduleDto {
  appointmentId?: number;
  rescheduleReason?: string;
  rescheduleNotes?: string;
  rescheduleDate?: string;
  rescheduleUserId?: number;
  rescheduleUserName?: string;
  previousDate?: string;
  newDate?: string;
}
