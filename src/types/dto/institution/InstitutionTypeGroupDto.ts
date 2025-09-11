export interface InstitutionTypeGroupDto {
  id?: number;
  name?: string;
  displayName?: string;
  description?: string;
  iconUrl?: string;
  colorCode?: string;
  sortOrder?: number;
  defaultProperties?: string;
  isActive?: boolean;
  createdAt?: string; // ISO date string
}
