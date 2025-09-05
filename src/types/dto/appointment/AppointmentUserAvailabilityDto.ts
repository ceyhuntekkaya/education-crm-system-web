export interface AppointmentUserAvailabilityDto {
  userId?: number;
  availableSlots?: string[];
  unavailableSlots?: string[];
  preferredSlots?: string[];
  notes?: string;
}
