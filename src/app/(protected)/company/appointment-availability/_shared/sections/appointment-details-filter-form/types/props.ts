import { AppointmentDetailsFilters } from "./filters";

/**
 * Appointment Details Filter Form Props
 */
export interface AppointmentDetailsFilterFormProps {
  onFilter?: (filters: AppointmentDetailsFilters) => void;
  loading?: boolean;
  className?: string;
}

/**
 * Form Content Props
 */
export interface AppointmentDetailsFormContentProps {
  onSubmit?: (filters: AppointmentDetailsFilters) => void;
}
