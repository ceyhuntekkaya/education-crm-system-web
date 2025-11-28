"use client";

import React from "react";
import { CustomCard } from "@/components/ui";
import {
  usePostDetail,
  usePostSections,
  LoadingSection,
  ErrorSection,
  NotFoundSection,
} from "./_shared";
import { PostDetail } from "@/app/(public)/search/[id]/_shared/sections/posts";
import { usePageTitle } from "@/hooks";

/**
 * Post detay bilgilerini gösteren kart bileşeni
 */
const PostDetailPage: React.FC = () => {
  usePageTitle("Sosyal Medya Detayı");
  const { post, isLoading, error } = usePostDetail();

  // Ana section'ları oluştur - hook'u en üstte çağırıyoruz
  const allSections = usePostSections(post);

  if (isLoading) {
    return <LoadingSection />;
  }

  if (error) {
    return <ErrorSection error={error} />;
  }

  if (!post) {
    return <NotFoundSection />;
  }

  return (
    <CustomCard
      title="Sosyal Medya Detayı"
      subtitle="Sosyal medya gönderisi bilgilerini detaylı olarak görüntüleyin"
      multiItems={allSections}
      editButtonUrl={`/company/social-media/add-edit/${post.id}`}
    >
      <PostDetail post={post} variant="inPage" />
    </CustomCard>
  );
};

export default PostDetailPage;
