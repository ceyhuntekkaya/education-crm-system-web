import React from "react";
import { PostDetailProps } from "../../types";
import {
  PostDetailHeader,
  PostDetailMediaColumn,
  PostDetailContentColumn,
  PostDetailNotFound,
} from "./components";

interface ExtendedPostDetailProps extends PostDetailProps {
  variant?: "inPage" | "modal";
}

const PostDetail: React.FC<ExtendedPostDetailProps> = ({
  post,
  onClose,
  variant = "modal",
}) => {
  if (!post) {
    return (
      <div>
        <div className="text-center p-40">
          <i
            className="ph ph-warning-circle text-warning-500"
            style={{ fontSize: "48px" }}
          />
          <h3 className="text-neutral-900 fs-20 fw-semibold mb-8 mt-24">
            Gönderi Bulunamadı
          </h3>
          <p className="text-neutral-600 fs-14">
            İstediğiniz gönderi mevcut değil veya kaldırılmış olabilir.
          </p>
        </div>
      </div>
    );
  }

  // InPage variant için gallery-style layout
  if (variant === "inPage") {
    return (
      <div className="gallery-detail-modal">
        <PostDetailHeader post={post} onClose={onClose} />
        <div className="gallery-modal-grid">
          <div className="gallery-viewer-column">
            <PostDetailMediaColumn post={post} />
          </div>
          <div className="gallery-info-column">
            <PostDetailContentColumn post={post} variant={variant} />
          </div>
        </div>
      </div>
    );
  }

  // Modal variant (default) - also use gallery-style layout
  return (
    <div className="gallery-detail-modal">
      <PostDetailHeader post={post} onClose={onClose} />
      <div className="gallery-modal-grid">
        <div className="gallery-viewer-column">
          <PostDetailMediaColumn post={post} />
        </div>
        <div className="gallery-info-column">
          <PostDetailContentColumn post={post} variant={variant} />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
