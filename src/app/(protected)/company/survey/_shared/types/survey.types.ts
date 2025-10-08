import { SurveyDto } from "@/types/dto/survey/SurveyDto";

// Badge variant type
export type BadgeVariant = 
  | "primary" 
  | "secondary" 
  | "success" 
  | "danger" 
  | "warning" 
  | "info" 
  | "light" 
  | "dark";

// Survey column handlers
export interface SurveyColumnHandlers {
  onViewDetails?: (survey: SurveyDto) => void;
  onEdit?: (survey: SurveyDto) => void;
  onToggleStatus?: (survey: SurveyDto) => void;
  onDelete?: (survey: SurveyDto) => void;
  onDuplicate?: (survey: SurveyDto) => void;
  onViewSurvey?: (survey: SurveyDto) => void;
  onViewResults?: (survey: SurveyDto) => void;
  onSendSurvey?: (survey: SurveyDto) => void;
}

// Survey action buttons props
export interface SurveyActionButtonsProps {
  survey: SurveyDto;
  onViewDetails?: (survey: SurveyDto) => void;
  onEdit?: (survey: SurveyDto) => void;
  onToggleStatus?: (survey: SurveyDto) => void;
  onDelete?: (survey: SurveyDto) => void;
  onDuplicate?: (survey: SurveyDto) => void;
  onViewSurvey?: (survey: SurveyDto) => void;
  onViewResults?: (survey: SurveyDto) => void;
  onSendSurvey?: (survey: SurveyDto) => void;
}

// Survey table props
export interface SurveyTableProps {
  surveys?: SurveyDto[];
  loading?: boolean;
}

// Survey context type
export interface SurveyContextType {
  surveys: SurveyDto[];
  loading: boolean;
  selectedSurvey: SurveyDto | null;
  setSelectedSurvey: (survey: SurveyDto | null) => void;
  refreshSurveys: () => void;
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
