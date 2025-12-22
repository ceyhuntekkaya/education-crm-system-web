import { Permission } from "./Permission";

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  CANDIDATE = "CANDIDATE",
  COMPANY = "COMPANY",
  SUPPLY = "SUPPLY",
  INSTRUCTOR = "INSTRUCTOR",
  PARTICIPANT = "PARTICIPANT",
}

export const RolePermissions: Record<Role, Permission[]> = {
  USER: [Permission.USER_CREATE, Permission.SETTING],
  ADMIN: [Permission.GENERAL],
  CANDIDATE: [Permission.GENERAL],
  COMPANY: [Permission.GENERAL],
  SUPPLY: [Permission.GENERAL],
  INSTRUCTOR: [Permission.GENERAL],
  PARTICIPANT: [Permission.GENERAL],
};
