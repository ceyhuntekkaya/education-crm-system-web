import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import { AppointmentAvailabilityDto } from "@/types/dto/appointment/AppointmentAvailabilityDto";

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
 * Appointment availability context type
 */
export interface AppointmentAvailabilityContextType {
  // Availability data
  availabilities: AppointmentDto[];
  availabilityLoading: boolean;
  availabilityError: string | null;

  // Filter parameters
  filters: AppointmentAvailabilityFilters | AppointmentAvailabilityRangeFilters;

  // Frontend appointment filters
  appointmentFilters?: any;
  filteredAppointments?: AppointmentDto[];

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
