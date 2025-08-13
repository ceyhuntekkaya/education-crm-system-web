// User roles enum
export enum ROLES {
  ADMIN = "admin",
  INSTITUTION = "institution", 
  USER = "user",
}

// Type definitions
export type UserRole = ROLES;
export type AllowedRoles = UserRole[];
