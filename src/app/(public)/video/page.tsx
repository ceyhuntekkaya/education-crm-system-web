"use client";

import { usePageTitle } from "@/hooks";
import {
  VIDEO_CONFIG,
  VIDEO_STATS,
  PLATFORM_FEATURES,
  useVideoPlayer,
  VideoHeroSection,
  VideoPlayerSection,
  VideoStatsSection,
  VideoFeaturesSection,
  VideoCTASection,
  VideoShapes,
} from "./_shared";

const VideoPage = () => {
  usePageTitle("Tanıtım Videosu");

  // Video player hook
  const {
    isPlaying,
    videoDuration,
    isLoading,
    videoRef,
    videoType,
    handlePlayClick,
  } = useVideoPlayer({
    videoUrl: VIDEO_CONFIG.url,
  });

  // Video bilgileri
  const videoInfo = {
    duration: videoDuration,
    publishDate: VIDEO_CONFIG.publishDate,
    viewCount: VIDEO_CONFIG.viewCount,
    status: "Hazır",
  };

  return (
    <div className="video-page">
      {/* Decorative Shapes */}
      <VideoShapes />

      <div className="container">
        {/* Hero Section */}
        <VideoHeroSection />

        {/* Video Player Section */}
        <VideoPlayerSection
          videoUrl={VIDEO_CONFIG.url}
          videoType={videoType}
          isPlaying={isPlaying}
          videoRef={videoRef}
          videoInfo={videoInfo}
          onPlayClick={handlePlayClick}
        />

        {/* Statistics Section */}
        <VideoStatsSection stats={VIDEO_STATS} />

        {/* Features Section */}
        <VideoFeaturesSection features={PLATFORM_FEATURES} />

        {/* CTA Section */}
        <VideoCTASection />
      </div>
    </div>
  );
};

export default VideoPage;
