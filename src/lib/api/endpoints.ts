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
    SCHOOL_PROPERTY: (id: string | number) =>
      `/institutions/schools/${id}/property`,
    SCHOOL_PROPERTY_UPDATE: (id: string | number) =>
      `/institutions/schools/property/${id}`,
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
      `/pricing/school-pricing/school/${id}`,
    SCHOOL_PRICING_UPDATE: (id: string | number) =>
      `/pricing/school-pricing/${id}`,

    // Custom Fees endpoints
    CUSTOM_FEE_CREATE: "/pricing/custom-fees",
    CUSTOM_FEES_BY_PRICING: (pricingId: string | number) =>
      `/pricing/custom-fees/pricing/${pricingId}`,
    CUSTOM_FEES_BY_SCHOOL: (schoolId: string | number) =>
      `/pricing/custom-fees/school/${schoolId}`,
    CUSTOM_FEE_BY_ID: (id: string | number) => `/pricing/custom-fees/${id}`,
    CUSTOM_FEE_UPDATE: (id: string | number) => `/pricing/custom-fees/${id}`,
    CUSTOM_FEE_DELETE: (id: string | number) => `/pricing/custom-fees/${id}`,
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
    CREATE: "/campaigns",
    UPDATE: (id: string | number) => `/campaigns/${id}`,
    DELETE: (id: string | number) => `/campaigns/${id}`,
  },

  APPOINTMENTS: {
    // User appointments - Kullanıcının randevularını getir
    SLOTS_SEARCH_USER: (userId: string | number) =>
      `/appointments/slots/search/user/${userId}`,

    // Yeni API - İki tarih arası okul slotları listesi (POST)
    SLOTS_SEARCH_DATE: "/appointments/slots/search/date",

    // Slot CRUD operations
    SLOT_CREATE: "/appointments/slots",
    SLOT_BY_ID: (id: string | number) => `/appointments/slots/${id}`,
    SLOT_UPDATE: (id: string | number) => `/appointments/slots/${id}`,
    SLOT_DELETE: (id: string | number) => `/appointments/slots/${id}`,

    // Legacy endpoints (deprecated)
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

  SURVEYS: {
    BY_APPOINTMENT_ID: (appointmentId: string | number) =>
      `/surveys/appointments/${appointmentId}`,
    CREATE_RESPONSE: "/surveys/responses",
    USER_ASSIGNMENT: "/surveys/user/assignment",
    USER_ASSIGNMENT_BY_ID: (userId: string | number) =>
      `/surveys/user/assignment/${userId}`,
    SUBMIT: "/surveys/submit",
    EVALUATE: "/surveys/evaluate", // Survey evaluation için özel endpoint
    BY_ID: (id: string | number) => `/surveys/${id}`,
    PUBLIC_BY_TOKEN: (responseToken: string) =>
      `/surveys/public/by-token/${responseToken}`,
    BY_TOKEN: (responseToken: string) => `/surveys/responses/${responseToken}`,
    SUBMIT_RESPONSE: (responseToken: string) =>
      `/surveys/responses/${responseToken}/submit`,
  },

  CONTENT: {
    // Posts
    POSTS: "/content/posts",
    POSTS_BY_SCHOOL: (schoolId: string | number) =>
      `/content/posts/school/${schoolId}`,
    POST_BY_ID: (id: string | number) => `/content/posts/${id}`,
    POST_CREATE: "/content/posts",
    POST_UPDATE: (id: string | number) => `/content/posts/${id}`,

    // Messages
    MESSAGES_BY_SCHOOL: (schoolId: string | number) =>
      `/content/messages/school/${schoolId}`,
    MESSAGE_BY_ID: (id: string | number) => `/content/messages/${id}`,

    // Galleries
    GALLERIES: "/content/galleries",
    GALLERIES_BY_SCHOOL: (schoolId: string | number) =>
      `/content/galleries/school/${schoolId}`,
    GALLERY_BY_ID: (id: string | number) => `/content/galleries/${id}`,
    GALLERY_CREATE: "/content/galleries",
    GALLERY_UPDATE: (id: string | number) => `/content/galleries/${id}`,

    // Gallery Items
    GALLERY_ITEMS: "/content/galleries/items",
    GALLERY_ITEM_CREATE: "/content/galleries/items",
    GALLERY_ITEM_BY_ID: (id: string | number) =>
      `/content/galleries/items/${id}`,
    GALLERY_ITEM_UPDATE: (id: string | number) =>
      `/content/galleries/items/${id}`,
  },

  TEMP: {
    CARTS: "/carts",
  },

  // Users endpoints
  USERS: {
    REGISTER: "/users/register",
    BY_CAMPUS: (campusId: string | number) => `/users/campus/${campusId}`,
    BY_ID: (userId: string | number) => `/users/${userId}`,
    PROFILE: (userId: string | number) => `/users/${userId}/profile`,
    UPDATE_PROFILE: (userId: string | number) => `/users/${userId}/profile`,
    PASSWORD_RESET: "/users/password/reset",
    PASSWORD_RESET_CONFIRM: "/users/password/reset/confirm",
    CHANGE_PASSWORD: (userId: string | number) =>
      `/users/${userId}/password/change`,
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
