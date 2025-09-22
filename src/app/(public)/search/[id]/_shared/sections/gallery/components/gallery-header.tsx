import React from "react";
import { useGalleryContext } from "../context";

const GalleryHeader: React.FC = () => {
  const { galleryData } = useGalleryContext();

  return (
    <>
      {/* Header Section */}
      <div className="d-flex align-items-center justify-content-between mb-20">
        <h4 className="mb-0">Galeri</h4>
        <div className="d-flex align-items-center gap-8 text-neutral-600">
          <i className="ph ph-images text-main-600"></i>
          <span className="text-sm fw-medium">{galleryData.length} Galeri</span>
        </div>
      </div>

      <span className="d-block border border-neutral-30 mb-24 border-dashed" />
    </>
  );
};

export default GalleryHeader;
