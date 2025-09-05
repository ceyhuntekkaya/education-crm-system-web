export interface AppointmentAvailabilityDto {
  schoolId?: number;
  schoolName?: string;
  date?: string;
  availableSlots?: import('./AvailableSlotDto').AvailableSlotDto[];
  totalSlots?: number;
  bookedSlots?: number;
  availableCount?: number;
  availability?: 'FULLY_BOOKED' | 'LIMITED' | 'AVAILABLE' | 'ABUNDANT';
}
