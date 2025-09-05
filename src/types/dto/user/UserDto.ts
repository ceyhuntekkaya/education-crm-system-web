import { UserType } from "../../../enums/UserType";
import { UserRole } from "../../../enums/UserRole";
import { UserInstitutionAccessDto } from "./UserInstitutionAccessDto";

export interface UserDto {
  id: number;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  fullName: string;
  userType: UserType;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  lastLoginAt: string;
  profileImageUrl: string;
  isActive: boolean;
  createdAt: string;
  country: string;
  province: string;
  district: string;
  neighborhood: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  roles: string[];
  userRoles: UserRole[];
  institutionAccess: UserInstitutionAccessDto[];
}
