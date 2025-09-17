export interface AvailableSlotDto {
  /** Format: int64 */
  slotId?: number;
  startTime?: string;
  endTime?: string;
  /** Format: int32 */
  durationMinutes?: number;
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
  location?: string;
  isOnline?: boolean;
  staffUserName?: string;
  /** Format: int32 */
  availableCapacity?: number;
  requiresApproval?: boolean;
  timeRange?: string;
  isRecommended?: boolean;
}
