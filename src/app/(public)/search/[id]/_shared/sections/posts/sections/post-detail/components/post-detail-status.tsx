import React from "react";
import { formatDate } from "../../../utils";
import { PostDto } from "@/types/dto/content";

interface PostDetailStatusProps {
  post: PostDto;
}

const PostDetailStatus: React.FC<PostDetailStatusProps> = ({ post }) => {
  if (!post) return null;

  return (
    <div className="border-top border-neutral-200 pt-20 pb-120 post-status-section">
      <div className="status-card">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-16">
          <div className="d-flex flex-column gap-4">
            {post.isModerated && (
              <div className="status-item">
                <div className="status-icon moderated-icon">
                  <i className="ph ph-shield-check fs-14" />
                </div>
                <span className="status-text">Moderasyonlu İçerik</span>
              </div>
            )}

            {post.allowLikes && (
              <div className="status-item">
                <div className="status-icon likes-icon">
                  <i className="ph ph-heart fs-14" />
                </div>
                <span className="status-text">Beğeniler Aktif</span>
              </div>
            )}
          </div>

          <div className="creation-date">
            <i className="ph ph-calendar fs-12" />
            <span>{formatDate(post.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailStatus;
