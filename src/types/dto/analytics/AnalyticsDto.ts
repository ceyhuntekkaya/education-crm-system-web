import { BrandSummaryDto } from '../institution/BrandSummaryDto';
import { CampusSummaryDto } from '../institution/CampusSummaryDto';
import { SchoolSummaryDto } from '../institution/SchoolSummaryDto';

export interface AnalyticsDto {
  /** Format: int64 */
  id?: number;
  /** Format: date */
  date?: string;
  /** @enum {string} */
  metricType?: "TRAFFIC" | "ENGAGEMENT" | "CONVERSION" | "PERFORMANCE" | "FINANCIAL" | "CONTENT" | "USER_BEHAVIOR" | "SEARCH" | "APPOINTMENT" | "SURVEY" | "SUBSCRIPTION" | "SYSTEM";
  /** @enum {string} */
  timePeriod?: "HOURLY" | "DAILY" | "WEEKLY" | "MONTHLY" | "QUARTERLY" | "YEARLY" | "REAL_TIME";
  /** Format: int64 */
  pageViews?: number;
  /** Format: int64 */
  uniqueVisitors?: number;
  /** Format: int64 */
  newVisitors?: number;
  /** Format: int64 */
  returningVisitors?: number;
  /** Format: double */
  bounceRate?: number;
  /** Format: int32 */
  averageSessionDurationSeconds?: number;
  /** Format: double */
  pagesPerSession?: number;
  /** Format: int64 */
  directTraffic?: number;
  /** Format: int64 */
  organicSearchTraffic?: number;
  /** Format: int64 */
  paidSearchTraffic?: number;
  /** Format: int64 */
  socialMediaTraffic?: number;
  /** Format: int64 */
  referralTraffic?: number;
  /** Format: int64 */
  emailTraffic?: number;
  /** Format: int64 */
  mobileVisitors?: number;
  /** Format: int64 */
  desktopVisitors?: number;
  /** Format: int64 */
  tabletVisitors?: number;
  /** Format: int64 */
  localVisitors?: number;
  /** Format: int64 */
  nationalVisitors?: number;
  /** Format: int64 */
  internationalVisitors?: number;
  /** Format: int64 */
  appointmentRequests?: number;
  /** Format: int64 */
  appointmentConfirmations?: number;
  /** Format: int64 */
  appointmentCompletions?: number;
  /** Format: int64 */
  messageInquiries?: number;
  /** Format: int64 */
  phoneClicks?: number;
  /** Format: int64 */
  emailClicks?: number;
  /** Format: int64 */
  directionClicks?: number;
  /** Format: int64 */
  brochureDownloads?: number;
  /** Format: int64 */
  galleryViews?: number;
  /** Format: int64 */
  videoViews?: number;
  /** Format: int64 */
  socialMediaClicks?: number;
  /** Format: int64 */
  postViews?: number;
  /** Format: int64 */
  postLikes?: number;
  /** Format: int64 */
  postComments?: number;
  /** Format: int64 */
  postShares?: number;
  /** Format: int64 */
  internalSearches?: number;
  /** Format: int64 */
  zeroResultSearches?: number;
  /** Format: double */
  searchToAppointmentRate?: number;
  /** Format: double */
  conversionRate?: number;
  /** Format: double */
  appointmentConversionRate?: number;
  /** Format: double */
  inquiryConversionRate?: number;
  /** Format: double */
  enrollmentConversionRate?: number;
  /** Format: int64 */
  campaignViews?: number;
  /** Format: int64 */
  campaignClicks?: number;
  /** Format: int64 */
  campaignApplications?: number;
  /** Format: int64 */
  campaignConversions?: number;
  /** Format: int64 */
  promoCodeUsage?: number;
  discountAmountUsed?: number;
  /** Format: double */
  averageRating?: number;
  /** Format: int64 */
  totalRatings?: number;
  /** Format: int64 */
  surveyResponses?: number;
  /** Format: double */
  surveyCompletionRate?: number;
  /** Format: int32 */
  pageLoadTimeMs?: number;
  /** Format: int32 */
  serverResponseTimeMs?: number;
  /** Format: double */
  errorRate?: number;
  /** Format: double */
  uptimePercentage?: number;
  revenue?: number;
  /** Format: int64 */
  newSubscriptions?: number;
  /** Format: int64 */
  canceledSubscriptions?: number;
  /** Format: int64 */
  subscriptionRenewals?: number;
  /** Format: double */
  churnRate?: number;
  /** Format: double */
  visitorsGrowthRate?: number;
  /** Format: double */
  appointmentsGrowthRate?: number;
  /** Format: double */
  inquiriesGrowthRate?: number;
  /** Format: double */
  ratingChange?: number;
  customMetrics?: string;
  dataSource?: string;
  /** Format: date-time */
  lastCalculatedAt?: string;
  /** Format: int64 */
  calculationDurationMs?: number;
  brand?: BrandSummaryDto;
  campus?: CampusSummaryDto;
  school?: SchoolSummaryDto;
  isActive?: boolean;
  /** Format: date-time */
  createdAt?: string;
};
