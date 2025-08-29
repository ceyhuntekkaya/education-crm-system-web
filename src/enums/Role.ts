import { Permission } from "./Permission";

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  CANDIDATE = "CANDIDATE",
  COMPANY = "COMPANY"
}

export const RolePermissions: Record<Role, Permission[]> = {
  USER: [Permission.USER_CREATE, Permission.SETTING],
  ADMIN: [Permission.GENERAL],
  CANDIDATE: [Permission.GENERAL],
  COMPANY: [Permission.GENERAL]
};
