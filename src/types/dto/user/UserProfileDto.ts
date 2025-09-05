export interface UserProfileDto {
  id: number;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  profileImageUrl: string;
  countryId: number;
  countryName: string;
  provinceId: number;
  provinceName: string;
  districtId: number;
  districtName: string;
  neighborhoodId: number;
  neighborhoodName: string;
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
