export interface DailySurveyStatsDto {
  date?: string;
  invitationsSent?: number;
  responsesStarted?: number;
  responsesCompleted?: number;
  completionRate?: number;
  averageRating?: number;
  averageCompletionTime?: number;
}
