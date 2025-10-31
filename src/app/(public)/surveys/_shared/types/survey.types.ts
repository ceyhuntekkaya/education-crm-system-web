import { SurveyResponseDto, SurveyDto } from "@/types";
import { ReactNode } from "react";

/**
 * Survey column handlers interface
 * Defines the callback functions for survey table actions
 */
export interface SurveyColumnHandlers {
  onViewDetails: (survey: SurveyResponseDto) => void;
  onTakeSurvey: (survey: SurveyResponseDto) => void;
}

/**
 * Badge variant types for survey status display
 */
export type BadgeVariant =
  | "success"
  | "warning"
  | "danger"
  | "secondary"
  | "info";

/**
 * Survey action buttons component props
 */
export interface SurveyActionButtonsProps {
  survey: SurveyResponseDto;
  onViewDetails?: (survey: SurveyResponseDto) => void;
  onTakeSurvey?: (survey: SurveyResponseDto) => void;
}

/**
 * Survey table component props
 */
export interface SurveyTableProps {
  surveys?: SurveyResponseDto[];
  loading?: boolean;
}

/**
 * Survey list context type
 */
export interface SurveyListContextType {
  // Survey data
  surveys: SurveyResponseDto[];
  surveyLoading: boolean;
  surveyError: string | null;

  // Modal state
  selectedSurvey: SurveyResponseDto | null;
  evaluationModalOpen: boolean;

  // Actions
  refetchSurveys: () => void;
  openEvaluationModal: (survey: SurveyResponseDto) => void;
  closeEvaluationModal: () => void;
  handleRowClick: (params: any) => void;

  // Evaluation submission
  submitEvaluation: (formData: any) => Promise<void>;
  submissionLoading: boolean;
  submissionError: string | null;
}

/**
 * Survey statistics interface
 */
export interface SurveyStats {
  total: number;
  completed: number;
  pending: number;
  averageRating: number;
}
