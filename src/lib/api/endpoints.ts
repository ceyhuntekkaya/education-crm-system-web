// API endpoint'lerinin merkezi yönetimi
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },

  // User endpoints
  USERS: {
    LIST: '/users',
    BY_ID: (id: string | number) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id: string | number) => `/users/${id}`,
    DELETE: (id: string | number) => `/users/${id}`,
    BULK_DELETE: '/users/bulk-delete',
  },

  // Institution endpoints
  INSTITUTIONS: {
    LIST: '/institutions',
    BY_ID: (id: string | number) => `/institutions/${id}`,
    CREATE: '/institutions',
    UPDATE: (id: string | number) => `/institutions/${id}`,
    DELETE: (id: string | number) => `/institutions/${id}`,
    USERS: (id: string | number) => `/institutions/${id}/users`,
  },

  // Dashboard endpoints
  DASHBOARD: {
    STATS: '/dashboard/stats',
    RECENT_ACTIVITIES: '/dashboard/recent-activities',
  },

  // Settings endpoints
  SETTINGS: {
    GENERAL: '/settings/general',
    SECURITY: '/settings/security',
    NOTIFICATIONS: '/settings/notifications',
  },

  // JSONPlaceholder API endpoints (Demo/Example purposes)
  EXAMPLES: {
    // Users
    USERS: {
      LIST: '/users',
      BY_ID: (id: string | number) => `/users/${id}`,
    },
    
    // Posts
    POSTS: {
      LIST: '/posts',
      BY_ID: (id: string | number) => `/posts/${id}`,
      CREATE: '/posts',
      UPDATE: (id: string | number) => `/posts/${id}`,
      DELETE: (id: string | number) => `/posts/${id}`,
      WITH_PAGINATION: (page: number, limit: number) => `/posts?_page=${page}&_limit=${limit}`,
    },
    
    // Comments
    COMMENTS: {
      LIST: '/comments',
      BY_ID: (id: string | number) => `/comments/${id}`,
      CREATE: '/comments',
      BY_POST: (postId: string | number) => `/posts/${postId}/comments`,
    },
    
    // Todos
    TODOS: {
      LIST: '/todos',
      LIMITED: (limit: number) => `/todos?_limit=${limit}`,
      BY_ID: (id: string | number) => `/todos/${id}`,
      CREATE: '/todos',
      UPDATE: (id: string | number) => `/todos/${id}`,
      DELETE: (id: string | number) => `/todos/${id}`,
    },
  },
} as const;

// Endpoint helper fonksiyonları
export const createEndpoint = (template: string, params: Record<string, string | number>): string => {
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
