"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { DataGrid } from "@/components/ui/data-grid";
import { OrderDto } from "../hooks/api";
import { createOrderColumns } from "../config";
import { useDashboard } from "../context";

export const OrderTable: React.FC = () => {
  const router = useRouter();

  // Context'ten tüm siparişleri al (filtrelenmemiş)
  const { orders, ordersLoading } = useDashboard();

  // En son oluşturulan 5 siparişi filtrele
  const recentOrders = useMemo(() => {
    return [...orders]
      .sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return dateB - dateA; // Yeniden eskiye sıralama
      })
      .slice(0, 5);
  }, [orders]);

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
        rows={recentOrders}
        columns={columns}
        loading={ordersLoading}
        onRowClick={handleRowClick}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        hideFooter
        emptyState={{
          icon: "ph-package",
          title: "Henüz Sipariş Yok",
          description: "Siparişleriniz burada görünecektir.",
          showActions: false,
        }}
      />
    </div>
  );
};
