export interface AppointmentParticipantCreateDto {
  userId?: number;
  name?: string;
  email?: string;
  phone?: string;
  participantType?: string;
  notes?: string;
}
