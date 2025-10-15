"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DataGrid } from "@/components/ui/data-grid";
import { PostDto } from "@/types/dto/content/PostDto";
import { createSocialMediaColumns } from "../config/social-media-columns";
import { useSocialMedia } from "../context";

export const SocialMediaTable: React.FC = () => {
  // Context'ten verileri al
  const { schoolPosts, postsLoading } = useSocialMedia();
  const router = useRouter();

  // Kolonları oluştur
  const columns = createSocialMediaColumns();

  // Row click handler - detay sayfasına yönlendir
  const handleRowClick = (params: any) => {
    const postId = params.row?.id;
    if (postId) {
      router.push(`/company/social-media/detail/${postId}`);
    }
  };

  return (
    <div className="social-media-table-container">
      {/* Table Content */}
      <div className="table-wrapper social-media-clickable-rows">
        <DataGrid
          rows={schoolPosts}
          columns={columns}
          loading={postsLoading}
          // height={600}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 15 },
            },
          }}
          pageSizeOptions={[10, 15, 25, 50]}
          disableRowSelectionOnClick={false}
          checkboxSelection={false}
          onRowClick={handleRowClick}
          emptyState={{
            icon: "ph-chat-circle-dots",
            title: "Gönderi Bulunamadı",
            description: "Henüz hiçbir sosyal medya gönderisi bulunmamaktadır.",
            showActions: false,
          }}
        />
      </div>
    </div>
  );
};
