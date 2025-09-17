// Import DTO types from main types folder
import { AppointmentCreateDto } from "@/types/dto/appointment/AppointmentCreateDto";

/**
 * Form data interface - DTO'yu extend ederek form için ek alanlar
 */
export interface AppointmentCreateFormData extends AppointmentCreateDto {
  agreedToTerms?: boolean;
  communicationPreference?: "EMAIL" | "SMS" | "PHONE";
  // Additional form-specific fields
  selectedSlotId?: number;
  timeSlotData?: {
    slotId: number;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
  };
}

/**
 * Form step enum
 */
export enum FormStep {
  APPOINTMENT_TYPE = "appointment-type",
  DATE_TIME = "date-time",
  PERSONAL_INFO = "personal-info",
  STUDENT_INFO = "student-info",
  CONFIRMATION = "confirmation",
}

/**
 * Appointment creation result interface
 */
export interface AppointmentCreationResult {
  success: boolean;
  appointmentNumber?: string;
  message?: string;
  error?: string;
}