import React from "react";
import { CustomImage } from "@/components/ui";

interface PostDetailVideoPlayerProps {
  currentMedia: {
    type: "image" | "video";
    url: string;
    thumbnailUrl?: string;
    duration?: number;
  };
  isVideoPlaying: boolean;
  onVideoPlay: () => void;
}

const PostDetailVideoPlayer: React.FC<PostDetailVideoPlayerProps> = ({
  currentMedia,
  isVideoPlaying,
  onVideoPlay,
}) => {
  return (
    <div className="video-section">
      <div className="position-relative post-detail-video-container">
        {isVideoPlaying ? (
          <video
            src={currentMedia.url}
            controls
            autoPlay
            className="w-100 h-100 rounded-8"
            style={{ objectFit: "cover" }}
          />
        ) : currentMedia.thumbnailUrl ? (
          <div className="position-relative w-100 h-100" onClick={onVideoPlay}>
            <CustomImage
              src={currentMedia.thumbnailUrl}
              alt="Video thumbnail"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-8 cursor-pointer"
            />
            <div className="position-absolute top-50 start-50 translate-middle">
              <div className="bg-dark bg-opacity-75 rounded-circle p-12 d-flex align-items-center justify-content-center">
                <i className="ph ph-play-fill text-white fs-20" />
              </div>
            </div>
            {currentMedia.duration && (
              <div className="position-absolute bottom-8 end-8 bg-dark bg-opacity-75 text-white px-8 py-4 rounded-4 fs-12">
                {Math.floor(currentMedia.duration / 60)}:
                {(currentMedia.duration % 60).toString().padStart(2, "0")}
              </div>
            )}
          </div>
        ) : (
          <div
            className="bg-neutral-100 rounded-8 h-100 d-flex align-items-center justify-content-center cursor-pointer"
            onClick={onVideoPlay}
          >
            <div className="text-center">
              <i className="ph ph-video text-neutral-400 fs-32 mb-8" />
              <p className="text-neutral-600 fs-12 mb-0">Video Mevcut</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetailVideoPlayer;
