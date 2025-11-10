import { InstitutionPropertyValueDto } from "./InstitutionPropertyValueDto";
import { CampaignSummaryDto } from "./CampaignSummaryDto";

export interface SchoolSearchResultDto {
  id?: number;
  name?: string;
  slug?: string;
  logoUrl?: string;
  coverImageUrl?: string;
  description?: string;
  institutionTypeName?: string;
  institutionTypeIcon?: string;
  institutionTypeColor?: string;
  minAge?: number;
  maxAge?: number;
  ageRange?: string;
  monthlyFee?: number;
  formattedPrice?: string;
  ratingAverage?: number;
  ratingCount?: number;
  campusName?: string;
  address?: string;
  district?: string;
  city?: string;
  distanceKm?: number;
  highlights?: string[];
  cardProperties?: InstitutionPropertyValueDto[];
  activeCampaigns?: CampaignSummaryDto[];
  hasActiveCampaigns?: boolean;
  isSubscribed?: boolean;
  isFavorite?: boolean;
  // Appointment bilgileri
  appointment?: {
    isActiveAppointment?: boolean;
    appointmentDate?: string | null;
  };
  // Notlar için
  isActiveNotes?: boolean;
  // Properties (institution type ve property group bilgileri)
  properties?: {
    institutionTypeDto?: any;
    propertyGroupTypeDtos?: any[];
  };
}
