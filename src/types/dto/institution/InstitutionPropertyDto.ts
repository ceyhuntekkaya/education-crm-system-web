import { InstitutionTypeSummaryDto } from './InstitutionTypeSummaryDto';

export interface InstitutionPropertyDto {
  id?: number;
  name?: string;
  displayName?: string;
  description?: string;
  dataType?: string;
  isRequired?: boolean;
  isSearchable?: boolean;
  isFilterable?: boolean;
  showInCard?: boolean;
  showInProfile?: boolean;
  sortOrder?: number;
  options?: string;
  defaultValue?: string;
  minValue?: number;
  maxValue?: number;
  minLength?: number;
  maxLength?: number;
  regexPattern?: string;
  institutionType?: InstitutionTypeSummaryDto;
  isActive?: boolean;
  createdAt?: string;
}
