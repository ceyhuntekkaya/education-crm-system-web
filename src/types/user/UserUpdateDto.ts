export interface UserUpdateDto {
  firstName: string;
  lastName: string;
  phone: string;
  profileImageUrl: string;
  countryId: number;
  provinceId: number;
  districtId: number;
  neighborhoodId: number;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
  preferredLanguage: string;
  timezone: string;
}
