import { CampaignSummaryDto } from "../campaign";
import { PricingSummaryDto } from "../pricing";
import { CampusSummaryDto } from "./CampusSummaryDto";
import { InstitutionPropertyValueDto } from "./InstitutionPropertyValueDto";
import { InstitutionTypeDto } from "./InstitutionTypeDto";

export interface SchoolDto {
  /** Format: int64 */
  id?: number;
  name?: string;
  slug?: string;
  description?: string;
  logoUrl?: string;
  coverImageUrl?: string;
  email?: string;
  phone?: string;
  extension?: string;
  /** Format: int32 */
  minAge?: number;
  /** Format: int32 */
  maxAge?: number;
  /** Format: int32 */
  capacity?: number;
  /** Format: int32 */
  currentStudentCount?: number;
  /** Format: int32 */
  classSizeAverage?: number;
  curriculumType?: string;
  languageOfInstruction?: string;
  foreignLanguages?: string;
  /** Format: double */
  registrationFee?: number;
  /** Format: double */
  monthlyFee?: number;
  /** Format: double */
  annualFee?: number;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  facebookUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
  /** Format: int64 */
  viewCount?: number;
  /** Format: double */
  ratingAverage?: number;
  /** Format: int64 */
  ratingCount?: number;
  /** Format: int64 */
  likeCount?: number;
  /** Format: int64 */
  postCount?: number;
  campus?: CampusSummaryDto;
  institutionType?: InstitutionTypeDto;
  propertyValues?: InstitutionPropertyValueDto[];
  pricings?: PricingSummaryDto[];
  activeCampaigns?: CampaignSummaryDto[];
  isActive?: boolean;
  /** Format: date-time */
  createdAt?: string;
}
