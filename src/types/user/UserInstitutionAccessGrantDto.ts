import { AccessType } from '../../enums/AccessType';

export interface UserInstitutionAccessGrantDto {
  userId: number;
  accessType: AccessType;
  entityId: number;
  expiresAt: string;
}
