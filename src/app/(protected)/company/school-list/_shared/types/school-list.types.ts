import { SchoolDto } from "@/types";
import { ReactNode } from "react";

/**
 * School List column handlers interface
 * Defines the callback functions for school table actions
 */
export interface SchoolColumnHandlers {
  onViewDetails: (school: SchoolDto) => void;
  onEdit: (school: SchoolDto) => void;
  onToggleStatus: (school: SchoolDto) => void;
  onDelete?: (school: SchoolDto) => void;
  onDuplicate?: (school: SchoolDto) => void;
  onViewAppointments?: (school: SchoolDto) => void;
}

/**
 * Badge variant types for school status display
 */
export type BadgeVariant =
  | "success"
  | "warning"
  | "danger"
  | "secondary"
  | "info";

/**
 * School action buttons component props
 */
export interface SchoolActionButtonsProps {
  school: SchoolDto;
  onViewDetails?: (school: SchoolDto) => void;
  onEdit?: (school: SchoolDto) => void;
  onToggleStatus?: (school: SchoolDto) => void;
  onDelete?: (school: SchoolDto) => void;
  onDuplicate?: (school: SchoolDto) => void;
  onViewAppointments?: (school: SchoolDto) => void;
}

/**
 * School table component props
 */
export interface SchoolTableProps {
  loading?: boolean;
}

/**
 * School List context type
 */
export interface SchoolListContextType {
  schools: SchoolDto[];
  loading?: boolean;
}

/**
 * School statistics interface
 */
export interface SchoolStats {
  total: number;
  withActiveAppointments: number;
  withActiveCampaigns: number;
  subscribed: number;
  favorites: number;
  averageRating: number;
  totalRatings: number;
  institutionTypes: { [key: string]: number };
}
