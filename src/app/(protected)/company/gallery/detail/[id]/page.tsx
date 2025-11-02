"use client";

import React from "react";
import Image from "next/image";
import { CustomCard, LoadingSpinner } from "@/components/ui";
import { useGalleryDetail, useGallerySections } from "./_shared";
import {
  GalleryCard,
  GalleryDetailContent,
} from "@/app/(public)/search/[id]/_shared/sections/gallery/components";

/**
 * Gallery detay bilgilerini gösteren kart bileşeni
 */
const GalleryDetailPage: React.FC = () => {
  const { gallery, isLoading, error } = useGalleryDetail();

  // Ana section'ları oluştur - hook'u en üstte çağırıyoruz
  const allSections = useGallerySections(gallery);

  if (isLoading) {
    return (
      <CustomCard title="Gallery Detayı">
        <LoadingSpinner message="Gallery bilgisi yükleniyor..." />
      </CustomCard>
    );
  }

  if (error) {
    return (
      <CustomCard
        title="Hata"
        bgColor="bg-danger-25"
        border="border border-danger-30"
      >
        <div className="text-center py-8">
          <i className="ph ph-warning-circle text-danger fs-2 mb-3"></i>
          <p className="text-danger mb-0">
            Gallery bilgisi yüklenirken hata oluştu: {error}
          </p>
        </div>
      </CustomCard>
    );
  }

  if (!gallery) {
    return (
      <CustomCard title="Bilgi">
        <div className="text-center py-8">
          <i className="ph ph-info text-neutral-500 fs-2 mb-3"></i>
          <p className="text-neutral-600 mb-0">Gallery bilgisi bulunamadı.</p>
        </div>
      </CustomCard>
    );
  }

  return (
    <CustomCard
      title="Galeri Detayı"
      subtitle="Galeri bilgilerini detaylı olarak görüntüleyin"
      multiItems={allSections}
      editButtonUrl={`/company/gallery/add-edit/${gallery.id}`}
    >
      {/* <div className="row">
        <div className="col-3">
          <GalleryCard gallery={gallery} onCardClick={() => {}} />
        </div>
        <div className="col-9">
          <GalleryDetailContent gallery={gallery} variant="inPage" />
        </div>
      </div> */}
      <GalleryDetailContent gallery={gallery} variant="inPage" />
    </CustomCard>
  );
};

export default GalleryDetailPage;
