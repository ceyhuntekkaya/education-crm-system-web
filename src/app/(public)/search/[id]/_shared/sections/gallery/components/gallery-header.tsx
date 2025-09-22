import React from "react";
import { GalleryHeaderProps } from "../types";

const GalleryHeader: React.FC<GalleryHeaderProps> = ({ title, count }) => {
  return (
    <>
      {/* Header Section */}
      <div className="d-flex align-items-center justify-content-between mb-20">
        <h4 className="mb-0">{title}</h4>
        <div className="d-flex align-items-center gap-8 text-neutral-600">
          <i className="ph ph-images text-main-600"></i>
          <span className="text-sm fw-medium">{count} Galeri</span>
        </div>
      </div>

      <span className="d-block border border-neutral-30 mb-24 border-dashed" />
    </>
  );
};

export default GalleryHeader;
