"use client";

import React, { useMemo } from "react";
import { DataGrid } from "@/components/ui/data-grid";
import { OrderDto } from "@/types/dto/supply";
import { createOrderColumns } from "../config";
import { useDashboard } from "../context";

/**
 * Tedarikçi Sipariş Tablosu
 * Son siparişleri gösterir
 */
export const OrderTable: React.FC = () => {
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

  // Kolonları oluştur
  const columns = createOrderColumns();

  return (
    <div>
      <DataGrid<OrderDto>
        rows={recentOrders}
        columns={columns}
        loading={ordersLoading}
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
