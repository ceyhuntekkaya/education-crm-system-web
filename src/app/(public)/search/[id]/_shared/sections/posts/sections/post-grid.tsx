import React from "react";
import { usePostContext } from "../context";
import PostCard from "./post-card";
import { PostSummaryDto } from "@/types/dto/content";

const PostGrid: React.FC = () => {
  const { postData } = usePostContext();

  return (
    <div className="posts-content-wrapper">
      {/* Grid Layout - Simetrik gap düzenlemesi */}
      <div className="row g-20">
        {postData.map((post: PostSummaryDto, index: number) => (
          <div
            key={post.id}
            className="col-12 col-md-6 col-xl-4 mb-20"
            style={{
              animationDelay: `${index * 0.1}s`,
              opacity: 0,
              animation: `fadeInUp 0.6s ease forwards`,
            }}
          >
            <PostCard postId={post.id} />
          </div>
        ))}
      </div>

      {/* Daha Fazla Yükle Butonu */}
      {postData.length > 6 && (
        <div className="text-center mt-32">
          <button className="btn btn-outline-main btn-lg">
            <i className="ph-bold ph-arrow-clockwise me-8"></i>
            Daha Fazla Gönderi Yükle
          </button>
        </div>
      )}
    </div>
  );
};

export default PostGrid;
