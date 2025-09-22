import React from "react";
import { usePostContext } from "../context";
import PostCard from "./post-card";
import { PostSummaryDto } from "@/types/dto/content";

const PostGrid: React.FC = () => {
  const { postData, handleCardClick } = usePostContext();

  return (
    <div className="social-posts-feed">
      {/* Instagram-style Feed Layout */}
      <div className="social-posts-feed__container">
        {postData.map((post: PostSummaryDto, index: number) => (
          <div
            key={post.id}
            className="social-posts-feed__item mb-40"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <PostCard post={post} onCardClick={handleCardClick} />
          </div>
        ))}
      </div>

      {/* Load More Button - Instagram style */}
      {postData.length > 0 && (
        <div className="social-posts-feed__load-more text-center mt-40">
          <button className="btn btn-outline-main btn-lg rounded-pill px-32">
            <i className="ph ph-arrow-clockwise me-8"></i>
            Daha Fazla Gönderi Yükle
          </button>
        </div>
      )}

      {/* Floating Action Button for Create Post */}
      <div className="social-posts-feed__fab">
        <button
          className="btn btn-main rounded-circle shadow-lg"
          style={{ width: "56px", height: "56px" }}
        >
          <i className="ph ph-plus-bold" style={{ fontSize: "24px" }}></i>
        </button>
      </div>
    </div>
  );
};

export default PostGrid;
