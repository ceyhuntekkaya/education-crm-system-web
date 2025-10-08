// Social Media shared exports
export * from './context/social-media-context';
export * from './components';
export * from './config';
export * from './mock';
export * from './sections';
export * from './types';

// Utils exports (avoiding conflicts with mock)
export {
  getStatusBadgeVariant,
  getPostTypeDisplay,
  formatEngagement,
  calculatePostStats
} from './utils/social-media-utils';
