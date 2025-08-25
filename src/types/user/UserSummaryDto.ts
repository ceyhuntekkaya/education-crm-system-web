import { UserType } from '../../enums/UserType';

export interface UserSummaryDto {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  userType: UserType;
  profileImageUrl: string;
  isActive: boolean;
}
