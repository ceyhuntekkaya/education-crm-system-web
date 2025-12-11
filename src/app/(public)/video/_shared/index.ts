// Config exports
export { VIDEO_CONFIG, VIDEO_STATS, PLATFORM_FEATURES } from "./config";

// Type exports
export type {
  VideoStat,
  PlatformFeature,
  VideoType,
  VideoPlayerState,
  VideoInfo,
} from "./types";

// Hook exports
export { useVideoPlayer } from "./hooks";

// Section exports
export {
  VideoHeroSection,
  VideoPlayerSection,
  VideoStatsSection,
  VideoFeaturesSection,
  VideoCTASection,
  VideoShapes,
} from "./sections";

// Utils exports
export {
  getYouTubeVideoId,
  formatDuration,
  fetchYouTubeVideoInfo,
  parseISO8601Duration,
  createYouTubeEmbedUrl,
  isValidYouTubeUrl,
  isDirectVideoUrl,
  getVideoType,
  getVideoMimeType,
} from "./utils";

