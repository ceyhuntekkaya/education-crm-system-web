import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import { ReactNode } from "react";

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
