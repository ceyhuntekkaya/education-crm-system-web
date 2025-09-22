export interface SchoolSummaryDto {
  /** Format: int64 */
  id?: number;
  name?: string;
  slug?: string;
  logoUrl?: string;
  institutionTypeName?: string;
  /** Format: int32 */
  minAge?: number;
  /** Format: int32 */
  maxAge?: number;
  /** Format: double */
  monthlyFee?: number;
  /** Format: double */
  ratingAverage?: number;
  /** Format: int64 */
  ratingCount?: number;
  hasActiveCampaigns?: boolean;
}
