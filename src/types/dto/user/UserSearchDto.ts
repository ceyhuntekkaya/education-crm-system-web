import { UserType } from "../../../enums/UserType";
import { RoleLevel } from "../../../enums/RoleLevel";
import { AccessType } from "../../../enums/AccessType";

export interface UserSearchDto {
  searchTerm: string;
  userType: UserType;
  isActive: boolean;
  roleId: number;
  roleLevel: RoleLevel;
  institutionId: number;
  accessType: AccessType;
  createdAfter: string;
  createdBefore: string;
  lastLoginAfter: string;
  lastLoginBefore: string;
  countryId: number;
  provinceId: number;
  districtId: number;
  neighborhoodId: number;
  page: number;
  size: number;
  sortBy: string;
  sortDirection: string;
}
