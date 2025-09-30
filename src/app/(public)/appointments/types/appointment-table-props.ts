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
