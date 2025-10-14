// API endpoint'lerinin merkezi yönetimi
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
  },

  LOCATION: {
    COUNTRIES: "/locations/countries",
    PROVINCES: (countryId: string | number) =>
      `/locations/countries/${countryId}/provinces`,
    DISTRICTS: (provinceId: string | number) =>
      `/locations/provinces/${provinceId}/districts`,
    NEIGHBORHOODS: (districtId: string | number) =>
      `/locations/districts/${districtId}/neighborhoods`,
  },

  INSTITUTIONS: {
    SCHOOLS: "/institutions/schools",
    SCHOOLS_SEARCH: "/institutions/schools/search",
    SCHOOL_DETAIL: (id: string | number) => `/institutions/schools/${id}`,
    INSTITUTION_TYPES: "/institutions/institution-types",
  },

  PRICING: {
    SCHOOL_PRICING: (schoolId: string | number) =>
      `/pricing/school-pricing/school/${schoolId}`,
    SCHOOL_PRICING_BY_ID: (id: string | number) =>
      `/pricing/school-pricing/${id}`,
  },

  CAMPAIGNS: {
    ACTIVE: "/campaigns/active",
    BY_SCHOOL: (schoolId: string | number) => `/campaigns/schools/${schoolId}`,
  },

  APPOINTMENTS: {
    SCHOOL_AVAILABILITY: (schoolId: string | number) =>
      `/appointments/schools/${schoolId}/availability`,
    SCHOOL_AVAILABILITY_RANGE: (schoolId: string | number) =>
      `/appointments/schools/${schoolId}/availability-range`,
    SCHOOL_STATISTICS: (schoolId: string | number) =>
      `/appointments/schools/${schoolId}/statistics`,
  },

  CONTENT: {
    POSTS_BY_SCHOOL: (schoolId: string | number) =>
      `/content/posts/school/${schoolId}`,
    MESSAGES_BY_SCHOOL: (schoolId: string | number) =>
      `/content/messages/school/${schoolId}`,
    GALLERIES_BY_SCHOOL: (schoolId: string | number) =>
      `/content/galleries/school/${schoolId}`,
  },

  TEMP: {
    CARTS: "/carts",
  },

  // // Todos
  // TODOS: {
  //   LIST: '/todos',
  //   LIMITED: (limit: number) => `/todos?_limit=${limit}`,
  //   BY_ID: (id: string | number) => `/todos/${id}`,
  //   CREATE: '/todos',
  //   UPDATE: (id: string | number) => `/todos/${id}`,
  //   DELETE: (id: string | number) => `/todos/${id}`,
  // },
} as const;

// Endpoint helper fonksiyonları
export const createEndpoint = (
  template: string,
  params: Record<string, string | number>
): string => {
  let endpoint = template;
  Object.entries(params).forEach(([key, value]) => {
    endpoint = endpoint.replace(`:${key}`, String(value));
  });
  return endpoint;
};

// Query parameter helper
export const buildQueryString = (params: Record<string, unknown>): string => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });
  return searchParams.toString();
};
