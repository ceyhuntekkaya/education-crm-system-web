// Example icon imports (replace with actual icon components)

import { Department } from "@/enums/Department";
import { Role } from "@/enums/Role";
import { PATHS } from "./paths";

export const ROUTES = [
  {
    title: "Public",
    path: PATHS.PUBLIC.HOME,
    children: [
      {
        title: "Home",
        index: true,
      },
    ],
  },

  {
    title: "Auth",
    path: PATHS.AUTH.LOGIN,
    children: [
      {
        title: "Login",
        index: true,
      },
      {
        title: "Register",
        path: PATHS.AUTH.REGISTER,
      },
    ],
  },

  {
    title: "User",
    path: PATHS.PROTECTED.USER.HOME,
    roles: [Role.USER],
    children: [
      {
        title: "User Home",
        index: true,
      },
      {
        title: "User Groups",
        path: PATHS.PROTECTED.USER.LIST,
        departments: [Department.IT, Department.GRADER],
      },
    ],
  },

  {
    title: "Admin",
    path: PATHS.PROTECTED.ADMIN.HOME,
    roles: [Role.ADMIN],
    children: [
      {
        title: "Admin Home",
        index: true,
      },
      {
        title: "Admin Settings",
        path: PATHS.PROTECTED.ADMIN.SETTINGS,
        departments: [
          Department.ADMIN,
          Department.AUTHOR,
          Department.SUPERVISOR,
        ],
      },
    ],
  },
  {
    title: "Candidate",
    path: PATHS.PROTECTED.CANDIDATE.HOME,
    roles: [Role.CANDIDATE],
    children: [
      {
        title: "Candidate Home",
        index: true,
      },
      {
        title: "Candidate List",
        path: PATHS.PROTECTED.CANDIDATE.LIST,
      },
    ],
  },
  {
    title: "Company",
    path: PATHS.PROTECTED.COMPANY.HOME,
    roles: [Role.COMPANY, Role.ADMIN], // Admin de erişebilsin
    children: [
      {
        title: "Company Home",
        index: true,
      },
      {
        title: "Company List",
        path: PATHS.PROTECTED.COMPANY.LIST,
      },
    ],
  },
  {
    title: "Supply",
    path: PATHS.PROTECTED.SUPPLY.HOME,
    roles: [Role.SUPPLY, Role.ADMIN], // Admin ve Supply rolleri erişebilir
    children: [
      {
        title: "Supply Home",
        index: true,
      },
      {
        title: "Supply Company",
        path: PATHS.PROTECTED.SUPPLY.COMPANY.HOME,
        roles: [Role.COMPANY, Role.ADMIN], // Company ve Admin erişebilir
      },
      {
        title: "Supply Supplier",
        path: PATHS.PROTECTED.SUPPLY.SUPPLIER.HOME,
        roles: [Role.SUPPLY, Role.ADMIN], // Sadece Supply ve Admin erişebilir
      },
    ],
  },
];
