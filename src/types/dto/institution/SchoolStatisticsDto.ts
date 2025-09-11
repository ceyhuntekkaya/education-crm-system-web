import { KeyDataNumber } from "@/types/key-data-number";

export interface SchoolStatisticsDto {
  /** Format: int64 */
  totalViews?: number;
  /** Format: int64 */
  monthlyViews?: number;
  /** Format: int64 */
  weeklyViews?: number;
  /** Format: int64 */
  dailyViews?: number;
  /** Format: int64 */
  totalAppointments?: number;
  /** Format: int64 */
  completedAppointments?: number;
  /** Format: int64 */
  totalInquiries?: number;
  /** Format: int64 */
  totalEnrollments?: number;
  /** Format: double */
  conversionRate?: number;
  /** Format: double */
  appointmentConversionRate?: number;
  /** Format: double */
  ratingAverage?: number;
  /** Format: int64 */
  ratingCount?: number;
  ratingDistribution?: KeyDataNumber;
  /** Format: int64 */
  socialMediaFollowers?: number;
  /** Format: int64 */
  socialMediaPosts?: number;
  /** Format: int64 */
  socialMediaLikes?: number;
}
