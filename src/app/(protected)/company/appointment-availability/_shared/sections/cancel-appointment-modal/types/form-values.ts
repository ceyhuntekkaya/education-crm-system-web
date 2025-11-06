import { CancelledByType } from "@/enums";

/**
 * Cancel Appointment Form Values
 */
export interface CancelAppointmentFormValues {
  cancellationReason: string;
  canceledByType: CancelledByType;
}
