import { AppointmentSlotDto } from "@/types/dto/appointment/AppointmentSlotDto";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";

// Context types
export interface CurrentAppointmentContextType {
  currentAppointment: AppointmentSlotDto | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

// Component props
export interface AppointmentActionButtonsProps {
  appointment: AppointmentDto;
  onReschedule?: () => void;
  onCancel?: () => void;
  onComplete?: () => void;
}
