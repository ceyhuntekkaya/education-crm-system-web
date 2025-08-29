export interface CountryDto {
  id?: number;
  name?: string;
  nameEn?: string;
  isoCode2?: string;
  isoCode3?: string;
  phoneCode?: string;
  currencyCode?: string;
  currencySymbol?: string;
  flagEmoji?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  isSupported?: boolean;
  sortOrder?: number;
  isActive?: boolean;
  createdAt?: string;
}
