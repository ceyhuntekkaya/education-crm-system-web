/**
 * Favori filtre hook'u için tip tanımları
 */

export interface FavFilterSyncReturn {
  isInitialized: boolean;
}

export interface PropertyType {
  id: number;
  name: string;
  displayName: string;
  description: string;
  dataType: string;
  isRequired: boolean;
  isSearchable: boolean;
  isFilterable: boolean;
  showInCard: boolean;
  showInProfile: boolean;
  sortOrder: number;
  options: any;
  defaultValue: string;
  minValue: number | null;
  maxValue: number | null;
  minLength: number | null;
  maxLength: number | null;
  regexPattern: string | null;
  institutionType: {
    id: number;
    name: string;
    displayName: string;
    iconUrl: string;
    colorCode: string;
    schoolCount: number | null;
  };
  isActive: boolean;
  createdAt: string;
  isSelected?: boolean;
}

export interface PropertyGroupType {
  id: number;
  name: string;
  displayName: string;
  propertyGroupTypeId: number;
  isActive: boolean;
  createdAt: string;
  propertyTypes?: PropertyType[];
}

export interface PropertyGroupTypeDto {
  id: number;
  name: string;
  displayName: string;
  institutionTypeId: number;
  isActive: boolean;
  createdAt: string;
  propertyTypes: PropertyGroupType[];
}

export interface InstitutionTypeDto {
  id: number;
  name: string;
  displayName: string;
  description: string;
  iconUrl: string;
  colorCode: string;
  sortOrder: number;
  defaultProperties: string;
  properties: PropertyType[];
  isActive: boolean;
  createdAt: string;
}

export interface PropertyFilter {
  institutionTypeDto: InstitutionTypeDto;
  propertyGroupTypeDtos: PropertyGroupTypeDto[];
}

export interface FavSearchFilter {
  searchTerm: string;
  minAge: number;
  maxAge: number;
  minFee: number;
  maxFee: number;
  curriculumType: string;
  languageOfInstruction: string;
  institutionTypeIds?: number | number[]; // Hem tek değer hem array olabilir
  countryId: number;
  provinceId: number;
  minRating: string;
  propertyFilters: PropertyFilter[];
  sortBy: string;
  sortDirection: string;
  page: number;
  size: number;
}

export type MockFavSearchParams = FavSearchFilter[];
