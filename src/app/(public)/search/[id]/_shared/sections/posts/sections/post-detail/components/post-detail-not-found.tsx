import React from "react";

interface PostDetailNotFoundProps {
  onClose: () => void;
}

const PostDetailNotFound: React.FC<PostDetailNotFoundProps> = ({ onClose }) => {
  return (
    <div>
      <div className="text-center">
        <div className="mb-24">
          <i
            className="ph ph-warning-circle text-warning-500"
            style={{ fontSize: "48px" }}
          />
        </div>
        <h3 className="text-neutral-900 fs-20 fw-semibold mb-8">
          Gönderi Bulunamadı
        </h3>
        <p className="text-neutral-600 fs-14 mb-24">
          İstediğiniz gönderi mevcut değil veya kaldırılmış olabilir.
        </p>
        <button onClick={onClose} className="btn btn-outline-main btn-sm">
          <i className="ph ph-arrow-left me-8" />
          Geri Dön
        </button>
      </div>
    </div>
  );
};

export default PostDetailNotFound;
