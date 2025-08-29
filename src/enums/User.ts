
import { UserType } from "./UserType";
import { UserRole } from "./UserRole";
import { UserInstitutionAccess } from "./UserInstitutionAccess";

export interface User {
  id: number;
  email: string;
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
  userType: UserType;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  emailVerificationToken?: string;
  phoneVerificationCode?: string;
  passwordResetToken?: string;
  passwordResetExpiresAt?: string;
  lastLoginAt?: string;
  profileImageUrl?: string;
  country?: string;
  province?: string;
  district?: string;
  neighborhood?: string;
  addressLine1?: string;
  addressLine2?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  institutionAccess?: UserInstitutionAccess[];
  userRoles?: UserRole[];
}
