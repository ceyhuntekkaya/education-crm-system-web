import { CountrySummaryDto } from "../location/CountrySummaryDto";
import { ProvinceSummaryDto } from "../location/ProvinceSummaryDto";
import { DistrictSummaryDto } from "../location/DistrictSummaryDto";
import { NeighborhoodSummaryDto } from "../location/NeighborhoodSummaryDto";

export interface CampusCreateDto {
  brandId: number;
  name: string;
  description?: string;
  logoUrl?: string;
  coverImageUrl?: string;
  email?: string;
  phone?: string;
  fax?: string;
  websiteUrl?: string;

  // Address
  addressLine1?: string;
  addressLine2?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;

  // Location IDs
  country?: CountrySummaryDto | null;
  province?: ProvinceSummaryDto | null;
  district?: DistrictSummaryDto | null;
  neighborhood?: NeighborhoodSummaryDto | null;

  // Social Media
  facebookUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;

  // SEO
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;

  establishedYear?: number;
}
