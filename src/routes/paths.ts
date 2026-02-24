export const PATHS = {
  PUBLIC: {
    HOME: "/",
  },

  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },

  PROTECTED: {
    USER: {
      HOME: "/user",
      LIST: "/user/list",
    },

    ADMIN: {
      HOME: "/admin",
      SETTINGS: "/admin/settings",
    },

    CANDIDATE: {
      HOME: "/candidate",
      LIST: "/candidate/list",
    },

    COMPANY: {
      HOME: "/company",
      LIST: "/company/list",
    },

    SUPPLY: {
      HOME: "/supply",
      COMPANY: {
        HOME: "/supply/company",
      },
      SUPPLIER: {
        HOME: "/supply/supplier",
      },
    },

    INDIVIDUAL: {
      HOME: "/individual",
      TEACHER: {
        HOME: "/individual/teacher",
      },
      COMPANY: {
        HOME: "/individual/company",
      },
      INSTRUCTOR: {
        HOME: "/individual/instructor",
      },
    },
  },

  UNAUTHORIZED: "/unauthorized",
} as const;
