import { DistrictSummaryDto } from '../location/DistrictSummaryDto';
import { ProvinceSummaryDto } from '../location/ProvinceSummaryDto';
import { CountrySummaryDto } from '../location/CountrySummaryDto';
import { LocationHierarchyDto } from '../location/LocationHierarchyDto';

export interface CampusDto {
  id?: number;
  name?: string;
  slug?: string;
  description?: string;
  logoUrl?: string;
  coverImageUrl?: string;
  email?: string;
  phone?: string;
  fax?: string;
  websiteUrl?: string;
  addressLine1?: string;
  addressLine2?: string;
  district?: DistrictSummaryDto;
  province?: ProvinceSummaryDto;
  postalCode?: string;
  country?: CountrySummaryDto;
  latitude?: number;
  longitude?: number;
  location?: LocationHierarchyDto;
  facebookUrl?: string;
}
