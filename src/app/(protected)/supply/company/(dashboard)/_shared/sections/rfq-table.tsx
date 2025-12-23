"use client";

import React from "react";
import { DataGrid } from "@/components/ui/data-grid";
import { RFQDto } from "../hooks/api";
import { createRFQColumns } from "../config/rfq-columns";
import { useDashboard } from "../context";

export const RFQTable: React.FC = () => {
  // Context'ten aktif RFQ'ları al
  const { activeRFQs, isLoading } = useDashboard();

  // Kolonları oluştur
  const columns = createRFQColumns();

  return (
    <div>
      <DataGrid<RFQDto>
        rows={activeRFQs}
        columns={columns}
        loading={isLoading}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        height={"auto"}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        emptyState={{
          icon: "ph-megaphone",
          title: "Henüz İlan Yok",
          description: "Aktif ilanlarınız burada görünecektir.",
          showActions: false,
        }}
      />
    </div>
  );
};
