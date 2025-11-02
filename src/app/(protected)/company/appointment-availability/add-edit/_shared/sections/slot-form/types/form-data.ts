import { AppointmentType } from "@/enums";

/**
 * Appointment Slot form data type
 */
export interface SlotFormData {
  schoolId: number;
  staffUserId: string; // Autocomplete için string
  durationMinutes: string; // Autocomplete için string
  appointmentType: string; // Autocomplete için string
  onlineMeetingAvailable: boolean;
  slotDate: string;
}
