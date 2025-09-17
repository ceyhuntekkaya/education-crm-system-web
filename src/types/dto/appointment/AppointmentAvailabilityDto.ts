export interface AppointmentAvailabilityDto {
  /** Format: int64 */
  schoolId?: number;
  schoolName?: string;
  /** Format: date */
  date?: string;
  availableSlots?: import("./AvailableSlotDto").AvailableSlotDto[];
  /** Format: int32 */
  totalSlots?: number;
  /** Format: int32 */
  bookedSlots?: number;
  /** Format: int32 */
  availableCount?: number;
  availability?: string;
}
