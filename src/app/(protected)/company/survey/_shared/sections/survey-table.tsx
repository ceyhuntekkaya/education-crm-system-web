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
  // Event handler'lar
  const handlers: SurveyColumnHandlers = {
    onViewSurvey: (survey: SurveyDto) => {
      console.log("View survey:", survey);
      // Anket görüntüleme sayfasına yönlendirme
    },
    onViewDetails: (survey: SurveyDto) => {
      console.log("View details survey:", survey);
      // Burada detay modal açılabilir
    },
    onViewResults: (survey: SurveyDto) => {
      console.log("View results survey:", survey);
      // Anket sonuçları sayfasına yönlendirme
    },
    onEdit: (survey: SurveyDto) => {
      console.log("Edit survey:", survey);
      // Düzenleme sayfasına yönlendirme
    },
    onToggleStatus: (survey: SurveyDto) => {
      console.log("Toggle status survey:", survey);
      // Anket durumu değiştirme işlemi
    },
    onDelete: (survey: SurveyDto) => {
      console.log("Delete survey:", survey);
      // Anket silme işlemi
    },
    onDuplicate: (survey: SurveyDto) => {
      console.log("Duplicate survey:", survey);
      // Anket kopyalama işlemi
    },
    onSendSurvey: (survey: SurveyDto) => {
      console.log("Send survey:", survey);
      // Anket gönderme işlemi
    },
  };

  // Kolonları oluştur
  const columns = createSurveyColumns(handlers);

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
