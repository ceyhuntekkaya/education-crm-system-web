export interface AppointmentStatusChangeDto {
  appointmentId?: number;
  previousStatus?: string;
  newStatus?: string;
  changeReason?: string;
  changeNotes?: string;
  changeDate?: string;
  changeUserId?: number;
  changeUserName?: string;
}
