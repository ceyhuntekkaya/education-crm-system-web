export interface CampaignAnalyticsDto {
  campaignId?: number;
  campaignTitle?: string;
  campaignType?: string;
  startDate?: string;
  endDate?: string;
  totalViews?: number;
  totalClicks?: number;
  totalApplications?: number;
  totalConversions?: number;
  clickThroughRate?: number;
  conversionRate?: number;
  applicationToConversionRate?: number;
  totalRevenueGenerated?: number;
  totalDiscountGiven?: number;
  averageOrderValue?: number;
  returnOnInvestment?: number;
}
