export interface SchoolSurveyPerformanceDto {
  schoolId: number | null;
  schoolName: string;
  campusName: string;
  totalResponses: number | null;
  responseRate: number | null;
  completionRate: number | null;
  overallRating: number | null;
  cleanlinessRating: number | null;
  staffRating: number | null;
  facilitiesRating: number | null;
  communicationRating: number | null;
  recommendationRate: number | null;
  averageLikelihoodToEnroll: number | null;
  performanceLevel: 'EXCELLENT' | 'GOOD' | 'AVERAGE' | 'BELOW_AVERAGE' | 'POOR' | string;
  topStrengths: string[];
  improvementAreas: string[];
  overallTrend: 'IMPROVING' | 'DECLINING' | 'STABLE' | string;
}
