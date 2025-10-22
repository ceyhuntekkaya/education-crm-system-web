import { DistrictSummaryDto } from "../location/DistrictSummaryDto";
import { ProvinceSummaryDto } from "../location/ProvinceSummaryDto";
import { CountrySummaryDto } from "../location/CountrySummaryDto";
import { LocationHierarchyDto } from "../location/LocationHierarchyDto";
import { CampusSummaryDto } from "./CampusSummaryDto";
import { BrandSummaryDto } from "./BrandSummaryDto";

export interface CampusDto {
  id: number;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  coverImageUrl?: string;

  // Contact Information
  email?: string;
  phone?: string;
  fax?: string;
  websiteUrl?: string;

  // Address Information
  addressLine1?: string;
  addressLine2?: string;
  district?: DistrictSummaryDto;
  province?: ProvinceSummaryDto;
  postalCode?: string;
  country?: CountrySummaryDto;
  latitude?: number;
  longitude?: number;

  // Location details
  location?: LocationHierarchyDto;

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

  // Statistics
  viewCount?: number;
  ratingAverage?: number;
  ratingCount?: number;

  // Relationships
  campuses?: CampusSummaryDto[];
  brand?: BrandSummaryDto;
  isActive: boolean;
  createdAt: string; // ISO datetime string

  establishedYear?: number;
  isSubscribed?: boolean;
}
