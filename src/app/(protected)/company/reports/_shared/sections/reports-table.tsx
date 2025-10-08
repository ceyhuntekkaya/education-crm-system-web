"use client";

import React from "react";
import { DataGrid } from "@/components/ui/data-grid";
import { useReportsContext } from "../context/reports-context";
import { createReportsColumns } from "../config/reports-columns";
import { AnalyticsDto } from "@/types/dto/analytics/AnalyticsDto";
import { ReportsColumnHandlers } from "../types";

export const ReportsTable: React.FC = () => {
  const { reports, loading } = useReportsContext();

  // Column handlers
  const handlers: ReportsColumnHandlers = {
    onViewDetails: (report: AnalyticsDto) => {
      console.log("View details:", report);
      // TODO: Implement view details logic
    },
    onEdit: (report: AnalyticsDto) => {
      console.log("Edit report:", report);
      // TODO: Navigate to edit page
      // router.push(`/company/reports/add-edit/${report.id}`);
    },
    onToggleStatus: (report: AnalyticsDto) => {
      console.log("Toggle status:", report);
      // TODO: Implement status toggle logic
    },
    onDelete: (report: AnalyticsDto) => {
      console.log("Delete report:", report);
      // TODO: Implement delete logic with confirmation
    },
    onDuplicate: (report: AnalyticsDto) => {
      console.log("Duplicate report:", report);
      // TODO: Implement duplicate logic
    },
    onViewReport: (report: AnalyticsDto) => {
      console.log("View report:", report);
      // TODO: Implement report view logic
    },
    onExport: (report: AnalyticsDto) => {
      console.log("Export report:", report);
      // TODO: Implement export logic
    },
    onRefresh: (report: AnalyticsDto) => {
      console.log("Refresh report:", report);
      // TODO: Implement refresh logic
    },
  };

  const columns = createReportsColumns(handlers);

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
