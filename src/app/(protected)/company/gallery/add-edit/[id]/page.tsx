"use client";

import React from "react";
import { CustomCard } from "@/components";
import { GalleryForm, GalleryItemForm, useGalleryAddEdit } from "../_shared";

interface GalleryAddEditPageProps {}

const GalleryAddEditPage: React.FC<GalleryAddEditPageProps> = () => {
  const { isEditing, gallery, galleryDetailLoading } = useGalleryAddEdit();

  const pageTitle = isEditing
    ? "Galeri Bilgisi Düzenle"
    : "Yeni Galeri Oluştur";

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
        isLoading={galleryDetailLoading && isEditing}
      >
        <GalleryForm isEditing={isEditing} initialData={gallery} />
      </CustomCard>

      {/* Gallery Items Form - Şimdilik yorum satırında */}
      {/* <CustomCard
        title="Galeri Öğeleri"
        subtitle={
          isEditing
            ? "Galeriye medya öğeleri ekleyin veya düzenleyin"
            : "Galeri oluşturduktan sonra buradan medya öğeleri ekleyebilirsiniz"
        }
        className="mt-24"
      >
        <GalleryItemForm />
      </CustomCard> */}
    </>
  );
};

export default GalleryAddEditPage;
