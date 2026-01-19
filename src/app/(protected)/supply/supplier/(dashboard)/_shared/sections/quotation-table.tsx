"use client";

import React, { useMemo } from "react";
import { DataGrid } from "@/components/ui/data-grid";
import { QuotationDto } from "@/types/dto/supply";
import { createQuotationColumns } from "../config";
import { useDashboard } from "../context";

/**
 * Tedarikçi Teklif Tablosu
 * Bekleyen teklifleri gösterir
 */
export const QuotationTable: React.FC = () => {
  // Context'ten bekleyen teklifleri al
  const { pendingQuotations, quotationsLoading } = useDashboard();

  // En son oluşturulan 5 teklifi filtrele
  const recentQuotations = useMemo(() => {
    return [...pendingQuotations]
      .sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return dateB - dateA; // Yeniden eskiye sıralama
      })
      .slice(0, 5);
  }, [pendingQuotations]);

  // Kolonları oluştur
  const columns = createQuotationColumns();

  return (
    <div>
      <DataGrid<QuotationDto>
        rows={recentQuotations}
        columns={columns}
        loading={quotationsLoading}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        hideFooter
        emptyState={{
          icon: "ph-clipboard-text",
          title: "Henüz Teklif Yok",
          description: "Teklifleriniz burada görünecektir.",
          showActions: false,
        }}
      />
    </div>
  );
};
