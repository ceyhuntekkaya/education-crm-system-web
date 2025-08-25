export interface CampaignContentDto {
  id?: number;
  campaignId?: number;
  campaignTitle?: string;
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
}
