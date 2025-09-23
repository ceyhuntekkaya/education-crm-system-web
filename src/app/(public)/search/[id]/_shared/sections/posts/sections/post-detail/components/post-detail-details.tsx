import React from "react";
import { usePostContext } from "../../../context/post-context";

const PostDetailDetails: React.FC = () => {
  const { selectedPost } = usePostContext();

  if (!selectedPost?.locationName && !selectedPost?.tags && !selectedPost?.slug)
    return null;

  return (
    <div className="mb-20 post-details-section">
      <div className="details-header mb-16">
        <h6 className="text-neutral-800 fs-14 fw-semibold mb-0 d-flex align-items-center gap-10">
          <div className="details-icon">
            <i className="ph ph-info fs-14" />
          </div>
          Gönderi Detayları
        </h6>
      </div>

      <div className="details-card">
        <div className="d-flex flex-column gap-4">
          {selectedPost?.locationName && (
            <div className="detail-item">
              <div className="detail-icon location-icon">
                <i className="ph ph-map-pin fs-14" />
              </div>
              <div className="detail-text">{selectedPost.locationName}</div>
            </div>
          )}

          {selectedPost?.tags && (
            <div className="detail-item">
              <div className="detail-icon tag-icon">
                <i className="ph ph-tag fs-14" />
              </div>
              <div className="detail-text">
                {selectedPost.tags.replace(/,/g, " • ")}
              </div>
            </div>
          )}

          {selectedPost?.slug && (
            <div className="detail-item">
              <div className="detail-icon link-icon">
                <i className="ph ph-link fs-14" />
              </div>
              <div className="detail-text">{selectedPost.slug}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetailDetails;
