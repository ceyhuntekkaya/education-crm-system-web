import { SchoolDto } from './SchoolDto';
import { CampusDto } from './CampusDto';
import { BrandDto } from './BrandDto';
import { InstitutionPropertyValueDto } from './InstitutionPropertyValueDto';

export interface SchoolDetailDto {
  school?: SchoolDto;
  campus?: CampusDto;
  brand?: BrandDto;
  allProperties?: InstitutionPropertyValueDto[];
  pricings?: any[];
  activeCampaigns?: any[];
  statistics?: any;
}
