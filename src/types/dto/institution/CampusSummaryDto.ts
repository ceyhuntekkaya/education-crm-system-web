import { DistrictSummaryDto } from "../location/DistrictSummaryDto";
import { NeighborhoodSummaryDto } from "../location/NeighborhoodSummaryDto";
import { ProvinceSummaryDto } from "../location/ProvinceSummaryDto";

export interface CampusSummaryDto {
  /** Format: int64 */
  id?: number;
  name?: string;
  slug?: string;
  logoUrl?: string;
  province?: ProvinceSummaryDto;
  district?: DistrictSummaryDto;
  neighborhood?: NeighborhoodSummaryDto;
  /** Format: double */
  ratingAverage?: number;
  /** Format: int64 */
  schoolCount?: number;
  isSubscribed?: boolean;
}
