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
    SCHOOL_CREATE: "/institutions/schools",
    SCHOOL_BY_ID: (id: string | number) => `/institutions/schools/${id}`,
    BRAND_SUMMARIES: "/institutions/brands/summaries",
    BRAND_DETAIL: (id: string | number) => `/institutions/brands/${id}`,
    BRAND_CREATE: "/institutions/brands",
    BRAND_BY_ID: (id: string | number) => `/institutions/brands/${id}`,
    BRAND_CAMPUSES: (brandId: string | number) =>
      `/institutions/brands/${brandId}/campuses`,
    CAMPUS_DETAIL: (id: string | number) => `/institutions/campuses/${id}`,
    CAMPUS_CREATE: "/institutions/campuses",
    CAMPUS_BY_ID: (id: string | number) => `/institutions/campuses/${id}`,
    INSTITUTION_TYPES: "/institutions/institution-types",
    INSTITUTION_TYPE_SUMMARIES: "/institutions/institution-types/summaries",
  },

  PRICING: {
    SCHOOL_PRICING_CREATE: "/pricing/school-pricing",
    SCHOOL_PRICING: (schoolId: string | number) =>
      `/pricing/school-pricing/school/${schoolId}`,
    SCHOOL_PRICING_BY_ID: (id: string | number) =>
      `/pricing/school-pricing/${id}`,
  },

  SUBSCRIPTIONS: {
    PLANS: "/subscriptions/plans",
    PLAN_BY_ID: (id: string | number) => `/subscriptions/plans/${id}`,
    ACTIVE_PLANS: "/subscriptions/plans/active",
    PLANS_BY_BILLING_PERIOD: (billingPeriod: string) =>
      `/subscriptions/plans?billingPeriod=${billingPeriod}`,
  },

  CAMPAIGNS: {
    ACTIVE: "/campaigns/active",
    BY_SCHOOL: (schoolId: string | number) => `/campaigns/schools/${schoolId}`,
    BY_ID: (id: string | number) => `/campaigns/${id}`,
  },

  APPOINTMENTS: {
    SCHOOL_AVAILABILITY: (schoolId: string | number) =>
      `/appointments/schools/${schoolId}/availability`,
    SCHOOL_AVAILABILITY_RANGE: (schoolId: string | number) =>
      `/appointments/schools/${schoolId}/availability-range`,
    SCHOOL_STATISTICS: (schoolId: string | number) =>
      `/appointments/schools/${schoolId}/statistics`,
    BY_ID: (id: string | number) => `/appointments/${id}`,
    NOTES: (appointmentId: string | number) =>
      `/appointments/${appointmentId}/notes`,
  },

  CONTENT: {
    POSTS_BY_SCHOOL: (schoolId: string | number) =>
      `/content/posts/school/${schoolId}`,
    MESSAGES_BY_SCHOOL: (schoolId: string | number) =>
      `/content/messages/school/${schoolId}`,
    GALLERIES_BY_SCHOOL: (schoolId: string | number) =>
      `/content/galleries/school/${schoolId}`,
    GALLERIES: "/content/galleries",
    GALLERY_BY_ID: (id: string | number) => `/content/galleries/${id}`,
    POST_BY_ID: (id: string | number) => `/content/posts/${id}`,
    MESSAGE_BY_ID: (id: string | number) => `/content/messages/${id}`,
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
