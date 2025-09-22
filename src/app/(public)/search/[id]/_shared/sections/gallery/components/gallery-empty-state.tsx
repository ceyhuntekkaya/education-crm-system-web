import React from "react";
import { GalleryEmptyStateProps } from "../types";

const GalleryEmptyState: React.FC<GalleryEmptyStateProps> = ({
  title = "Henüz galeri bulunmuyor",
  description = "Bu kurum için henüz galeri eklenmemiş.",
}) => {
  return (
    <div className="text-center py-80">
      <i
        className="ph ph-images text-neutral-300"
        style={{ fontSize: "64px" }}
      ></i>
      <h4 className="text-neutral-600 mt-16 mb-8">{title}</h4>
      <p className="text-neutral-500">{description}</p>
    </div>
  );
};

export default GalleryEmptyState;
