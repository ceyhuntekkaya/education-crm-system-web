export interface SubscriptionHealthDto {
  subscriptionId?: number;
  campusName?: string;
  healthScore?: string;
  healthScoreValue?: number;
  paymentHealth?: string;
  usageHealth?: string;
  supportHealth?: string;
  engagementHealth?: string;
  riskFactors?: string[];
  churnRisk?: string;
  churnProbability?: number;
  healthRecommendations?: string[];
  actionItems?: string[];
  healthTrend?: string;
  lastHealthCheck?: string;
}
