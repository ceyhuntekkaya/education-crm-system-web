import React from "react";
import { usePostContext } from "../../context";
import {
  PostCardHeader,
  PostCardContent,
  PostCardMedia,
  PostCardStats,
  PostCardActions,
} from "./components";

interface PostCardProps {
  postId: number | undefined;
}

const PostCard: React.FC<PostCardProps> = ({ postId }) => {
  const { getPostById, handleCardClick } = usePostContext();

  // postId ile ilgili post'u bul
  const post = getPostById(postId);

  // Post bulunamazsa hiçbir şey render etme
  if (!post) {
    return null;
  }

  const handleCardClickEvent = () => {
    if (post.id) {
      handleCardClick(post.id);
    }
  };

  return (
    <div
      className="post-card border border-neutral-30 rounded-12 bg-white cursor-pointer h-100 d-flex flex-column"
      onClick={handleCardClickEvent}
    >
      {/* Kart Başlığı */}
      <PostCardHeader post={post} />

      {/* İçerik */}
      <div className="p-16 flex-grow-1 d-flex flex-column">
        <PostCardContent post={post} />

        {/* Medya Görseli */}
        <PostCardMedia post={post} />

        {/* İstatistikler ve Aksiyonlar */}
        <div className="d-flex align-items-center justify-content-between">
          <PostCardStats post={post} />

          {/* Aksiyon Butonları */}
          <PostCardActions onCardClick={handleCardClickEvent} />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
