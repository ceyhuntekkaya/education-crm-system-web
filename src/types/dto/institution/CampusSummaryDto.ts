import { DistrictSummaryDto } from "../location/DistrictSummaryDto";
import { ProvinceSummaryDto } from "../location/ProvinceSummaryDto";

export interface CampusSummaryDto {
  /** Format: int64 */
  id?: number;
  name?: string;
  slug?: string;
  logoUrl?: string;
  province?: ProvinceSummaryDto;
  district?: DistrictSummaryDto;
  /** Format: double */
  ratingAverage?: number;
  /** Format: int64 */
  schoolCount?: number;
  isSubscribed?: boolean;
}
