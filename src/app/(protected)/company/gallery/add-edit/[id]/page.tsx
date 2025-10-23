"use client";

import React from "react";
import { CustomCard } from "@/components";
import { GalleryForm, LoadingSection, useGalleryAddEdit } from "../_shared";

interface GalleryAddEditPageProps {}

const GalleryAddEditPage: React.FC<GalleryAddEditPageProps> = () => {
  const { isEditing, gallery, galleryLoading } = useGalleryAddEdit();

  const pageTitle = isEditing
    ? "Galeri Bilgisi Düzenle"
    : "Yeni Galeri Oluştur";

  // Loading durumu
  if (galleryLoading && isEditing) {
    return <LoadingSection pageTitle={pageTitle} />;
  }

  return (
    <CustomCard
      title={pageTitle}
      subtitle={
        isEditing
          ? "Mevcut galeri bilgilerini düzenleyin"
          : "Yeni galeri bilgilerini oluşturun"
      }
      isBack
    >
      <GalleryForm isEditing={isEditing} initialData={gallery} />
    </CustomCard>
  );
};

export default GalleryAddEditPage;
