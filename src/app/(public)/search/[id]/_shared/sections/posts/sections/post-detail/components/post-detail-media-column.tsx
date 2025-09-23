import React, { useState, useEffect } from "react";
import Image from "next/image";
import { PostDetailVideoPlayer, PostDetailMediaGallery } from ".";

interface PostDetailMediaColumnProps {
  post: any;
}

const PostDetailMediaColumn: React.FC<PostDetailMediaColumnProps> = ({
  post,
}) => {
  const [currentMedia, setCurrentMedia] = useState<{
    type: "image" | "video";
    url: string;
    thumbnailUrl?: string;
    duration?: number;
  } | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Initialize current media on component mount
  useEffect(() => {
    if (post) {
      if (post.videoUrl) {
        setCurrentMedia({
          type: "video",
          url: post.videoUrl,
          thumbnailUrl: post.videoThumbnailUrl,
          duration: post.videoDurationSeconds,
        });
      } else if (post.featuredImageUrl) {
        setCurrentMedia({
          type: "image",
          url: post.featuredImageUrl,
        });
      }
    }
  }, [post]);

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
    if (post?.featuredImageUrl) {
      setCurrentMedia({
        type: "image",
        url: post.featuredImageUrl,
      });
      setIsVideoPlaying(false);
    }
  };

  const handleOriginalVideoClick = () => {
    if (post?.videoUrl) {
      setCurrentMedia({
        type: "video",
        url: post.videoUrl,
        thumbnailUrl: post.videoThumbnailUrl,
        duration: post.videoDurationSeconds,
      });
      setIsVideoPlaying(false);
    }
  };

  const mediaAttachments = post.mediaAttachments
    ? JSON.parse(post.mediaAttachments)
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
                alt={post.title || ""}
                fill
                className="w-100 rounded-8 post-detail-image"
              />
            </div>
          </div>
        )}
      </div>

      {/* Media Gallery Thumbnails */}
      <PostDetailMediaGallery
        post={post}
        mediaAttachments={mediaAttachments}
        onMediaSwitch={handleMediaSwitch}
        onOriginalImageClick={handleOriginalImageClick}
        onOriginalVideoClick={handleOriginalVideoClick}
      />
    </div>
  );
};

export default PostDetailMediaColumn;
