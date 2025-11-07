"use client";

import React from "react";
import {
  SurveyTable,
  SurveyEvaluationModal,
  SurveyStatsCards,
} from "./_shared/sections";
import { useSurveyList } from "./_shared/context";
import { CustomCard } from "@/components";

const SurveyPage: React.FC = () => {
  const { surveyStats, surveyLoading } = useSurveyList();

  return (
    <>
      {/* Survey Statistics Cards */}
      {!surveyLoading && <SurveyStatsCards stats={surveyStats} />}

      <CustomCard
        title="Anket Yönetimi"
        subtitle="Anketlerinizi yönetin, düzenleyin ve yeni anket oluşturun"
      >
        <SurveyTable />
      </CustomCard>

      {/* Evaluation Modal */}
      <SurveyEvaluationModal />
    </>
  );
};

export default SurveyPage;
