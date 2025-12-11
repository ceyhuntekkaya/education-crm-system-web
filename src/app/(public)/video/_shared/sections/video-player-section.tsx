import React from "react";
import { CustomCard } from "@/components";
import { getYouTubeVideoId, createYouTubeEmbedUrl, getVideoMimeType } from "../utils";
import type { VideoType, VideoInfo } from "../types";

interface VideoPlayerSectionProps {
  videoUrl: string;
  videoType: VideoType;
  isPlaying: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
  videoInfo: VideoInfo;
  onPlayClick: () => void;
}

export const VideoPlayerSection: React.FC<VideoPlayerSectionProps> = ({
  videoUrl,
  videoType,
  isPlaying,
  videoRef,
  videoInfo,
  onPlayClick,
}) => {
  const videoId = videoType === "youtube" ? getYouTubeVideoId(videoUrl) : null;
  const embedUrl =
    videoType === "youtube" && videoId
      ? createYouTubeEmbedUrl(videoId, { autoplay: true })
      : null;

  return (
    <CustomCard
      className="video-player-card mb-40"
      data-aos="fade-up"
      data-aos-delay="300"
    >
      <div className="video-player-container">
        {videoType === "direct" ? (
          // Direkt Video Player
          <div className="video-direct-player">
            <video
              ref={videoRef}
              className="video-element"
              controls={isPlaying}
              preload="metadata"
              crossOrigin="anonymous"
              playsInline
            >
              <source src={videoUrl} type={getVideoMimeType(videoUrl)} />
              Tarayıcınız video etiketini desteklemiyor.
            </video>
            {!isPlaying && (
              <div className="video-overlay">
                <button
                  className="video-play-btn"
                  onClick={onPlayClick}
                  aria-label="Videoyu Oynat"
                >
                  <span className="video-play-btn__inner">
                    <i className="ph-fill ph-play"></i>
                  </span>
                </button>
              </div>
            )}
          </div>
        ) : videoType === "youtube" ? (
          // YouTube Player
          !isPlaying ? (
            <div className="video-youtube-placeholder" onClick={onPlayClick}>
              <div className="video-overlay">
                <button className="video-play-btn" aria-label="Videoyu Oynat">
                  <span className="video-play-btn__inner">
                    <i className="ph-fill ph-play"></i>
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="video-embed">
              {embedUrl && (
                <iframe
                  src={embedUrl}
                  title="Eğitim İste Tanıtım Videosu"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          )
        ) : (
          // Hata
          <div className="video-error">
            <i className="ph ph-warning-circle"></i>
            <p>Video formatı desteklenmiyor</p>
          </div>
        )}
      </div>

      {/* Video Info Bar */}
      <div className="video-info-bar">
        <div className="row g-3 justify-content-center">
          <div className="col-6 col-md-4">
            <div className="video-info-item">
              <i className="ph ph-play-circle"></i>
              <div>
                <span className="label">Durum</span>
                <span className="value">{videoInfo.status}</span>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-4">
            <div className="video-info-item">
              <i
                className={`ph ${
                  videoInfo.duration === "Yükleniyor..."
                    ? "ph-circle-notch spin"
                    : "ph-clock-clockwise"
                }`}
              ></i>
              <div>
                <span className="label">Süre</span>
                <span className="value">{videoInfo.duration}</span>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-4">
            <div className="video-info-item">
              <i className="ph ph-calendar"></i>
              <div>
                <span className="label">Yayın Tarihi</span>
                <span className="value">{videoInfo.publishDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomCard>
  );
};

