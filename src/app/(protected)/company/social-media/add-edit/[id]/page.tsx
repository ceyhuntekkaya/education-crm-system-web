"use client";

import React from "react";
import { CustomCard } from "@/components";
import { PostForm, LoadingSection, usePostAddEdit } from "../_shared";

interface SocialMediaAddEditPageProps {}

const SocialMediaAddEditPage: React.FC<SocialMediaAddEditPageProps> = () => {
  const { isEditing, post, postLoading } = usePostAddEdit();

  const pageTitle = isEditing
    ? "Gönderi Bilgisi Düzenle"
    : "Yeni Gönderi Oluştur";

  // Loading durumu
  if (postLoading && isEditing) {
    return <LoadingSection pageTitle={pageTitle} />;
  }

  return (
    <CustomCard
      title={pageTitle}
      subtitle={
        isEditing
          ? "Mevcut gönderi bilgilerini düzenleyin"
          : "Yeni gönderi bilgilerini oluşturun"
      }
      isBack
    >
      <PostForm isEditing={isEditing} initialData={post} />
    </CustomCard>
  );
};

export default SocialMediaAddEditPage;
