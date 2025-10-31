"use client";

import React from "react";
import { DataGrid } from "@/components/ui/data-grid";
import { createSurveyColumns } from "../config/survey-columns";
import { useSurveyList } from "../context";
import { useCompany } from "@/app/(protected)/company/_shared";

export const SurveyTable = () => {
  const { selectedSchool } = useCompany();

  // Survey list context'ten gerekli veriler al
  const { surveys, surveyLoading } = useSurveyList();

  // Kolonları oluştur
  const columns = createSurveyColumns();

  // Empty state message based on school selection
  const getEmptyState = () => {
    if (!selectedSchool) {
      return {
        icon: "ph-building" as const,
        title: "Okul Seçiniz",
        description:
          "Anketleri görüntülemek için önce bir okul seçmeniz gerekiyor.",
        showActions: false,
      };
    }

    return {
      icon: "ph-clipboard-text" as const,
      title: "Henüz Anket Response Yok",
      description: "Bu okul için henüz tamamlanmış anket bulunmamaktadır.",
      showActions: false,
    };
  };

  return (
    <div>
      <DataGrid
        rows={surveys || []}
        columns={columns}
        loading={surveyLoading}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50]}
        disableRowSelectionOnClick
        emptyState={getEmptyState()}
      />
    </div>
  );
};
