export interface AppointmentUpdateDto {
  appointmentId?: number;
  newDate?: string;
  newTime?: string;
  newLocationId?: number;
  newLocationName?: string;
  updateReason?: string;
  updateNotes?: string;
  updateUserId?: number;
  updateUserName?: string;
}
