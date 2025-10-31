import { ReactNode } from "react";
import { SurveyResponseDto } from "@/types";

/**
 * Badge variant types for survey status display
 */
export type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";
/**
 * Survey table component props
 */
export interface SurveyTableProps {
  surveys?: SurveyResponseDto[];
  loading?: boolean;
}

/**
 * Survey list context type - Basit listeleme için
 */
export interface SurveyListContextType {
  // Survey data
  surveys: SurveyResponseDto[];
  surveyLoading: boolean;
  surveyError: string | null;
  refetchSurveys: () => void;
}

/**
 * Survey statistics interface
 */
export interface SurveyStats {
  totalSurveys: number;
  activeSurveys: number;
  totalSent: number;
  totalCompleted: number;
  averageCompletionRate: number;
  averageRating: number;
  mandatorySurveys: number;
  anonymousSurveys: number;
}

// Survey stats type
export interface SurveyStats {
  totalSurveys: number;
  activeSurveys: number;
  totalSent: number;
  totalCompleted: number;
  averageCompletionRate: number;
  averageRating: number;
  mandatorySurveys: number;
  anonymousSurveys: number;
}
