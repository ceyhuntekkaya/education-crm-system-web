import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import { ReactNode } from "react";

/**
 * Appointment column handlers interface
 * Defines the callback functions for appointment table actions
 */
export interface AppointmentColumnHandlers {
  onViewDetails: (appointment: AppointmentDto) => void;
  onEdit: (appointment: AppointmentDto) => void;
  onComplete: (appointment: AppointmentDto) => void;
  onCancel?: (appointment: AppointmentDto) => void;
  onReschedule?: (appointment: AppointmentDto) => void;
  onAddNote?: (appointment: AppointmentDto) => void;
}

/**
 * Badge variant types for appointment status display
 */
export type BadgeVariant = "success" | "warning" | "danger" | "secondary" | "info";

/**
 * Appointment action buttons component props
 */
export interface AppointmentActionButtonsProps {
  appointment: AppointmentDto;
  onViewDetails?: (appointment: AppointmentDto) => void;
  onEdit?: (appointment: AppointmentDto) => void;
  onComplete?: (appointment: AppointmentDto) => void;
  onCancel?: (appointment: AppointmentDto) => void;
  onReschedule?: (appointment: AppointmentDto) => void;
  onAddNote?: (appointment: AppointmentDto) => void;
}

/**
 * Appointment table component props
 */
export interface AppointmentTableProps {
  appointments?: AppointmentDto[];
  loading?: boolean;
}

/**
 * Appointment context type
 */
export interface AppointmentContextType {
  // Appointment context properties will be added here
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
