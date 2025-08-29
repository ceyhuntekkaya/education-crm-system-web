import { AccessType } from '../../enums/AccessType';

export interface UserInstitutionAccessDto {
  id: number;
  userId: number;
  userFullName: string;
  accessType: AccessType;
  entityId: number;
  entityName: string;
  grantedAt: string;
  expiresAt: string;
  isActive: boolean;
}
