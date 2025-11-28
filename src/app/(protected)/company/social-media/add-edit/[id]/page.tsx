"use client";

import React from "react";
import { CustomCard } from "@/components";
import { PostForm, usePostAddEdit } from "../_shared";
import { usePageTitle } from "@/hooks";

interface SocialMediaAddEditPageProps {}

const SocialMediaAddEditPage: React.FC<SocialMediaAddEditPageProps> = () => {
  usePageTitle("Sosyal Medya Düzenle");
  const { isEditing, post, postDetailLoading } = usePostAddEdit();

  const pageTitle = isEditing
    ? "Gönderi Bilgisi Düzenle"
    : "Yeni Gönderi Oluştur";

  return (
    <CustomCard
      title={pageTitle}
      subtitle={
        isEditing
          ? "Mevcut gönderi bilgilerini düzenleyin"
          : "Yeni gönderi bilgilerini oluşturun"
      }
      isBack
      isLoading={postDetailLoading && isEditing}
    >
      <PostForm isEditing={isEditing} initialData={post} />
    </CustomCard>
  );
};

export default SocialMediaAddEditPage;
