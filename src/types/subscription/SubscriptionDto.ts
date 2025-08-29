export interface SubscriptionDto {
  id?: number;
  status?: string;
  startDate?: string;
  endDate?: string;
  trialEndDate?: string;
  nextBillingDate?: string;
  price?: number;
  currency?: string;
  discountAmount?: number;
  discountPercentage?: number;
  couponCode?: string;
  autoRenew?: boolean;
  canceledAt?: string;
  cancellationReason?: string;
  gracePeriodEnd?: string;
  currentSchoolsCount?: number;
  currentUsersCount?: number;
  currentMonthAppointments?: number;
  currentGalleryItems?: number;
}
