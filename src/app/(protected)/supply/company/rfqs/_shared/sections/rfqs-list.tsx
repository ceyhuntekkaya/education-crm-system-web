"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { DataGrid } from "@/components/ui/data-grid";

import { createRFQColumns } from "../config";
import { useRFQsContext } from "../contexts";
import type { RFQDto } from "@/types";

export const RFQsList: React.FC = () => {
  const router = useRouter();
  const { rfqs, rfqsListLoading } = useRFQsContext();
  const columns = createRFQColumns();

  // Row click handler
  const handleRowClick = (params: { row: RFQDto }) => {
    if (params.row.id) {
      router.push(`/supply/company/rfqs/detail/${params.row.id}`);
    }
  };

  return (
    <div className="rfqs-list-table">
      <DataGrid
        columns={columns}
        rows={rfqs}
        loading={rfqsListLoading}
        onRowClick={handleRowClick}
        disableRowSelectionOnClick
      />
    </div>
  );
};
