import { UserProfileDto } from "@/types";

/**
 * Initial values for user form
 */
export const initialValues: Partial<UserProfileDto> & {
  password?: string;
  confirmPassword?: string;
  userType?: string;
  acceptTerms?: boolean;
  acceptPrivacy?: boolean;
  acceptMarketing?: boolean;
} = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  profileImageUrl: "",
  countryId: undefined,
  provinceId: undefined,
  districtId: undefined,
  neighborhoodId: undefined,
  addressLine1: "",
  addressLine2: "",
  postalCode: "",
  latitude: undefined,
  longitude: undefined,
  emailNotifications: true,
  smsNotifications: true,
  marketingEmails: false,
  preferredLanguage: "tr",
  timezone: "Europe/Istanbul",
  userType: "PARENT",
  acceptTerms: false,
  acceptPrivacy: false,
  acceptMarketing: false,
};
