import { UserType } from '../../enums/UserType';
import { RoleLevel } from '../../enums/RoleLevel';

export interface UserListDto {
  id: number;
  email: string;
  phone: string;
  fullName: string;
  userType: UserType;
  isActive: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  lastLoginAt: string;
  createdAt: string;
  profileImageUrl: string;
  primaryRole: string;
  primaryRoleLevel: RoleLevel;
  institutionAccessCount: number;
  primaryInstitution: string;
}
