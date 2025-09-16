import { AppointmentDto } from "@/types/dto/appointment";
import { AppointmentStatus } from "@/enums/AppointmentStatus";

// Appointment Table Props
export interface AppointmentTableProps {
  appointments?: AppointmentDto[];
  loading?: boolean;
  onAppointmentSelect?: (appointment: AppointmentDto) => void;
  onStatusChange?: (
    appointmentId: number,
    newStatus: AppointmentStatus
  ) => void;
  showActions?: boolean;
  title?: string;
}

// Hook Options
export interface UseAppointmentsOptions {
  schoolId?: number;
  initialAppointments?: AppointmentDto[];
  autoRefresh?: boolean;
  refreshInterval?: number;
}

// Hook Return Type
export interface UseAppointmentsReturn {
  appointments: AppointmentDto[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  updateAppointmentStatus: (
    appointmentId: number,
    status: AppointmentStatus
  ) => Promise<void>;
  deleteAppointment: (appointmentId: number) => Promise<void>;
}

// Sort Direction
export type SortDirection = "asc" | "desc";

// Sort Field (AppointmentDto alanları)
export type SortField = keyof AppointmentDto;
