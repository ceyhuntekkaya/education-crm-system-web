export interface AvailableSlotDto {
  slotId?: number;
  startTime?: string;
  endTime?: string;
  durationMinutes?: number;
  appointmentType?: string;
  location?: string;
  isOnline?: boolean;
  staffUserName?: string;
  availableCapacity?: number;
  requiresApproval?: boolean;
  timeRange?: string;
  isRecommended?: boolean;
}
