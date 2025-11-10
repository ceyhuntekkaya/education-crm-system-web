import { SchoolDto } from "./SchoolDto";
import { CampusDto } from "./CampusDto";
import { BrandDto } from "./BrandDto";
import { InstitutionPropertyValueDto } from "./InstitutionPropertyValueDto";
import { SchoolPricingDto, CustomFeeDto } from "../pricing";
import { CampaignDto } from "../campaign";
import { SchoolStatisticsDto } from "./SchoolStatisticsDto";

export interface SchoolDetailDto {
  school?: SchoolDto;
  campus?: CampusDto;
  brand?: BrandDto;
  allProperties?: InstitutionPropertyValueDto[];
  pricings?: SchoolPricingDto[];
  customFees?: CustomFeeDto[];
  activeCampaigns?: CampaignDto[];
  statistics?: SchoolStatisticsDto;
}
