export interface SubscriptionUsageDto {
  subscriptionId?: number;
  campusName?: string;
  planName?: string;
  schoolsUsed?: number;
  schoolsLimit?: number;
  schoolsUsagePercentage?: number;
  usersUsed?: number;
  usersLimit?: number;
  usersUsagePercentage?: number;
  appointmentsThisMonth?: number;
  appointmentsLimit?: number;
  appointmentsUsagePercentage?: number;
  galleryItemsUsed?: number;
  galleryItemsLimit?: number;
  galleryItemsUsagePercentage?: number;
  postsThisMonth?: number;
  postsLimit?: number;
  postsUsagePercentage?: number;
}
