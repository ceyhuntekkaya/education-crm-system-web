// Gallery mock data exports
export * from "./gallerySummaryMockData";
export * from "./galleryMockData";
export * from "./supportingMockData";

// Re-export for convenience
export {
  gallerySummaryMockData,
  getGallerySummaryByType,
  getFeaturedGallerySummaries,
  getMostViewedGallerySummaries,
  getGallerySummaryByInstitution,
} from "./gallerySummaryMockData";
export {
  galleryMockData,
  getGalleryByType,
  getGalleryByVisibility,
  getFeaturedGalleries,
  getMostViewedGalleries,
  getGalleryByBrandId,
  getGalleryByCampusId,
  getGalleryBySchoolId,
  getActiveGalleries,
  getGalleriesWithCommentsAndDownloads,
} from "./galleryMockData";
export {
  brandSummaryMockData,
  campusSummaryMockData,
  schoolSummaryMockData,
  userSummaryMockData,
  galleryItemMockData,
  provinceSummaryMockData,
  districtSummaryMockData,
} from "./supportingMockData";
