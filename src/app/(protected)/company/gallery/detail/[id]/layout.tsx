"use client";

import React from "react";
import { useParams } from "next/navigation";
import { GalleryDetailProvider } from "./_shared";
import { validateGalleryId } from "./_shared/utils/gallery-detail.utils";

interface GalleryDetailLayoutProps {
  children: React.ReactNode;
}

const GalleryDetailLayout: React.FC<GalleryDetailLayoutProps> = ({
  children,
}) => {
  const params = useParams();
  const id = params?.id as string;

  // ID'yi valide et
  const galleryId = validateGalleryId(id);

  if (!galleryId) {
    return (
      <div className="text-center py-8">
        <i className="ph ph-warning-circle text-danger fs-2 mb-3"></i>
        <p className="text-danger mb-0">Geçersiz gallery ID&apos;si: {id}</p>
      </div>
    );
  }

  return (
    <GalleryDetailProvider galleryId={galleryId}>
      {children}
    </GalleryDetailProvider>
  );
};

export default GalleryDetailLayout;
