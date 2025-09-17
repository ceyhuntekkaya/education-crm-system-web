import { AppointmentParticipantDto } from "./AppointmentParticipantDto";
import { AppointmentNoteDto } from "./AppointmentNoteDto";

export interface AppointmentDto {
  /** Format: int64 */
  id?: number;
  appointmentNumber?: string;
  /** Format: int64 */
  appointmentSlotId?: number;
  /** Format: int64 */
  schoolId?: number;
  schoolName?: string;
  campusName?: string;
  /** Format: int64 */
  parentUserId?: number;
  parentUserName?: string;
  /** Format: int64 */
  staffUserId?: number;
  staffUserName?: string;
  /** Format: date */
  appointmentDate?: string;
  startTime?: string;
  endTime?: string;
  /** Format: date-time */
  actualStartTime?: string;
  /** Format: date-time */
  actualEndTime?: string;
  /** Format: int32 */
  durationMinutes?: number;
  /** @enum {string} */
  status?:
    | "PENDING"
    | "CONFIRMED"
    | "APPROVED"
    | "REJECTED"
    | "CANCELLED"
    | "COMPLETED"
    | "NO_SHOW"
    | "RESCHEDULED"
    | "IN_PROGRESS";
  /** @enum {string} */
  appointmentType?:
    | "INFORMATION_MEETING"
    | "SCHOOL_TOUR"
    | "ENROLLMENT_INTERVIEW"
    | "PARENT_MEETING"
    | "CONSULTATION"
    | "ASSESSMENT"
    | "ORIENTATION"
    | "ONLINE_MEETING"
    | "PHONE_CALL"
    | "GROUP_MEETING"
    | "OTHER";
  title?: string;
  description?: string;
  location?: string;
  isOnline?: boolean;
  meetingUrl?: string;
  meetingId?: string;
  meetingPassword?: string;
  parentName?: string;
  parentEmail?: string;
  parentPhone?: string;
  studentName?: string;
  /** Format: int32 */
  studentAge?: number;
  /** Format: date */
  studentBirthDate?: string;
  studentGender?: string;
  currentSchool?: string;
  gradeInterested?: string;
  specialRequests?: string;
  notes?: string;
  internalNotes?: string;
  /** Format: date-time */
  confirmedAt?: string;
  confirmedByUserName?: string;
  /** Format: date-time */
  reminderSentAt?: string;
  followUpRequired?: boolean;
  /** Format: date */
  followUpDate?: string;
  /** Format: date-time */
  canceledAt?: string;
  canceledByUserName?: string;
  cancellationReason?: string;
  /** @enum {string} */
  canceledByType?: "PARENT" | "SCHOOL" | "SYSTEM";
  /** Format: int64 */
  rescheduledFromId?: number;
  /** Format: int64 */
  rescheduledToId?: number;
  /** Format: int32 */
  rescheduleCount?: number;
  /** @enum {string} */
  outcome?:
    | "ENROLLED"
    | "INTERESTED"
    | "NOT_INTERESTED"
    | "NEEDS_MORE_INFO"
    | "PRICE_CONCERN"
    | "TIMING_ISSUE"
    | "CONSIDERING_OPTIONS"
    | "WILL_CALL_BACK"
    | "OTHER";
  outcomeNotes?: string;
  /** Format: int32 */
  enrollmentLikelihood?: number;
  nextSteps?: string;
  /** Format: date-time */
  surveySentAt?: string;
  /** Format: date-time */
  surveyCompletedAt?: string;
  formattedDate?: string;
  formattedTime?: string;
  statusDisplayName?: string;
  outcomeDisplayName?: string;
  canCancel?: boolean;
  canReschedule?: boolean;
  canComplete?: boolean;
  /** Format: int32 */
  hoursUntilAppointment?: number;
  appointmentSummary?: string;
  participants?: AppointmentParticipantDto[];
  appointmentNotes?: AppointmentNoteDto[];
  /** Format: date-time */
  createdAt?: string;
  /** Format: date-time */
  updatedAt?: string;
}
