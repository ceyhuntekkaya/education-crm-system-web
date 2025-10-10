"use client";

import React from "react";
import { DataGrid } from "@/components/ui/data-grid";
import { useReportsContext } from "../context/reports-context";
import { createReportsColumns } from "../config/reports-columns";
import { AnalyticsDto } from "@/types/dto/analytics/AnalyticsDto";
import { ReportsColumnHandlers } from "../types";

export const ReportsTable: React.FC = () => {
  const { reports, loading } = useReportsContext();

  // Kolonları oluştur
  const columns = createReportsColumns();

  return (
    <div className="reports-table">
      <DataGrid
        rows={reports}
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
        // checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
};
