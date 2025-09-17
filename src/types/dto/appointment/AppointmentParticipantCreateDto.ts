export interface AppointmentParticipantCreateDto {
  /** Format: int64 */
  userId?: number;
  name?: string;
  email?: string;
  phone?: string;
  /** @enum {string} */
  participantType?:
    | "PARENT"
    | "STUDENT"
    | "SCHOOL_STAFF"
    | "CONSULTANT"
    | "OBSERVER"
    | "TRANSLATOR"
    | "OTHER";
  notes?: string;
}
