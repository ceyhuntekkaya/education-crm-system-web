"use client";

import React from "react";
import { DataGrid } from "@/components/ui/data-grid";
import { useSubscriptionContext } from "../context/subscription-context";
import { createSubscriptionColumns } from "../config/subscription-columns";
import { SubscriptionPlanDto } from "@/types/dto/subscription/SubscriptionPlanDto";
import { SubscriptionColumnHandlers } from "../types";

export const SubscriptionTable: React.FC = () => {
  const { subscriptions, loading } = useSubscriptionContext();

  // Kolonları oluştur
  const columns = createSubscriptionColumns();

  return (
    <div className="subscription-table">
      <DataGrid
        rows={subscriptions}
        columns={columns}
        loading={loading}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
};
