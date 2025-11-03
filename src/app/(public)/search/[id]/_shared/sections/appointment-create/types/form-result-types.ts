/**
 * Form result type definitions for appointment creation
 * Bu dosya form sonuç types'larını içerir
 */

import { AppointmentDto } from "@/types";

// =============================================================================
// FORM RESULT TYPES - Form sonuçları için interfaces
// =============================================================================

/**
 * Appointment creation result interface
 */
export interface AppointmentCreationResult {
  success: boolean;
  appointmentNumber?: string;
  message?: string;
  error?: string;
  appointment?: AppointmentDto;
}
