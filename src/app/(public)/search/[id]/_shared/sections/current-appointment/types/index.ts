import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";

// Ana component props
export interface CurrentAppointmentProps {
  institutionId: string;
}

// Context types
export interface CurrentAppointmentContextType {
  currentAppointment: AppointmentDto | null;
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
