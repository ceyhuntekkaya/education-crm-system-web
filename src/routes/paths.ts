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
  },

  UNAUTHORIZED: "/unauthorized",
} as const;
