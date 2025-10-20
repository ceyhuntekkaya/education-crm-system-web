export interface AppointmentNoteCreateDto {
  /** Format: int64 */
  appointmentId?: number;
  /** Format: int64 */
  authorUserId?: number;
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
  attachmentUrl?: string;
  attachmentName?: string;
  /** Format: int64 */
  attachmentSize?: number;
  attachmentType?: string;
  noSaleReason?: string;
}
