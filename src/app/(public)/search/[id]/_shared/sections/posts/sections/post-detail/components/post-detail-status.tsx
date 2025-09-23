import React from "react";
import { formatDate } from "../../../utils";
import { usePostContext } from "../../../context/post-context";

const PostDetailStatus: React.FC = () => {
  const { selectedPost } = usePostContext();

  if (!selectedPost) return null;

  return (
    <div className="border-top border-neutral-200 pt-20 pb-60 post-status-section">
      <div className="status-card">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-16">
          <div className="d-flex flex-column gap-4">
            {selectedPost.isModerated && (
              <div className="status-item">
                <div className="status-icon moderated-icon">
                  <i className="ph ph-shield-check fs-14" />
                </div>
                <span className="status-text">Moderasyonlu İçerik</span>
              </div>
            )}

            {selectedPost.allowLikes && (
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
            <span>{formatDate(selectedPost.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailStatus;
