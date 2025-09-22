import React from "react";

const PostEmptyState: React.FC = () => {
  return (
    <div className="social-posts-empty-state text-center py-120">
      {/* Instagram-style Empty State Icon */}
      <div className="social-posts-empty-state__illustration mb-32">
        <div className="position-relative d-inline-block">
          <div
            className="social-posts-empty-state__camera bg-neutral-100 rounded-circle d-flex align-items-center justify-content-center mb-16 mx-auto"
            style={{ width: "80px", height: "80px" }}
          >
            <i
              className="ph ph-camera text-neutral-400"
              style={{ fontSize: "36px" }}
            ></i>
          </div>
          <div className="social-posts-empty-state__sparkles position-absolute top-0 end-0">
            <i
              className="ph ph-sparkle text-main-400"
              style={{ fontSize: "20px" }}
            ></i>
          </div>
        </div>
      </div>

      {/* Empty State Content */}
      <div className="social-posts-empty-state__content mb-40">
        <h4 className="text-neutral-800 mb-12 fw-bold">Henüz paylaşım yok</h4>

        <p className="text-neutral-600 mb-0 lh-relaxed max-w-sm mx-auto">
          Bu kurum henüz sosyal medya paylaşımı yapmamış. İlk paylaşımları için
          takipte kalın!
        </p>
      </div>

      {/* Action Buttons */}
      <div className="social-posts-empty-state__actions">
        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center gap-12">
          <button className="btn btn-main btn-sm px-24">
            <i className="ph ph-bell me-8"></i>
            Bildirim Aç
          </button>

          <button className="btn btn-outline-main btn-sm px-24">
            <i className="ph ph-arrow-left me-8"></i>
            Diğer Kurumlar
          </button>
        </div>

        {/* Social Suggestions */}
        <div className="social-posts-empty-state__suggestions mt-32">
          <p className="text-neutral-500 fs-12 mb-16">
            Benzer kurumları keşfedin
          </p>

          <div className="d-flex align-items-center justify-content-center gap-12">
            <div className="social-suggestion">
              <div className="avatar avatar-sm">
                <i
                  className="ph ph-graduation-cap text-main-600"
                  style={{ fontSize: "20px" }}
                ></i>
              </div>
            </div>

            <div className="social-suggestion">
              <div className="avatar avatar-sm">
                <i
                  className="ph ph-books text-info-600"
                  style={{ fontSize: "20px" }}
                ></i>
              </div>
            </div>

            <div className="social-suggestion">
              <div className="avatar avatar-sm">
                <i
                  className="ph ph-student text-success-600"
                  style={{ fontSize: "20px" }}
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostEmptyState;
