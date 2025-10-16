import { AppointmentDto } from "@/types";

/**
 * Appointment detail context değeri
 */
export interface AppointmentDetailContextValue {
  appointmentId: number;
  appointment: AppointmentDto | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Appointment detail provider props
 */
export interface AppointmentDetailProviderProps {
  children: React.ReactNode;
  appointmentId: number;
}
