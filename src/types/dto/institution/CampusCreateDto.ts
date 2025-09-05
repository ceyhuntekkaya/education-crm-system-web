import { CountrySummaryDto } from '../location/CountrySummaryDto';
import { ProvinceSummaryDto } from '../location/ProvinceSummaryDto';
import { DistrictSummaryDto } from '../location/DistrictSummaryDto';
import { NeighborhoodSummaryDto } from '../location/NeighborhoodSummaryDto';

export interface CampusCreateDto {
  brandId?: number;
  name?: string;
  description?: string;
  logoUrl?: string;
  coverImageUrl?: string;
  email?: string;
  phone?: string;
  fax?: string;
  websiteUrl?: string;
  addressLine1?: string;
  addressLine2?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  country?: CountrySummaryDto;
  province?: ProvinceSummaryDto;
  district?: DistrictSummaryDto;
  neighborhood?: NeighborhoodSummaryDto;
  facebookUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  establishedYear?: number;
}
