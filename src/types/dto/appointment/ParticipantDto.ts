export interface ParticipantDto {
  userId?: number;
  userName?: string;
  participantType?: string;
  participantStatus?: string;
  joinTime?: string;
  leaveTime?: string;
  isHost?: boolean;
  isGuest?: boolean;
}
