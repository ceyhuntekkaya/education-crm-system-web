import React from "react";

interface PostDetailDetailsProps {
  post: any;
}

const PostDetailDetails: React.FC<PostDetailDetailsProps> = ({ post }) => {
  if (!post.locationName && !post.tags && !post.slug) return null;

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
          {post.locationName && (
            <div className="detail-item">
              <div className="detail-icon location-icon">
                <i className="ph ph-map-pin fs-14" />
              </div>
              <div className="detail-text">{post.locationName}</div>
            </div>
          )}

          {post.tags && (
            <div className="detail-item">
              <div className="detail-icon tag-icon">
                <i className="ph ph-tag fs-14" />
              </div>
              <div className="detail-text">
                {post.tags.replace(/,/g, " • ")}
              </div>
            </div>
          )}

          {post.slug && (
            <div className="detail-item">
              <div className="detail-icon link-icon">
                <i className="ph ph-link fs-14" />
              </div>
              <div className="detail-text">{post.slug}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetailDetails;
