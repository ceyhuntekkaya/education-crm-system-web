import React from "react";
import { PostCardProps } from "../../types";
import {
  PostCardHeader,
  PostCardContent,
  PostCardMedia,
  PostCardStats,
  PostCardActions,
} from "./components";

const PostCard: React.FC<PostCardProps> = ({ post, onCardClick }) => {
  const handleCardClick = () => {
    if (onCardClick && post.id) {
      onCardClick(post.id);
    }
  };

  return (
    <div
      className="border border-neutral-30 rounded-12 bg-white hover-shadow-md transition-all cursor-pointer h-100 d-flex flex-column"
      onClick={handleCardClick}
    >
      {/* Kart Başlığı */}
      <PostCardHeader
        authorName={post.authorName}
        schoolName={post.schoolName}
        publishedAt={post.publishedAt}
        postType={post.postType}
      />

      {/* İçerik */}
      <div className="p-16 flex-grow-1 d-flex flex-column">
        <PostCardContent title={post.title} />

        {/* Medya Görseli */}
        <PostCardMedia
          featuredImageUrl={post.featuredImageUrl}
          title={post.title}
          isPinned={post.isPinned}
          isFeatured={post.isFeatured}
        />

        {/* İstatistikler ve Aksiyonlar */}
        <div className="d-flex align-items-center justify-content-between">
          <PostCardStats
            likeCount={post.likeCount}
            commentCount={post.commentCount}
            viewCount={post.viewCount}
          />

          {/* Aksiyon Butonları */}
          <PostCardActions onCardClick={handleCardClick} />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
