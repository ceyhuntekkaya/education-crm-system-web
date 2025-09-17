export interface AppointmentParticipantDto {
  /** Format: int64 */
  id?: number;
  /** Format: int64 */
  appointmentId?: number;
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
  /** @enum {string} */
  attendanceStatus?:
    | "EXPECTED"
    | "CONFIRMED"
    | "ATTENDED"
    | "NO_SHOW"
    | "LATE"
    | "LEFT_EARLY";
  notes?: string;
  /** Format: date-time */
  arrivalTime?: string;
  /** Format: date-time */
  departureTime?: string;
  participantTypeDisplayName?: string;
  attendanceStatusDisplayName?: string;
  /** Format: int32 */
  attendanceDurationMinutes?: number;
}
