import { AppointmentSlotDto } from "@/types/dto/appointment/AppointmentSlotDto";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import { AppointmentRescheduleRequestDto } from "../hooks/use-appointment-reschedule";
import { AppointmentCancelRequestDto } from "../hooks/use-appointment-cancel";

// Context types
export interface CurrentAppointmentContextType {
  currentAppointment: AppointmentSlotDto | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  // Reschedule functionality
  rescheduleAppointment: (data: AppointmentRescheduleRequestDto) => void;
  isRescheduling: boolean;
  rescheduleError: string | null;
  // Cancel functionality
  cancelAppointment: (data: AppointmentCancelRequestDto) => void;
  isCancelling: boolean;
  cancelError: string | null;
}

// Component props
export interface AppointmentActionButtonsProps {
  appointment: AppointmentDto;
  onReschedule?: () => void;
  onCancel?: () => void;
  onComplete?: () => void;
}
