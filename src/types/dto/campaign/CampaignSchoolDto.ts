export interface CampaignSchoolDto {
  /** Format: int64 */
  id?: number;
  /** Format: int64 */
  campaignId?: number;
  campaignTitle?: string;
  /** Format: int64 */
  schoolId?: number;
  schoolName?: string;
  campusName?: string;
  assignedByUserName?: string;
  /** Format: date-time */
  assignedAt?: string;
  /** @enum {string} */
  status?:
    | "PENDING"
    | "ACTIVE"
    | "PAUSED"
    | "REJECTED"
    | "EXPIRED"
    | "COMPLETED"
    | "REMOVED";
  customDiscountAmount?: number;
  /** Format: double */
  customDiscountPercentage?: number;
  /** Format: int32 */
  customUsageLimit?: number;
  /** Format: date */
  customStartDate?: string;
  /** Format: date */
  customEndDate?: string;
  customTerms?: string;
  /** Format: int32 */
  priority?: number;
  isFeaturedOnSchool?: boolean;
  showOnHomepage?: boolean;
  showOnPricingPage?: boolean;
  /** Format: int32 */
  usageCount?: number;
  /** Format: int32 */
  applicationCount?: number;
  /** Format: int32 */
  conversionCount?: number;
  revenueGenerated?: number;
  /** Format: int64 */
  viewCount?: number;
  /** Format: int64 */
  clickCount?: number;
  /** Format: int64 */
  inquiryCount?: number;
  /** Format: int64 */
  appointmentCount?: number;
  approvedBySchool?: boolean;
  approvedBySchoolUserName?: string;
  /** Format: date-time */
  approvedBySchoolAt?: string;
  schoolNotes?: string;
  effectiveDiscount?: string;
  effectivePeriod?: string;
  /** Format: double */
  performanceScore?: number;
}
