import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";

/**
 * Props for the AppointmentTable component
 */
export interface AppointmentTableProps {
  /**
   * Optional title for the table
   */
  title?: string;

  /**
   * Optional school ID to filter appointments
   */
  schoolId?: number;

  /**
   * Optional status to filter appointments
   */
  status?: string;

  /**
   * Maximum number of appointments to display
   */
  limit?: number;

  /**
   * Custom event handlers for appointment actions
   */
  onViewDetails?: (appointment: AppointmentDto) => void;
  onEdit?: (appointment: AppointmentDto) => void;
  onCancel?: (appointment: AppointmentDto) => void;
  onSelectionChange?: (selectedAppointments: AppointmentDto[]) => void;
}

/**
 * Configuration for appointment table behavior
 */
export interface AppointmentTableConfig {
  /**
   * Enable/disable row selection
   */
  enableSelection?: boolean;

  /**
   * Page size options for pagination
   */
  pageSizeOptions?: number[];

  /**
   * Initial page size
   */
  initialPageSize?: number;

  /**
   * Enable/disable click on row selection
   */
  disableRowSelectionOnClick?: boolean;
}

/**
 * Default configuration for the appointment table
 */
export const defaultAppointmentTableConfig: AppointmentTableConfig = {
  enableSelection: true,
  pageSizeOptions: [5, 10, 25, 50],
  initialPageSize: 10,
  disableRowSelectionOnClick: true,
};
