import { UserProfileDto } from "@/types";
import { UserDto } from "@/types/dto/user/UserDto";

/**
 * Get initial values for user form
 * @param authUser - Oturum açmış kullanıcı (yeni kullanıcı eklerken adres bilgileri için kullanılır)
 */
export const getInitialValues = (
  authUser?: UserDto | null
): Partial<UserProfileDto> & {
  password?: string;
  confirmPassword?: string;
  userType?: string;
  acceptTerms?: boolean;
  acceptPrivacy?: boolean;
  acceptMarketing?: boolean;
} => {
  return {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    profileImageUrl: "",
    // AuthUser'dan gelen bilgiler (yeni kullanıcı eklerken arka planda gönderilecek)
    countryId: authUser?.country?.id,
    provinceId: authUser?.province?.id,
    districtId: authUser?.district?.id,
    neighborhoodId: authUser?.neighborhood?.id,
    addressLine1: authUser?.addressLine1 || "",
    addressLine2: authUser?.addressLine2 || "",
    postalCode: authUser?.postalCode || "",
    latitude: authUser?.latitude,
    longitude: authUser?.longitude,
    emailNotifications: true,
    smsNotifications: true,
    marketingEmails: false,
    preferredLanguage: "tr",
    timezone: "Europe/Istanbul",
    userType: "INSTITUTION_USER", // Varsayılan olarak INSTITUTION_USER
    acceptTerms: false,
    acceptPrivacy: false,
    acceptMarketing: false,
  };
};

/**
 * Initial values for user form (backward compatibility)
 */
export const initialValues: Partial<UserProfileDto> & {
  password?: string;
  confirmPassword?: string;
  userType?: string;
  acceptTerms?: boolean;
  acceptPrivacy?: boolean;
  acceptMarketing?: boolean;
} = getInitialValues();
