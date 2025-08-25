export interface QuestionAnalyticsDto {
  questionId?: number;
  questionText?: string;
  questionType?: string;
  ratingCategory?: string;
  totalResponses?: number;
  skipCount?: number;
  responseRate?: number;
  skipRate?: number;
  averageResponseTimeSeconds?: number;
  averageRating?: number;
  choiceDistribution?: Record<string, number>;
  ratingDistribution?: Record<number, number>;
  averageNumericValue?: number;
  topTextResponses?: string[];
  yesCount?: number;
  noCount?: number;
  topChoice?: string;
  leastPopularChoice?: string;
}
