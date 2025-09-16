export interface AppointmentNoteDto {
  /** Format: int64 */
  id?: number;
  /** Format: int64 */
  appointmentId?: number;
  /** Format: int64 */
  authorUserId?: number;
  authorUserName?: string;
  note?: string;
  /** @enum {string} */
  noteType?:
    | "GENERAL"
    | "PREPARATION"
    | "FOLLOW_UP"
    | "OUTCOME"
    | "COMPLAINT"
    | "COMPLIMENT"
    | "TECHNICAL_ISSUE"
    | "RESCHEDULING"
    | "CANCELLATION"
    | "REMINDER"
    | "INTERNAL";
  isPrivate?: boolean;
  isImportant?: boolean;
  /** Format: date-time */
  noteDate?: string;
  attachmentUrl?: string;
  attachmentName?: string;
  /** Format: int64 */
  attachmentSize?: number;
  attachmentType?: string;
  noteTypeDisplayName?: string;
  formattedNoteDate?: string;
  canEdit?: boolean;
  canDelete?: boolean;
}
