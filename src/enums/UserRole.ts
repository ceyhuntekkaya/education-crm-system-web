import { Role } from "./Role";
import { Department } from "./Department";
import { Permission } from "./Permission";
import { RoleLevel } from "./RoleLevel";

export interface UserRole {
  userId: number;
  role: Role;
  departments: Department[];
  permissions: Permission[];
  roleLevel: RoleLevel;
  expiresAt?: string;
}
