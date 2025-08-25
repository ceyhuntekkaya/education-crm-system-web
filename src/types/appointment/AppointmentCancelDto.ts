export interface AppointmentCancelDto {
  appointmentId?: number;
  cancellationReason?: string;
  canceledByType?: string;
  notifyParticipants?: boolean;
  allowRebooking?: boolean;
}
