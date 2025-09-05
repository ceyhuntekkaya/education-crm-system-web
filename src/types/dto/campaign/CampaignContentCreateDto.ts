export interface CampaignContentCreateDto {
  campaignId?: number;
  contentType?: string;
  title?: string;
  content?: string;
  mediaUrl?: string;
  thumbnailUrl?: string;
  altText?: string;
  caption?: string;
  fileSizeBytes?: number;
  mimeType?: string;
  durationSeconds?: number;
  dimensions?: string;
  usageContext?: string;
  sortOrder?: number;
  isPrimary?: boolean;
  languageCode?: string;
  hashtags?: string;
  mentionAccounts?: string;
  socialMediaPlatforms?: string;
  variantName?: string;
  isTestVariant?: boolean;
}
