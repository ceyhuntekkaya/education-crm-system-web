import { AppointmentDto } from "./AppointmentDto";

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

  onlineMeetingAvailable?: boolean;

  /** Format: int32 */
  advanceBookingHours?: number;

  /** Format: int32 */
  maxAdvanceBookingDays?: number;

  /** Format: int32 */
  cancellationHours?: number;

  requiresApproval?: boolean;

  dayOfWeekName?: string;

  isAvailable?: boolean;

  isActive?: boolean;

  /** Format: date-time */
  createdAt?: string;

  /** Format: date-time */
  updatedAt?: string;

  /** Format: date-time */
  slotDate?: string;

  appointment?: AppointmentDto;
}
