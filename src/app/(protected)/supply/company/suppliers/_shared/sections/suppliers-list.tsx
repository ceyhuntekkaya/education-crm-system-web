"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { DataGrid } from "@/components/ui/data-grid";

import { createSupplierColumns } from "../config";
import { useSuppliersContext } from "../contexts";
import type { SupplierDto } from "@/types";

export const SuppliersList: React.FC = () => {
  const router = useRouter();
  const { suppliers, suppliersListLoading } = useSuppliersContext();
  const columns = createSupplierColumns();

  // Row click handler
  const handleRowClick = (params: { row: SupplierDto }) => {
    if (params.row.id) {
      router.push(`/supply/company/suppliers/detail/${params.row.id}`);
    }
  };

  return (
    <div className="suppliers-list-table">
      <DataGrid
        columns={columns}
        rows={suppliers}
        loading={suppliersListLoading}
        onRowClick={handleRowClick}
        disableRowSelectionOnClick
      />
    </div>
  );
};
