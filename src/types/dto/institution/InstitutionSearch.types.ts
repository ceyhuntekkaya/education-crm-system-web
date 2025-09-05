import { PageableObject, SortObject } from "../../api/api-general.types";
import { CampaignSummaryDto } from "./CampaignSummaryDto";
import { InstitutionPropertyValueDto } from "./InstitutionPropertyValueDto";

// API Response Types
export interface ApiResponsePageSchoolSearchResultDto {
  success?: boolean;
  message?: string;
  data?: PageSchoolSearchResultDto;
  errors?: string[];
  /** Format: date-time */
  timestamp?: string;
  path?: string;
}

export interface PageSchoolSearchResultDto {
  /** Format: int64 */
  totalElements?: number;
  /** Format: int32 */
  totalPages?: number;
  first?: boolean;
  last?: boolean;
  /** Format: int32 */
  size?: number;
  content?: SchoolSearchResultDto[];
  /** Format: int32 */
  number?: number;
  sort?: SortObject;
  /** Format: int32 */
  numberOfElements?: number;
  pageable?: PageableObject;
  empty?: boolean;
}

export interface SchoolSearchResultDto {
  /** Format: int64 */
  id?: number;
  name?: string;
  slug?: string;
  logoUrl?: string;
  coverImageUrl?: string;
  description?: string;
  institutionTypeName?: string;
  institutionTypeIcon?: string;
  institutionTypeColor?: string;
  /** Format: int32 */
  minAge?: number;
  /** Format: int32 */
  maxAge?: number;
  ageRange?: string;
  /** Format: double */
  monthlyFee?: number;
  formattedPrice?: string;
  /** Format: double */
  ratingAverage?: number;
  /** Format: int64 */
  ratingCount?: number;
  campusName?: string;
  address?: string;
  district?: string;
  city?: string;
  /** Format: double */
  distanceKm?: number;
  highlights?: string[];
  cardProperties?: InstitutionPropertyValueDto[];
  activeCampaigns?: CampaignSummaryDto[];
  hasActiveCampaigns?: boolean;
  isSubscribed?: boolean;
  isFavorite?: boolean;
}
