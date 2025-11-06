import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import { AppointmentAvailabilityDto } from "@/types/dto/appointment/AppointmentAvailabilityDto";
import { AppointmentSlotDto } from "@/types/dto/appointment/AppointmentSlotDto";
import { CancelledByType } from "@/enums";
import type { CancelAppointmentFormValues } from "../sections/cancel-appointment-modal/types/form-values";
import type { ApiResponseDto } from "@/types";
import type {
  ConfirmAppointmentRequest,
  CancelAppointmentRequest,
} from "../hooks/useAppointmentActions";

/**
 * Badge variant types for appointment status display
 */
export type BadgeVariant =
  | "success"
  | "warning"
  | "danger"
  | "secondary"
  | "info";

/**
 * Appointment availability filter parameters
 */
export interface AppointmentAvailabilityFilters {
  schoolId?: number;
  date?: string;
}

/**
 * Appointment availability range filter parameters
 */
export interface AppointmentAvailabilityRangeFilters {
  schoolId?: number;
  startDate?: string;
  endDate?: string;
}

// AppointmentAvailabilityTableProps artık gerekli değil - component context üzerinden çalışıyor

/**
 * Legacy appointment table component props (deprecated)
 */
export interface AppointmentTableProps {
  appointments?: AppointmentDto[];
  loading?: boolean;
}

/**
 * Selected appointment data for modals
 */
export interface SelectedAppointment {
  id: number;
  appointment: AppointmentDto;
  slotDate?: string;
}

/**
 * Appointment availability context type
 */
export interface AppointmentAvailabilityContextType {
  // Availability data - Yeni API AppointmentSlotDto[] dönüyor
  availabilities: AppointmentSlotDto[];
  availabilityLoading: boolean;
  availabilityError: string | null;

  // Filter parameters
  filters: AppointmentAvailabilityFilters | AppointmentAvailabilityRangeFilters;

  // Frontend appointment filters
  appointmentFilters?: any;
  filteredAppointments?: AppointmentSlotDto[];

  // Data state
  hasDataToFilter?: boolean;

  // Actions (unified method for both single and range)
  fetchAvailabilities: (
    filters:
      | AppointmentAvailabilityFilters
      | AppointmentAvailabilityRangeFilters
  ) => void;
  updateFilters: (
    newFilters: Partial<
      AppointmentAvailabilityFilters | AppointmentAvailabilityRangeFilters
    >
  ) => void;
  clearFilters: () => void;

  // Appointment details filtering
  setAppointmentFilters?: (filters: any) => void;
  clearAppointmentFilters?: () => void;
  removeAppointmentFilter?: (key: string) => void;

  // Appointment operations (confirm, cancel) - Direct mutate functions
  confirmAppointment?: (
    data: ConfirmAppointmentRequest
  ) => Promise<ApiResponseDto<void> | null>;
  cancelAppointment?: (
    data: CancelAppointmentRequest
  ) => Promise<ApiResponseDto<void> | null>;
  confirmLoading?: boolean;
  cancelLoading?: boolean;

  // Modal management
  confirmModalOpen?: boolean;
  cancelModalOpen?: boolean;
  selectedAppointment?: SelectedAppointment | null;
  openConfirmModal?: (appointment: SelectedAppointment) => void;
  closeConfirmModal?: () => void;
  openCancelModal?: (appointment: SelectedAppointment) => void;
  closeCancelModal?: () => void;

  // Table specific data
  dataToDisplay?: AppointmentSlotDto[];
  emptyStateConfig?: {
    icon: string;
    title: string;
    description: string;
    showActions: boolean;
  };
  columns?: any[];
}

/**
 * Legacy appointment context type (deprecated)
 */
export interface AppointmentContextType {
  // Legacy appointment context properties
}

/**
 * Appointment statistics interface
 */
export interface AppointmentStats {
  total: number;
  confirmed: number;
  completed: number;
  cancelled: number;
  pending: number;
  inProgress: number;
  noShow: number;
  averageEnrollmentLikelihood: number;
  totalSchools: number;
  appointmentTypes: { [key: string]: number };
}
