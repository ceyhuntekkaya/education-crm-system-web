import { RatingCategory } from "../../../enums/RatingCategory";
import { SurveyType } from "../../../enums/SurveyType";
import { QuestionAnalyticsDto } from "./QuestionAnalyticsDto";
import { DailySurveyStatsDto } from "./DailySurveyStatsDto";
import { SatisfactionTrendDto } from "./SatisfactionTrendDto";

export interface SurveyAnalyticsDto {
  surveyId: number;
  surveyTitle: string;
  surveyType: SurveyType;
  periodStart: string; // ISO date-time string
  periodEnd: string; // ISO date-time string
  totalInvitationsSent: number;
  totalStarted: number;
  totalCompleted: number;
  totalSubmitted: number;
  totalAbandoned: number;
  startRate: number;
  completionRate: number;
  submissionRate: number;
  abandonmentRate: number;
  averageCompletionTimeSeconds: number;
  medianCompletionTimeSeconds: number;
  fastestCompletionTimeSeconds: number;
  slowestCompletionTimeSeconds: number;
  overallAverageRating: number;
  categoryAverageRatings: Record<RatingCategory, number>;
  categoryResponseCounts: Record<RatingCategory, number>;
  ratingDistribution: Record<number, number>;
  totalFeedbackResponses: number;
  positiveRecommendations: number;
  negativeRecommendations: number;
  recommendationRate: number;
  averageLikelihoodToEnroll: number;
  questionAnalytics: QuestionAnalyticsDto[];
  dailyStats: DailySurveyStatsDto[];
  deviceTypeDistribution: Record<string, number>;
  browserDistribution: Record<string, number>;
  channelCompletionRates: Record<string, number>;
  satisfactionTrends: SatisfactionTrendDto[];
}
