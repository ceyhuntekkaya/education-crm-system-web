import {
  CampaignContentType,
  ContentApprovalStatus,
  ContentUsageContext,
} from "@/enums";

export interface CampaignContentDto {
  id: number;
  campaignId: number;
  campaignTitle: string;
  contentType: CampaignContentType;
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
  usageContext?: ContentUsageContext;
  sortOrder?: number;
  isPrimary: boolean;
  languageCode?: string;

  // Social media specific
  hashtags?: string;
  mentionAccounts?: string;
  socialMediaPlatforms?: string;

  // A/B testing
  variantName?: string;
  isTestVariant?: boolean;

  // Performance tracking
  viewCount?: number;
  clickCount?: number;
  downloadCount?: number;
  shareCount?: number;
  engagementRate?: number;

  // Content approval
  approvalStatus: ContentApprovalStatus;
  approvedByUserName?: string;
  approvedAt?: string; // ISO datetime string
  rejectionReason?: string;

  // Copyright and licensing
  copyrightOwner?: string;
  licenseType?: string;
  usageRights?: string;
  attributionRequired?: boolean;
  attributionText?: string;

  // Metadata
  createdAt: string; // ISO datetime string
  updatedAt: string; // ISO datetime string
}
