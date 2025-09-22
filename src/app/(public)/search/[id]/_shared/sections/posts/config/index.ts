// Post component configuration

export const POST_GRID_CONFIG = {
  defaultColumns: {
    xl: 4, // 3 columns
    lg: 6, // 2 columns
    md: 6, // 2 columns
    sm: 12, // 1 column
  },
  itemsPerPage: 12,
  maxItemsPerPage: 100,
};

export const POST_CARD_CONFIG = {
  maxTitleLength: 80,
  maxContentLength: 150,
  showAuthor: true,
  showSchool: true,
  showEngagement: true,
  showThumbnail: true,
};

export const POST_MODAL_CONFIG = {
  size: "xl",
  showEngagementStats: true,
  showMetaInfo: true,
  showMediaAttachments: true,
  maxContentLength: 2000,
};

export const POST_FILTER_CONFIG = {
  enableSearch: true,
  enableTypeFilter: true,
  enableStatusFilter: true,
  enableDateFilter: true,
  enableFeaturedFilter: true,
  enableSorting: true,
  defaultStatus: "PUBLISHED",
  defaultSortBy: "publishedAt",
  defaultSortOrder: "desc",
};

export const POST_ENGAGEMENT_CONFIG = {
  showLikes: true,
  showComments: true,
  showViews: true,
  showShares: true,
  formatLargeNumbers: true,
  compactDisplay: true,
};
