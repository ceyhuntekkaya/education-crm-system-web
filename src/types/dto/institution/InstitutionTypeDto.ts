import { InstitutionPropertyDto } from './InstitutionPropertyDto';

export interface InstitutionTypeDto {
  id?: number;
  name?: string;
  displayName?: string;
  description?: string;
  iconUrl?: string;
  colorCode?: string;
  sortOrder?: number;
  defaultProperties?: string;
  properties?: InstitutionPropertyDto[];
  isActive?: boolean;
  createdAt?: string;
}
