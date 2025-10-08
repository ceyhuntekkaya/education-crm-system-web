// Gallery shared exports
export * from './context/gallery-context';
export * from './components';
export * from './config';
export * from './mock';
export * from './sections';
export * from './types';

// Utils exports (avoiding conflicts with mock)
export {
  getStatusBadgeVariant,
  getGalleryTypeDisplay,
  formatFileSize,
  calculateGalleryStats
} from './utils/gallery-utils';
