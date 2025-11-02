/**
 * Randevu slot bilgilerini temsil eden DTO
 */
export interface AppointmentSlotDto {
  /** Format: int64 */
  id?: number;

  /** Format: int64 */
  schoolId?: number;

  schoolName?: string;

  /** Format: int64 */
  staffUserId?: number;

  staffUserName?: string;

  /** @enum {string} */
  dayOfWeek?:
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY";

  startTime?: string;

  endTime?: string;

  /** Format: int32 */
  durationMinutes?: number;

  /** Format: int32 */
  capacity?: number;

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

  onlineMeetingAvailable?: boolean;

  preparationRequired?: boolean;

  preparationNotes?: string;

  isRecurring?: boolean;

  /** Format: date */
  validFrom?: string;

  /** Format: date */
  validUntil?: string;

  excludedDates?: string;

  /** Format: int32 */
  advanceBookingHours?: number;

  /** Format: int32 */
  maxAdvanceBookingDays?: number;

  /** Format: int32 */
  cancellationHours?: number;

  requiresApproval?: boolean;

  timeRange?: string;

  dayOfWeekName?: string;

  isAvailable?: boolean;

  /** Format: int32 */
  availableCapacity?: number;

  /** Format: int32 */
  bookedCount?: number;

  nextAvailableDates?: string[];

  isActive?: boolean;

  /** Format: date-time */
  createdAt?: string;

  /** Format: date-time */
  updatedAt?: string;
}
