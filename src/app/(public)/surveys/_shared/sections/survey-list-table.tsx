"use client";

import React from "react";
import { DataGrid } from "@/components/ui/data-grid";
import { createSurveyColumns } from "../config/survey-columns";
import { useSurveyList } from "../context/survey-list-context";
import { SurveyEvaluationModal } from "./survey-evaluation-modal";

export const SurveyListTable = () => {
  // Survey list context'ten gerekli veriler al
  const { surveys, surveyLoading, handleRowClick } = useSurveyList();

  // Kolonları oluştur - handlers olmadan
  const columns = createSurveyColumns();

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
        onRowClick={handleRowClick}
        emptyState={{
          icon: "ph-clipboard-text",
          title: "Henüz Anket Yok",
          description: "Size atanan henüz bir anket bulunmamaktadır.",
          showActions: false,
        }}
      />

      {/* Survey Evaluation Modal */}
      <SurveyEvaluationModal />
    </div>
  );
};
