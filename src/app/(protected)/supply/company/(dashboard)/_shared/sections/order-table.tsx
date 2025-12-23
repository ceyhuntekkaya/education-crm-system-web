"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { DataGrid } from "@/components/ui/data-grid";
import { OrderDto } from "../hooks/api";
import { createOrderColumns } from "../config";
import { useDashboard } from "../context";

export const OrderTable: React.FC = () => {
  const router = useRouter();

  // Context'ten tüm siparişleri al (filtrelenmemiş)
  const { orders, ordersLoading } = useDashboard();

  // Row tıklama handler'ı
  const handleRowClick = (params: any) => {
    if (params.row?.id) {
      router.push(`/supply/orders/detail/${params.row.id}`);
    }
  };

  // Kolonları oluştur
  const columns = createOrderColumns();

  return (
    <div>
      <DataGrid<OrderDto>
        rows={orders}
        columns={columns}
        loading={ordersLoading}
        onRowClick={handleRowClick}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50]}
        disableRowSelectionOnClick
        emptyState={{
          icon: "ph-package",
          title: "Henüz Sipariş Yok",
          description: "Aktif siparişleriniz burada görünecektir.",
          showActions: false,
        }}
      />
    </div>
  );
};
