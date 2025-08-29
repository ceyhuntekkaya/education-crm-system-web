import { CampusSummaryDto } from './CampusSummaryDto';

export interface BrandDto {
  id?: number;
  name?: string;
  slug?: string;
  description?: string;
  logoUrl?: string;
  coverImageUrl?: string;
  websiteUrl?: string;
  email?: string;
  phone?: string;
  foundedYear?: number;
  facebookUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  viewCount?: number;
  ratingAverage?: number;
  ratingCount?: number;
  campuses?: CampusSummaryDto[];
  isActive?: boolean;
  createdAt?: string;
}
