export interface InstitutionPropertyCreateDto {
  institutionTypeId?: number;
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
}
