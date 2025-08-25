import { AccessType } from "./AccessType";

export interface UserInstitutionAccess {
  userId: number;
  accessType: AccessType;
  entityId: number;
  grantedAt: string;
  expiresAt?: string;
}
