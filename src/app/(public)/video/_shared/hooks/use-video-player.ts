import { useState, useEffect, useRef } from "react";
import { getVideoType } from "../utils";
import type { VideoPlayerState } from "../types";

interface UseVideoPlayerProps {
  videoUrl: string;
}

interface UseVideoPlayerReturn extends VideoPlayerState {
  videoRef: React.RefObject<HTMLVideoElement>;
  videoType: "youtube" | "direct" | "unknown";
  handlePlayClick: () => void;
}

/**
 * Video player state ve fonksiyonlarını yöneten hook
 */
export const useVideoPlayer = ({
  videoUrl,
}: UseVideoPlayerProps): UseVideoPlayerReturn => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoDuration, setVideoDuration] = useState<string>("Yükleniyor...");
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoType = getVideoType(videoUrl);

  // Video süresini hesapla
  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement && videoType === "direct") {
      const handleLoadedMetadata = () => {
        if (videoElement && videoElement.duration) {
          const duration = Math.floor(videoElement.duration);
          const hours = Math.floor(duration / 3600);
          const minutes = Math.floor((duration % 3600) / 60);
          const seconds = duration % 60;

          let durationText = "";
          if (hours > 0) {
            durationText = `${hours} saat ${minutes} dakika`;
          } else if (minutes > 0) {
            durationText =
              seconds > 0
                ? `${minutes} dakika ${seconds} saniye`
                : `${minutes} dakika`;
          } else {
            durationText = `${seconds} saniye`;
          }

          setVideoDuration(durationText);
          setIsLoading(false);
        }
      };

      const handleError = () => {
        setVideoDuration("Bilinmiyor");
        setIsLoading(false);
      };

      videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
      videoElement.addEventListener("error", handleError);

      if (videoElement.readyState >= 1) {
        handleLoadedMetadata();
      }

      return () => {
        videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
        videoElement.removeEventListener("error", handleError);
      };
    } else if (videoType === "youtube") {
      setVideoDuration("5 dakika");
      setIsLoading(false);
    } else {
      setVideoDuration("Bilinmiyor");
      setIsLoading(false);
    }
  }, [videoType]);

  const handlePlayClick = () => {
    setIsPlaying(true);
    if (videoType === "direct" && videoRef.current) {
      videoRef.current.play();
    }
  };

  return {
    isPlaying,
    videoDuration,
    isLoading,
    videoRef,
    videoType,
    handlePlayClick,
  };
};

