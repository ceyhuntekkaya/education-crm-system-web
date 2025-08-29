import { CountrySummaryDto } from './CountrySummaryDto';
import { ProvinceSummaryDto } from './ProvinceSummaryDto';
import { DistrictSummaryDto } from './DistrictSummaryDto';
import { NeighborhoodSummaryDto } from './NeighborhoodSummaryDto';

export interface LocationHierarchyDto {
  country?: CountrySummaryDto;
  province?: ProvinceSummaryDto;
  district?: DistrictSummaryDto;
  neighborhood?: NeighborhoodSummaryDto;
}
