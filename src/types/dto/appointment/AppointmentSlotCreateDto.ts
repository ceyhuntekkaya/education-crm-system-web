import { AppointmentType } from "@/enums";

/**
 * Randevu slot oluşturma DTO
 */
export interface AppointmentSlotCreateDto {
  /** Format: int64 */
  schoolId: number;

  /** Format: int64 */
  staffUserId: number;

  /** Format: int32 */
  durationMinutes: number;

  appointmentType: AppointmentType;

  onlineMeetingAvailable: boolean;

  /** Format: date-time (ISO 8601) */
  slotDate: string;
}
