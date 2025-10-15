"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { DataGrid } from "@/components/ui/data-grid";
import { createMessagesColumns } from "../config/messages-columns";
import { useMessages } from "../context";

export const MessagesTable: React.FC = () => {
  const router = useRouter();

  // Context'ten verileri al
  const { schoolMessages, messagesLoading } = useMessages();

  // Kolonları oluştur
  const columns = createMessagesColumns();

  // Satır tıklama işleyicisi - detay sayfasına yönlendir
  const handleRowClick = (params: any) => {
    router.push(`/company/messages/detail/${params.row.id}`);
  };

  return (
    <div className="messages-table-container">
      {/* Table Content */}
      <div className="table-wrapper">
        <DataGrid
          rows={schoolMessages}
          columns={columns}
          loading={messagesLoading}
          onRowClick={handleRowClick}
          // height={600}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 15 },
            },
          }}
          pageSizeOptions={[10, 15, 25, 50]}
          disableRowSelectionOnClick
          checkboxSelection={false}
          emptyState={{
            icon: "ph-envelope",
            title: "Mesaj Bulunamadı",
            description: "Henüz hiçbir mesaj bulunmamaktadır.",
            showActions: false,
          }}
        />
      </div>
    </div>
  );
};
