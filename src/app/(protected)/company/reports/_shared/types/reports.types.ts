import { AnalyticsDto } from "@/types/dto/analytics/AnalyticsDto";

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

// Reports column handlers
export interface ReportsColumnHandlers {
  onViewDetails?: (report: AnalyticsDto) => void;
  onEdit?: (report: AnalyticsDto) => void;
  onToggleStatus?: (report: AnalyticsDto) => void;
  onDelete?: (report: AnalyticsDto) => void;
  onDuplicate?: (report: AnalyticsDto) => void;
  onViewReport?: (report: AnalyticsDto) => void;
  onExport?: (report: AnalyticsDto) => void;
  onRefresh?: (report: AnalyticsDto) => void;
}

// Reports action buttons props
export interface ReportsActionButtonsProps {
  report: AnalyticsDto;
  onViewDetails?: (report: AnalyticsDto) => void;
  onEdit?: (report: AnalyticsDto) => void;
  onToggleStatus?: (report: AnalyticsDto) => void;
  onDelete?: (report: AnalyticsDto) => void;
  onDuplicate?: (report: AnalyticsDto) => void;
  onViewReport?: (report: AnalyticsDto) => void;
  onExport?: (report: AnalyticsDto) => void;
  onRefresh?: (report: AnalyticsDto) => void;
}

// Reports table props
export interface ReportsTableProps {
  reports?: AnalyticsDto[];
  loading?: boolean;
}

// Reports context type
export interface ReportsContextType {
  reports: AnalyticsDto[];
  loading: boolean;
  selectedReport: AnalyticsDto | null;
  setSelectedReport: (report: AnalyticsDto | null) => void;
  refreshReports: () => void;
}

// Reports stats type
export interface ReportsStats {
  totalReports: number;
  activeReports: number;
  trafficReports: number;
  engagementReports: number;
  conversionReports: number;
  performanceReports: number;
  financialReports: number;
  averagePageViews: number;
  averageConversionRate: number;
}
