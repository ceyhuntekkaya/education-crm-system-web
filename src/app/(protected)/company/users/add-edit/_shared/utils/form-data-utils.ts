import {
  UserProfileDto,
  UserRegistrationDto,
  UserUpdateDto,
  UserDto,
} from "@/types";

/**
 * Convert UserDto to UserProfileDto for form data
 * UserDto'dan firstName ve lastName çıkarır
 */
export const userDtoToProfileDto = (
  user: UserDto | null
): UserProfileDto | null => {
  if (!user) return null;

  // fullName'den firstName ve lastName'i ayır
  const nameParts = (user.fullName || "").trim().split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  return {
    id: user.id,
    email: user.email,
    phone: user.phone,
    firstName,
    lastName,
    profileImageUrl: user.profileImageUrl,
    countryId: user.country?.id,
    countryName: user.country?.name,
    provinceId: user.province?.id,
    provinceName: user.province?.name,
    districtId: user.district?.id,
    districtName: user.district?.name,
    neighborhoodId: user.neighborhood?.id,
    neighborhoodName: user.neighborhood?.name,
    addressLine1: user.addressLine1,
    addressLine2: user.addressLine2,
    postalCode: user.postalCode,
    latitude: user.latitude,
    longitude: user.longitude,
    emailNotifications: true, // Default değerler
    smsNotifications: true,
    marketingEmails: false,
    preferredLanguage: "tr",
    timezone: "Europe/Istanbul",
  };
};

/**
 * Convert UserProfileDto to form data for editing
 */
export const userToFormData = (
  user: UserProfileDto | null
): Partial<UserProfileDto> => {
  if (!user) return {};

  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    profileImageUrl: user.profileImageUrl,
    countryId: user.countryId,
    provinceId: user.provinceId,
    districtId: user.districtId,
    neighborhoodId: user.neighborhoodId,
    addressLine1: user.addressLine1,
    addressLine2: user.addressLine2,
    postalCode: user.postalCode,
    latitude: user.latitude,
    longitude: user.longitude,
    emailNotifications: user.emailNotifications,
    smsNotifications: user.smsNotifications,
    marketingEmails: user.marketingEmails,
    preferredLanguage: user.preferredLanguage,
    timezone: user.timezone,
  };
};

/**
 * Convert form data to UserUpdateDto
 */
export const formDataToUpdateDto = (formData: any): UserUpdateDto => {
  return {
    firstName: formData.firstName,
    lastName: formData.lastName,
    phone: formData.phone,
    profileImageUrl: formData.profileImageUrl,
    // AuthUser'dan gelen veriler
    countryId: formData.countryId,
    provinceId: formData.provinceId,
    districtId: formData.districtId,
    neighborhoodId: formData.neighborhoodId,
    addressLine1: formData.addressLine1,
    addressLine2: formData.addressLine2,
    postalCode: formData.postalCode,
    latitude: formData.latitude,
    longitude: formData.longitude,
    // Bildirim tercihleri
    emailNotifications: formData.emailNotifications,
    smsNotifications: formData.smsNotifications,
    marketingEmails: formData.marketingEmails,
    // Dil ve zaman dilimi
    preferredLanguage: formData.preferredLanguage,
    timezone: formData.timezone,
  };
};

/**
 * Convert form data to UserRegistrationDto
 */
export const formDataToRegistrationDto = (
  formData: any
): UserRegistrationDto => {
  return {
    email: formData.email,
    phone: formData.phone,
    firstName: formData.firstName,
    lastName: formData.lastName,
    password: formData.password,
    confirmPassword: formData.confirmPassword,
    userType: formData.userType,
    countryId: formData.countryId,
    provinceId: formData.provinceId,
    districtId: formData.districtId,
    neighborhoodId: formData.neighborhoodId,
    addressLine1: formData.addressLine1,
    addressLine2: formData.addressLine2,
    postalCode: formData.postalCode,
    acceptTerms: formData.acceptTerms,
    acceptPrivacy: formData.acceptPrivacy,
    acceptMarketing: formData.acceptMarketing,
  };
};
