import { SchoolSearchResultDto } from "@/types";
import { ReactNode } from "react";

/**
 * School List column handlers interface
 * Defines the callback functions for school table actions
 */
export interface SchoolColumnHandlers {
  onViewDetails: (school: SchoolSearchResultDto) => void;
  onEdit: (school: SchoolSearchResultDto) => void;
  onToggleStatus: (school: SchoolSearchResultDto) => void;
  onDelete?: (school: SchoolSearchResultDto) => void;
  onDuplicate?: (school: SchoolSearchResultDto) => void;
  onViewAppointments?: (school: SchoolSearchResultDto) => void;
}

/**
 * Badge variant types for school status display
 */
export type BadgeVariant = "success" | "warning" | "danger" | "secondary" | "info";

/**
 * School action buttons component props
 */
export interface SchoolActionButtonsProps {
  school: SchoolSearchResultDto;
  onViewDetails?: (school: SchoolSearchResultDto) => void;
  onEdit?: (school: SchoolSearchResultDto) => void;
  onToggleStatus?: (school: SchoolSearchResultDto) => void;
  onDelete?: (school: SchoolSearchResultDto) => void;
  onDuplicate?: (school: SchoolSearchResultDto) => void;
  onViewAppointments?: (school: SchoolSearchResultDto) => void;
}

/**
 * School table component props
 */
export interface SchoolTableProps {
  schools?: SchoolSearchResultDto[];
  loading?: boolean;
}

/**
 * School List context type
 */
export interface SchoolListContextType {
  // School List context properties will be added here
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
