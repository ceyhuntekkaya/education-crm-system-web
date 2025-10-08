"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SocialMediaTable } from "./_shared/sections/social-media-table";
import { Button } from "@/components";

const SocialMediaPage: React.FC = () => {
  const router = useRouter();

  const handleAddPost = () => {
    router.push("/company/social-media/add-edit/new");
  };

  return (
    <div className="border border-neutral-30 rounded-12 bg-white p-8 mb-24">
      <div className="border border-neutral-30 rounded-12 bg-main-25 p-24">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div>
            <h2 className="mb-8">Sosyal Medya Yönetimi</h2>
            <p className="text-neutral-600 mb-0">
              Sosyal medya gönderilerinizi yönetin, düzenleyin ve yeni içerik
              oluşturun
            </p>
          </div>
          <Button
            variant="inline"
            size="sm"
            rightIcon="ph-plus"
            onClick={handleAddPost}
          >
            Yeni Gönderi
          </Button>
        </div>

        <span className="d-block border border-neutral-30 my-20 border-dashed" />

        <SocialMediaTable />
      </div>
    </div>
  );
};

export default SocialMediaPage;
