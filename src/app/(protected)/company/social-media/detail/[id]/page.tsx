"use client";

import React from "react";
import { CustomCard, LoadingSpinner } from "@/components/ui";
import { CustomImage } from "@/components";
import { usePostDetail, usePostSections } from "./_shared";

/**
 * Post detay bilgilerini gösteren kart bileşeni
 */
const PostDetailPage: React.FC = () => {
  const { post, isLoading, error } = usePostDetail();

  // Ana section'ları oluştur - hook'u en üstte çağırıyoruz
  const allSections = usePostSections(post);

  if (isLoading) {
    return (
      <CustomCard title="Post Detayı">
        <LoadingSpinner message="Post bilgisi yükleniyor..." />
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
            Post bilgisi yüklenirken hata oluştu: {error}
          </p>
        </div>
      </CustomCard>
    );
  }

  if (!post) {
    return (
      <CustomCard title="Bilgi">
        <div className="text-center py-8">
          <i className="ph ph-info text-neutral-500 fs-2 mb-3"></i>
          <p className="text-neutral-600 mb-0">Post bilgisi bulunamadı.</p>
        </div>
      </CustomCard>
    );
  }

  return (
    <CustomCard
      title="Post Detayı"
      subtitle="Post bilgilerini detaylı olarak görüntüleyin"
      multiItems={allSections}
    ></CustomCard>
  );
};

export default PostDetailPage;
