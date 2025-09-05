export interface AppointmentParticipantDto {
  id?: number;
  appointmentId?: number;
  userId?: number;
  userName?: string;
  participantType?: string;
  participantStatus?: string;
  joinTime?: string;
  leaveTime?: string;
  isHost?: boolean;
  isGuest?: boolean;
  participantDisplayName?: string;
}
