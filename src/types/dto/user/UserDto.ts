import { UserInstitutionAccessDto } from "./UserInstitutionAccessDto";
import { CountrySummaryDto } from "../location/CountrySummaryDto";
import { ProvinceSummaryDto } from "../location/ProvinceSummaryDto";
import { DistrictSummaryDto } from "../location/DistrictSummaryDto";
import { NeighborhoodSummaryDto } from "../location/NeighborhoodSummaryDto";
import { UserRoleDto } from "./UserRoleDto";
import { SubscriptionDto } from "../subscription/SubscriptionDto";
import { SchoolDto } from "../institution/SchoolDto";
export interface UserDto {
  /** Format: int64 */
  id?: number;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  /** @enum {string} */
  userType?: "INSTITUTION_USER" | "PARENT";
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  /** Format: date-time */
  lastLoginAt?: string;
  profileImageUrl?: string;
  isActive?: boolean;
  /** Format: date-time */
  createdAt?: string;
  country?: CountrySummaryDto;
  province?: ProvinceSummaryDto;
  district?: DistrictSummaryDto;
  neighborhood?: NeighborhoodSummaryDto;
  addressLine1?: string;
  addressLine2?: string;
  postalCode?: string;
  /** Format: double */
  latitude?: number;
  /** Format: double */
  longitude?: number;
  userRoles?: UserRoleDto[];
  institutionAccess?: UserInstitutionAccessDto[];
  roles?: string[];
  authorities?: string[];
  // subscription?: SubscriptionDto;
  // schools?: SchoolDto[];
};
