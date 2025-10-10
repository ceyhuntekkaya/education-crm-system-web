"use client";

import React, { useState } from "react";
import { DataGrid } from "@/components/ui/data-grid";
import { SurveyDto } from "@/types/dto/survey/SurveyDto";
import { createSurveyColumns } from "../config/survey-columns";
import { SurveyColumnHandlers, SurveyTableProps } from "../types";
import { mockSurveys, calculateSurveyStats } from "../mock/survey-mock-data";

export const SurveyTable: React.FC<SurveyTableProps> = ({
  surveys = mockSurveys,
  loading = false,
}) => {
  // Kolonları oluştur
  const columns = createSurveyColumns();

  return (
    <div>
      <DataGrid
        rows={surveys}
        columns={columns}
        loading={loading}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50]}
        disableRowSelectionOnClick
        emptyState={{
          icon: "ph-clipboard-text",
          title: "Henüz Anket Yok",
          description:
            "İlk anketinizi oluşturmak için 'Yeni Anket' butonuna tıklayın.",
          showActions: true,
          addButtonText: "Yeni Anket",
          onAddNew: () => {
            console.log("Yeni Anket ekleme formu açılacak");
          },
        }}
      />
    </div>
  );
};
