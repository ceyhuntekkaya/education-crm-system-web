export interface CampaignContentDto {
  /** Format: int64 */
  id?: number;
  /** Format: int64 */
  campaignId?: number;
  campaignTitle?: string;
  /** @enum {string} */
  contentType?:
    | "BANNER_IMAGE"
    | "THUMBNAIL_IMAGE"
    | "HERO_IMAGE"
    | "GALLERY_IMAGE"
    | "PROMOTIONAL_VIDEO"
    | "TESTIMONIAL_VIDEO"
    | "INFOGRAPHIC"
    | "BROCHURE"
    | "FLYER"
    | "POSTER"
    | "SOCIAL_MEDIA_POST"
    | "EMAIL_HEADER"
    | "WEB_BANNER"
    | "MOBILE_BANNER"
    | "STORY_TEMPLATE"
    | "LOGO_VARIATION"
    | "ICON"
    | "BACKGROUND_IMAGE"
    | "PATTERN"
    | "WATERMARK"
    | "AUDIO_AD"
    | "JINGLE"
    | "PRESENTATION"
    | "DOCUMENT"
    | "CERTIFICATE"
    | "BADGE"
    | "STICKER"
    | "GIF_ANIMATION"
    | "INTERACTIVE_CONTENT"
    | "AR_CONTENT"
    | "VR_CONTENT"
    | "THREE_D_MODEL"
    | "OTHER";
  title?: string;
  content?: string;
  mediaUrl?: string;
  thumbnailUrl?: string;
  altText?: string;
  caption?: string;
  /** Format: int64 */
  fileSizeBytes?: number;
  mimeType?: string;
  /** Format: int32 */
  durationSeconds?: number;
  dimensions?: string;
  /** @enum {string} */
  usageContext?:
    | "WEBSITE_HOMEPAGE"
    | "SCHOOL_PAGE"
    | "CAMPAIGN_PAGE"
    | "PRICING_PAGE"
    | "EMAIL_CAMPAIGN"
    | "SMS_CAMPAIGN"
    | "SOCIAL_MEDIA"
    | "PRINT_MEDIA"
    | "OUTDOOR_ADVERTISING"
    | "RADIO"
    | "TV"
    | "MOBILE_APP"
    | "PUSH_NOTIFICATION"
    | "SEARCH_ADS"
    | "DISPLAY_ADS"
    | "VIDEO_ADS"
    | "INFLUENCER_CONTENT"
    | "PARTNERSHIP_CONTENT"
    | "EVENT_MATERIAL"
    | "PRESENTATION"
    | "BROCHURE"
    | "NEWSLETTER"
    | "BLOG_POST"
    | "CASE_STUDY"
    | "TESTIMONIAL"
    | "FAQ"
    | "LANDING_PAGE"
    | "POPUP"
    | "BANNER"
    | "SIDEBAR"
    | "FOOTER"
    | "OTHER";
  /** Format: int32 */
  sortOrder?: number;
  isPrimary?: boolean;
  languageCode?: string;
  hashtags?: string;
  mentionAccounts?: string;
  socialMediaPlatforms?: string;
  variantName?: string;
  isTestVariant?: boolean;
  /** Format: int64 */
  viewCount?: number;
  /** Format: int64 */
  clickCount?: number;
  /** Format: int64 */
  downloadCount?: number;
  /** Format: int64 */
  shareCount?: number;
  /** Format: double */
  engagementRate?: number;
  /** @enum {string} */
  approvalStatus?:
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "NEEDS_REVISION"
    | "IN_REVIEW"
    | "EXPIRED"
    | "ARCHIVED";
  approvedByUserName?: string;
  /** Format: date-time */
  approvedAt?: string;
  rejectionReason?: string;
  copyrightOwner?: string;
  licenseType?: string;
  usageRights?: string;
  attributionRequired?: boolean;
  attributionText?: string;
  /** Format: date-time */
  createdAt?: string;
  /** Format: date-time */
  updatedAt?: string;
}
