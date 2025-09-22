export interface BrandSummaryDto {
  /** Format: int64 */
  id?: number;
  name?: string;
  slug?: string;
  logoUrl?: string;
  /** Format: double */
  ratingAverage?: number;
  /** Format: int32 */
  campusCount?: number;
  /** Format: int32 */
  schoolCount?: number;
}
