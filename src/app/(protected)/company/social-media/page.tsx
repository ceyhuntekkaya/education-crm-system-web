"use client";

import React from "react";
import { SocialMediaTable } from "./_shared/sections/social-media-table";
import { CustomCard } from "@/components/ui";

const SocialMediaPage: React.FC = () => {
  return (
    <CustomCard
      title="Sosyal Medya Yönetimi"
      subtitle="Sosyal medya gönderilerinizi yönetin, düzenleyin ve yeni içerik oluşturun"
      addButtonUrl="/company/social-media/add-edit/new"
    >
      <SocialMediaTable />
    </CustomCard>
  );
};

export default SocialMediaPage;
