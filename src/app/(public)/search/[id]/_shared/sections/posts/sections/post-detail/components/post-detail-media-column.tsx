import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePostContext } from "../../../context";
import { PostDetailVideoPlayer, PostDetailMediaGallery } from ".";

const PostDetailMediaColumn: React.FC = () => {
  const { selectedPost } = usePostContext();

  const [currentMedia, setCurrentMedia] = useState<{
    type: "image" | "video";
    url: string;
    thumbnailUrl?: string;
    duration?: number;
  } | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Initialize current media on component mount
  useEffect(() => {
    if (selectedPost) {
      if (selectedPost.videoUrl) {
        setCurrentMedia({
          type: "video",
          url: selectedPost.videoUrl,
          thumbnailUrl: selectedPost.videoThumbnailUrl,
          duration: selectedPost.videoDurationSeconds,
        });
      } else if (selectedPost.featuredImageUrl) {
        setCurrentMedia({
          type: "image",
          url: selectedPost.featuredImageUrl,
        });
      }
    }
  }, [selectedPost]);

  if (!selectedPost) return null;

  // Handle media switching
  const handleMediaSwitch = (mediaItem: any) => {
    if (mediaItem.type === "video") {
      setCurrentMedia({
        type: "video",
        url: mediaItem.url,
        thumbnailUrl: mediaItem.thumbnailUrl,
        duration: mediaItem.duration,
      });
      setIsVideoPlaying(false);
    } else if (mediaItem.type === "image") {
      setCurrentMedia({
        type: "image",
        url: mediaItem.url,
      });
      setIsVideoPlaying(false);
    }
  };

  // Handle video play
  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  // Handle thumbnail clicks (switch back to original)
  const handleOriginalImageClick = () => {
    if (selectedPost?.featuredImageUrl) {
      setCurrentMedia({
        type: "image",
        url: selectedPost.featuredImageUrl,
      });
      setIsVideoPlaying(false);
    }
  };

  const handleOriginalVideoClick = () => {
    if (selectedPost?.videoUrl) {
      setCurrentMedia({
        type: "video",
        url: selectedPost.videoUrl,
        thumbnailUrl: selectedPost.videoThumbnailUrl,
        duration: selectedPost.videoDurationSeconds,
      });
      setIsVideoPlaying(false);
    }
  };

  const mediaAttachments = selectedPost.mediaAttachments
    ? JSON.parse(selectedPost.mediaAttachments)
    : [];

  return (
    <div className="p-24 post-detail-media-column">
      {/* Main Media Display */}
      <div className="mb-20">
        {/* Video Section */}
        {currentMedia && currentMedia.type === "video" && (
          <PostDetailVideoPlayer
            currentMedia={currentMedia}
            isVideoPlaying={isVideoPlaying}
            onVideoPlay={handleVideoPlay}
          />
        )}

        {/* Current Image Section */}
        {currentMedia && currentMedia.type === "image" && (
          <div className="featured-image position-relative">
            <div className="post-detail-image-container">
              <Image
                src={currentMedia.url}
                alt={selectedPost.title || ""}
                fill
                className="w-100 rounded-8 post-detail-image"
              />
            </div>
          </div>
        )}
      </div>

      {/* Media Gallery Thumbnails */}
      <PostDetailMediaGallery
        post={selectedPost}
        mediaAttachments={mediaAttachments}
        onMediaSwitch={handleMediaSwitch}
        onOriginalImageClick={handleOriginalImageClick}
        onOriginalVideoClick={handleOriginalVideoClick}
      />
    </div>
  );
};

export default PostDetailMediaColumn;
