// Tüm route href'leri - Basit ve anlaşılır yapı
export const ROUTES = {
  // Public routes
  HOME: "/",
  ABOUT_US: "/about-us",
  CONTACT: "/contact",
  
  // Auth routes
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },
  
  // Protected routes
  DASHBOARD: {
    HOME: "/dashboard",
    ADMIN: {
      HOME: "/dashboard/admin",
      USERS: "/dashboard/admin/users",
      INSTITUTIONS: "/dashboard/admin/institutions",
      SETTINGS: "/dashboard/admin/settings",
    },
    INSTITUTION: {
      HOME: "/dashboard/institution",
      COURSES: "/dashboard/institution/courses",
      STUDENTS: "/dashboard/institution/students",
    },
    USER: {
      HOME: "/dashboard/user",
      COURSES: "/dashboard/user/courses",
      PROFILE: "/dashboard/user/profile",
    },
  },
  
  // Special routes
  UNAUTHORIZED: "/unauthorized",
} as const;
