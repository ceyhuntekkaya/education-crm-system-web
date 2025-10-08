import { UserType } from "../../../enums/UserType";
import { RoleLevel } from "../../../enums/RoleLevel";

export interface UserListDto {
  /** Format: int64 */
  id?: number;
  email?: string;
  phone?: string;
  fullName?: string;
  /** @enum {string} */
  userType?: "INSTITUTION_USER" | "PARENT";
  isActive?: boolean;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  /** Format: date-time */
  lastLoginAt?: string;
  /** Format: date-time */
  createdAt?: string;
  profileImageUrl?: string;
  primaryRole?: string;
  /** @enum {string} */
  primaryRoleLevel?: "BRAND" | "CAMPUS" | "SCHOOL" | "SYSTEM";
  /** Format: int32 */
  institutionAccessCount?: number;
  primaryInstitution?: string;
};
