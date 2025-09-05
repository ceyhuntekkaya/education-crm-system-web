export interface SatisfactionTrendDto {
  date: string; // ISO date string
  overallSatisfaction: number | null;
  cleanlinessRating: number | null;
  staffRating: number | null;
  facilitiesRating: number | null;
  communicationRating: number | null;
  responseCount: number | null;
  trendDirection: 'UP' | 'DOWN' | 'STABLE' | string;
}
