"use client";

import React from "react";
import { DataGrid } from "@/components/ui/data-grid";
import { useSubscriptionContext } from "../context/subscription-context";
import { createSubscriptionColumns } from "../config/subscription-columns";
import { SubscriptionPlanDto } from "@/types/dto/subscription/SubscriptionPlanDto";
import { SubscriptionColumnHandlers } from "../types";

export const SubscriptionTable: React.FC = () => {
  const { subscriptions, loading } = useSubscriptionContext();

  // Column handlers
  const handlers: SubscriptionColumnHandlers = {
    onViewDetails: (subscription: SubscriptionPlanDto) => {
      console.log("View details:", subscription);
      // TODO: Implement view details logic
    },
    onEdit: (subscription: SubscriptionPlanDto) => {
      console.log("Edit subscription:", subscription);
      // TODO: Navigate to edit page
      // router.push(`/company/subscription/add-edit/${subscription.id}`);
    },
    onToggleStatus: (subscription: SubscriptionPlanDto) => {
      console.log("Toggle status:", subscription);
      // TODO: Implement status toggle logic
    },
    onDelete: (subscription: SubscriptionPlanDto) => {
      console.log("Delete subscription:", subscription);
      // TODO: Implement delete logic with confirmation
    },
    onDuplicate: (subscription: SubscriptionPlanDto) => {
      console.log("Duplicate subscription:", subscription);
      // TODO: Implement duplicate logic
    },
    onViewPlan: (subscription: SubscriptionPlanDto) => {
      console.log("View plan:", subscription);
      // TODO: Implement plan view logic
    },
    onToggleVisibility: (subscription: SubscriptionPlanDto) => {
      console.log("Toggle visibility:", subscription);
      // TODO: Implement visibility toggle logic
    },
    onTogglePopular: (subscription: SubscriptionPlanDto) => {
      console.log("Toggle popular:", subscription);
      // TODO: Implement popular toggle logic
    },
  };

  const columns = createSubscriptionColumns(handlers);

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
