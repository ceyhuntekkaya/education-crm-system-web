export interface SchoolStatisticsDto {
  totalViews?: number;
  monthlyViews?: number;
  weeklyViews?: number;
  dailyViews?: number;
  totalAppointments?: number;
  completedAppointments?: number;
  totalInquiries?: number;
  totalEnrollments?: number;
  conversionRate?: number;
  appointmentConversionRate?: number;
  ratingAverage?: number;
  ratingCount?: number;
  ratingDistribution?: Record<string, number>;
  socialMediaFollowers?: number;
  socialMediaPosts?: number;
  socialMediaLikes?: number;
}
