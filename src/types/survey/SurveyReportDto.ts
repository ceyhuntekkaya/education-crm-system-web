import { SurveyAnalyticsDto } from './SurveyAnalyticsDto';
import { SurveyRatingDto } from './SurveyRatingDto';
import { SurveyResponseDto } from './SurveyResponseDto';
import { SchoolSurveyPerformanceDto } from './SchoolSurveyPerformanceDto';

export interface SurveyReportDto {
  reportId: string;
  generatedAt: string;
  reportType: 'SUMMARY' | 'DETAILED' | 'COMPARISON' | 'TREND_ANALYSIS' | string;
  periodStart: string;
  periodEnd: string;
  surveyId: number;
  surveyTitle: string;
  analytics: SurveyAnalyticsDto;
  topRatings: SurveyRatingDto[];
  bottomRatings: SurveyRatingDto[];
  responses: SurveyResponseDto[];
  schoolPerformance: SchoolSurveyPerformanceDto[];
  keyInsights: string[];
  recommendations: string[];
  actionItems: string[];
  strengthsIdentified: string[];
  improvementAreas: string[];
  industryBenchmarks: Record<string, number>;
  performanceComparison: Record<string, number>;
  csvDownloadUrl: string;
  pdfDownloadUrl: string;
  excelDownloadUrl: string;
}
