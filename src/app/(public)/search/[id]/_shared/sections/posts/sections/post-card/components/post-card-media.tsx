import React from "react";
import Image from "next/image";
import { PostSummaryDto } from "@/types/dto/content";

interface PostCardMediaProps {
  post: PostSummaryDto;
}

const PostCardMedia: React.FC<PostCardMediaProps> = ({ post }) => {
  const { featuredImageUrl, title, isPinned, isFeatured } = post;

  if (!featuredImageUrl) return null;

  return (
    <div className="mb-16">
      <div
        className="position-relative rounded-8 overflow-hidden"
        style={{ height: "200px" }}
      >
        <Image
          src={featuredImageUrl}
          alt={title || "Post görseli"}
          fill
          className="object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />

        {/* Rozet İşaretleri */}
        <div className="position-absolute top-0 end-0 p-8">
          {isPinned && (
            <span className="badge bg-info text-white me-4">
              <i className="ph ph-push-pin-fill me-4"></i>
              Sabitlenmiş
            </span>
          )}
          {isFeatured && (
            <span className="badge bg-warning text-white">
              <i className="ph ph-star-fill me-4"></i>
              Öne Çıkan
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCardMedia;
