// API endpoint'lerinin merkezi yönetimi
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH_TOKEN: "/auth/refresh-token",
  },

  LOCATION: {
    COUNTRIES: "/locations/countries",
    PROVINCES: (countryId: string | number) =>
      `/locations/countries/${countryId}/provinces`,
    DISTRICTS: (provinceId: string | number) =>
      `/locations/provinces/${provinceId}/districts`,
    NEIGHBORHOODS: (districtId: string | number) =>
      `/locations/districts/${districtId}/neighborhoods`,
    // Veli arama ekranı için search endpoint'leri
    PROVINCES_SEARCH: (countryId: string | number) =>
      `/locations/countries/${countryId}/provinces/search`,
    DISTRICTS_SEARCH: (provinceId: string | number) =>
      `/locations/provinces/${provinceId}/districts/search`,
    NEIGHBORHOODS_SEARCH: (districtId: string | number) =>
      `/locations/districts/${districtId}/neighborhoods/search`,
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
    INSTITUTION_TYPES_ADMIN: "/institutions/institution-types/admin",
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
    // Appointment CRUD
    CREATE: "/appointments",
    BY_ID: (id: string | number) => `/appointments/${id}`,
    NOTES: (appointmentId: string | number) =>
      `/appointments/${appointmentId}/notes`,

    // Appointment actions
    CONFIRM: "/appointments/confirm",
    CANCEL: "/appointments/cancel",
    RESCHEDULE: "/appointments/reschedule",

    // User appointments - Kullanıcının mevcut randevusunu getir
    CURRENT_APPOINTMENT: (userId: string | number, schoolId: string | number) =>
      `/appointments/slots/search/user/${userId}/school/${schoolId}`,

    // User appointments - Kullanıcının randevularını getir
    SLOTS_SEARCH_USER: (userId: string | number) =>
      `/appointments/slots/search/user/${userId}`,

    // Yeni API - İki tarih arası Kurum slotları listesi (POST)
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
  },

  SURVEYS: {
    BY_APPOINTMENT_ID: (appointmentId: string | number) =>
      `/surveys/appointments/${appointmentId}`,
    CREATE_RESPONSE: "/surveys/responses",
    USER_ASSIGNMENT: "/surveys/user/assignment",
    USER_ASSIGNMENT_BY_ID: (userId: string | number) =>
      `/surveys/user/assignment/${userId}`,
    UPDATE_USER_ASSIGNMENT: (assignmentId: string | number) =>
      `/surveys/user/assignment/${assignmentId}`,
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
    MESSAGES_BY_USER: (userId: string | number) =>
      `/content/messages/user/${userId}`,
    MESSAGES_BY_SCHOOL: (schoolId: string | number) =>
      `/content/messages/school/${schoolId}`,
    MESSAGE_BY_ID: (id: string | number) => `/content/messages/${id}`,
    MESSAGE_MARK_AS_READ: (messageId: string | number) =>
      `/content/messages/${messageId}/read`,

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

  // Register endpoints - Step by step registration
  REGISTER: {
    STEP_1_CREDENTIAL: "/register/step/1/credential",
    STEP_2_IDENTITY: "/register/step/2/identity",
    STEP_3_CONFIRM: "/register/step/3/confirm",
    STEP_4_CAMPUS: "/register/step/4/campus",
    STEP_5_SUBSCRIPTION: "/register/step/5/subscription",
    STEP_6_PAYMENT: "/register/step/6/payment",
    STEP_7_VERIFICATION: "/register/step/7/",
    SEND_CODE: "/register/send",
  },

  // Users endpoints
  USERS: {
    REGISTER: "/users/register",
    REGISTER_INSTITUTION: "/users/register/institution",
    BY_CAMPUS: (campusId: string | number) => `/users/campus/${campusId}`,
    BY_ID: (userId: string | number) => `/users/${userId}`,
    PROFILE: (userId: string | number) => `/users/${userId}/profile`,
    UPDATE_PROFILE: (userId: string | number) => `/users/${userId}/profile`,
    PASSWORD_RESET: "/users/password/reset",
    PASSWORD_RESET_CONFIRM: "/users/password/reset/confirm",
    CHANGE_PASSWORD: (userId: string | number) =>
      `/users/${userId}/password/change`,
  },

  // Parent School Lists endpoints
  PARENT_SCHOOL_LISTS: {
    CREATE_LIST: "/parent/school-lists",
    GET_LISTS: "/parent/school-lists",
    GET_LISTS_BY_PARENT: (parentId: string | number) =>
      `/parent/school-lists/${parentId}`,
    LIST_BY_ID: (id: string | number) => `/parent/school-lists/${id}`,
    UPDATE_LIST: (id: string | number) => `/parent/school-lists/${id}`,
    DELETE_LIST: (id: string | number) => `/parent/school-lists/${id}`,
    ADD_SCHOOL: "/parent/school-lists/schools",
    REMOVE_SCHOOL: (listId: string | number, schoolId: string | number) =>
      `/parent/school-lists/${listId}/schools/${schoolId}`,
    GET_LIST_ITEMS: (listId: string | number) =>
      `/parent/school-lists/${listId}/schools`,
  },

  // Parent Search Lists endpoints (Favori Aramalar)
  PARENT_SEARCH_LISTS: {
    CREATE_LIST: "/parent/school-lists/search-list/",
    GET_LISTS_BY_PARENT: (userId: string | number) =>
      `/parent/school-lists/search-list/${userId}`,
    LIST_BY_ID: (id: string | number) =>
      `/parent/school-lists/search-list/${id}`,
    UPDATE_LIST: (id: string | number) =>
      `/parent/school-lists/search-list/${id}`,
    DELETE_LIST: (id: string | number) =>
      `/parent/school-lists/search-list/${id}`,
  },

  // Supply Management endpoints
  SUPPLY: {
    // Dashboard Statistics
    DASHBOARD: {
      COMPANY_SUMMARY: (companyId: string | number) =>
        `/supply/dashboard/company/summary?companyId=${companyId}`,
      ORDER_STATISTICS: (companyId: string | number) =>
        `/supply/dashboard/company/order-statistics?companyId=${companyId}`,
      RFQ_STATISTICS: (companyId: string | number) =>
        `/supply/dashboard/company/rfq-statistics?companyId=${companyId}`,
    },

    // Orders
    ORDERS: {
      BY_COMPANY: (companyId: string | number) =>
        `/supply/orders/by-company/${companyId}`,
      BY_ID: (id: string | number) => `/supply/orders/${id}`,
      CREATE: "/supply/orders",
      UPDATE: (id: string | number) => `/supply/orders/${id}`,
      CANCEL: (id: string | number) => `/supply/orders/${id}/cancel`,
    },

    // RFQs (Request for Quotation)
    RFQS: {
      BY_COMPANY: (companyId: string | number) =>
        `/supply/rfqs/by-company/${companyId}`,
      ACTIVE: "/supply/rfqs/active",
      BY_ID: (id: string | number) => `/supply/rfqs/${id}`,
      CREATE: "/supply/rfqs",
      UPDATE: (id: string | number) => `/supply/rfqs/${id}`,
      DELETE: (id: string | number) => `/supply/rfqs/${id}`,
    },

    // Products
    PRODUCTS: {
      SEARCH: "/supply/products/search",
      BY_ID: (id: string | number) => `/supply/products/${id}`,
      BY_SUPPLIER: (supplierId: string | number) =>
        `/supply/products/supplier/${supplierId}`,
      DISCOUNTS: (productId: string | number) =>
        `/supply/products/${productId}/discounts`,
      IMAGES: (id: string | number) => `/supply/products/${id}/images`,
    },

    // Suppliers
    SUPPLIERS: {
      LIST: "/supply/suppliers",
      BY_ID: (id: string | number) => `/supply/suppliers/${id}`,
      BY_COMPANY: (companyId: string | number) =>
        `/supply/suppliers/company/${companyId}`,
    },

    // Categories
    CATEGORIES: {
      LIST: "/supply/categories",
      BY_ID: (id: string | number) => `/supply/categories/${id}`,
    },

    // Quotations
    QUOTATIONS: {
      BY_COMPANY: (companyId: string | number) =>
        `/supply/quotations/by-company/${companyId}`,
      BY_RFQ: (rfqId: string | number) => `/supply/quotations/rfq/${rfqId}`,
      BY_ID: (id: string | number) => `/supply/quotations/${id}`,
      CREATE: "/supply/quotations",
      UPDATE: (id: string | number) => `/supply/quotations/${id}`,
      ACCEPT: (id: string | number) => `/supply/quotations/${id}/accept`,
      REJECT: (id: string | number) => `/supply/quotations/${id}/reject`,
    },

    // Wishlists
    WISHLISTS: {
      LIST: "/supply/wishlists",
      BY_ID: (id: string | number) => `/supply/wishlists/${id}`,
      CREATE: "/supply/wishlists",
      DELETE: (id: string | number) => `/supply/wishlists/${id}`,
      CHECK: (productId: string | number) =>
        `/supply/wishlists/check/${productId}`,
    },

    // Conversations
    CONVERSATIONS: {
      CREATE: "/supply/conversations",
      BY_ID: (id: string | number) => `/supply/conversations/${id}`,
      BY_PRODUCT: (productId: string | number) =>
        `/supply/conversations/by-product/${productId}`,
      BY_COMPANY: (companyId: string | number) =>
        `/supply/conversations/by-company/${companyId}`,
    },

    // Messages
    MESSAGES: {
      SEND: (conversationId: string | number) =>
        `/supply/conversations/${conversationId}/messages`,
      BY_CONVERSATION: (conversationId: string | number) =>
        `/supply/conversations/${conversationId}/messages`,
    },
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
