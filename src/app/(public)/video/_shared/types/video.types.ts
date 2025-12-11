/**
 * Video sayfası için tip tanımlamaları
 */

export interface VideoStat {
  icon: string;
  value: string;
  label: string;
  color: "main" | "main-two" | "success" | "info" | "warning" | "danger";
}

export interface PlatformFeature {
  icon: string;
  title: string;
  description: string;
}

export type VideoType = "youtube" | "direct" | "unknown";

export interface VideoPlayerState {
  isPlaying: boolean;
  videoDuration: string;
  isLoading: boolean;
}

export interface VideoInfo {
  duration: string;
  publishDate: string;
  viewCount: string;
  status: string;
}

