"use client";

import React from "react";
import { DataGrid } from "@/components/ui/data-grid";

import { createItemColumns } from "../config";
import { useRFQItemsContext } from "../contexts";

export const ItemsList: React.FC = () => {
  const { items, itemsListLoading } = useRFQItemsContext();
  const columns = createItemColumns();

  return (
    <div className="items-list-table">
      <DataGrid
        columns={columns}
        rows={items}
        loading={itemsListLoading}
        disableRowSelectionOnClick
      />
    </div>
  );
};
