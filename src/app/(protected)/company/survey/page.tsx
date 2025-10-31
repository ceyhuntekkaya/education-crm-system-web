"use client";

import React from "react";
import { SurveyTable, SurveyEvaluationModal } from "./_shared/sections";
import { CustomCard } from "@/components";

const SurveyPage: React.FC = () => {
  return (
    <>
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
