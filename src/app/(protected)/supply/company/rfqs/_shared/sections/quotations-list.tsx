"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { DataGrid } from "@/components/ui/data-grid";

import { createQuotationColumns } from "../config";
import { useQuotationsContext } from "../contexts";
import type { QuotationDto } from "@/types";

export const QuotationsList: React.FC = () => {
  const router = useRouter();
  const { quotations, quotationsListLoading } = useQuotationsContext();
  const columns = createQuotationColumns();

  // Row click handler
  const handleRowClick = (params: { row: QuotationDto }) => {
    if (params.row.id) {
      router.push(`/supply/company/rfqs/detail/${params.row.id}`);
    }
  };

  return (
    <div className="quotations-list-table">
      <DataGrid
        columns={columns}
        rows={quotations}
        loading={quotationsListLoading}
        onRowClick={handleRowClick}
        disableRowSelectionOnClick
      />
    </div>
  );
};
