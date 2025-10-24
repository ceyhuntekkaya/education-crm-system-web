export interface BrandCreateDto {
  name: string;
  description?: string;
  logoUrl?: string;
  coverImageUrl?: string;
  websiteUrl?: string;
  email?: string;
  phone?: string;
  foundedYear?: number;

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
}
