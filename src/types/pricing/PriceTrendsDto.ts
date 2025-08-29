import { PriceTrendPoint } from "./PriceTrendPoint";

export interface PriceTrendsDto {
  history?: any[];
  startDate?: string;
  endDate?: string;
  trendPoints?: PriceTrendPoint[];
}
