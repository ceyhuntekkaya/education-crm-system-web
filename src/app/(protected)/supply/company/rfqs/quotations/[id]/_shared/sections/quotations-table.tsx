"use client";

import React from "react";
import { DataGrid } from "@/components/ui/data-grid";
import { useRFQQuotationsContext } from "../contexts";
import { createQuotationColumns } from "../config";

export const QuotationsTable: React.FC = () => {
  const { filteredQuotations, isLoading } = useRFQQuotationsContext();
  const columns = createQuotationColumns();

  // DataGrid için rows'a id ekle
  const rowsWithId = React.useMemo(
    () =>
      filteredQuotations.map((quotation) => ({
        ...quotation,
        id: quotation.quotationId,
      })),
    [filteredQuotations]
  );

  return (
    <div className="quotations-table">
      <DataGrid
        columns={columns}
        rows={rowsWithId}
        loading={isLoading}
        disableRowSelectionOnClick
      />
    </div>
  );
};
