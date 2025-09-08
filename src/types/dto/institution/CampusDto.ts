import { DistrictSummaryDto } from "../location/DistrictSummaryDto";
import { ProvinceSummaryDto } from "../location/ProvinceSummaryDto";
import { CountrySummaryDto } from "../location/CountrySummaryDto";
import { LocationHierarchyDto } from "../location/LocationHierarchyDto";
import { CampusSummaryDto } from "./CampusSummaryDto";
import { BrandSummaryDto } from "./BrandSummaryDto";

export interface CampusDto {
  /** Format: int64 */
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
  /** Format: double */
  latitude?: number;
  /** Format: double */
  longitude?: number;
  location?: LocationHierarchyDto;
  facebookUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  /** Format: int64 */
  viewCount?: number;
  /** Format: double */
  ratingAverage?: number;
  /** Format: int64 */
  ratingCount?: number;
  campuses?: CampusSummaryDto[];
  isActive?: boolean;
  /** Format: date-time */
  createdAt?: string;
  /** Format: int32 */
  establishedYear?: number;
  isSubscribed?: boolean;
  brand?: BrandSummaryDto;
}
