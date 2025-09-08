import { CampusSummaryDto } from "./CampusSummaryDto";

export interface BrandDto {
  /** Format: int64 */
  id?: number;
  name?: string;
  slug?: string;
  description?: string;
  logoUrl?: string;
  coverImageUrl?: string;
  websiteUrl?: string;
  email?: string;
  phone?: string;
  /** Format: int32 */
  foundedYear?: number;
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
}
