"use client";

import React from "react";
import { CustomCard } from "@/components";
import {
  GalleryForm,
  GalleryItemForm,
  LoadingSection,
  useGalleryAddEdit,
} from "../_shared";

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
    <>
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

      {/* Gallery Items Form - Her zaman göster */}
      <CustomCard
        title="Galeri Öğeleri"
        subtitle={
          isEditing
            ? "Galeriye medya öğeleri ekleyin veya düzenleyin"
            : "Galeri oluşturduktan sonra buradan medya öğeleri ekleyebilirsiniz"
        }
        className="mt-24"
      >
        <GalleryItemForm />
      </CustomCard>
    </>
  );
};

export default GalleryAddEditPage;
