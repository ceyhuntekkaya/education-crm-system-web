// User roles enum
export enum ROLES {
  ADMIN = "admin",
  INSTITUTION = "institution", 
  USER = "user",
}

// Department enum
export enum DEPARTMENTS {
  IT = "it",
  HR = "hr",
  FINANCE = "finance",
  SALES = "sales",
  MARKETING = "marketing",
}

// Type definitions
export type UserRole = ROLES;
export type AllowedRoles = UserRole[];
export type Department = DEPARTMENTS;
export type AllowedDepartments = Department[];
